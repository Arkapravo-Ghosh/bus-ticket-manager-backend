import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { createTicket } from "../controllers/ticketController.js";
import { v4 as uuidv4 } from "uuid";
import executeQuery from "../utils/sql.js";

const router = Router();

router.get("/(*)", async (req, res, next) => {
  const ticketId = req.params[0];

  if (!ticketId || typeof ticketId !== "string" || !uuidv4(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" });
  };
  const query = "SELECT * FROM tickets WHERE uuid = ?";
  try {
    const ticket = await executeQuery(query, [ticketId]);
    if (ticket.length === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    };
    const response = {
      message: "Ticket fetched successfully",
      ticket: {
        origin: ticket[0].origin,
        destination: ticket[0].destination,
        ticketId: ticket[0].uuid,
        created_at: ticket[0].created_at,
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error validating ticket:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
});

router.post("/", await authenticateToken, async (req, res, next) => {
  const { origin, destination } = req.body;
  if (!origin || !destination) {
    return res.status(400).json({ message: "Invalid request" });
  };
  if (typeof origin !== "string" || typeof destination !== "string") {
    return res.status(400).json({ message: "Invalid request" });
  };
  if (origin === destination) {
    return res.status(400).json({ message: "Origin and destination cannot be the same" });
  };
  try {
    const uuid = await createTicket(String(origin), String(destination));
    return res.status(200).json({ message: "Ticket booked successfully", ticket: uuid });
  } catch (error) {
    console.error(error);
    try {
      res.status(500).json({ message: "Internal server error" });
    } catch (error) {
      console.error("Error sending Status 500:", error);
    };
    return;
  };
});

router.delete("/(*)", await authenticateToken, async (req, res, next) => {
  const ticketId = req.params[0];
  if (!ticketId || typeof ticketId !== "string" || !uuidv4(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" });
  };
  const query = "DELETE FROM tickets WHERE uuid = ?";
  try {
    await executeQuery(query, [ticketId]);
    return res.status(200).json({ message: "Ticket cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling ticket:", error);
    return res.status(500).json({ message: "Internal server error" });
  };
});

export default router;