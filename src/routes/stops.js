import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import executeQuery from "../utils/sql.js";

const router = Router();

router.get("/", await authenticateToken, async (req, res, next) => {
  try {
    const query = "SELECT * FROM stops";
    const result = await executeQuery(query);
    if (result.length > 0) {
      const response = {
        message: "Stops fetched successfully",
        stops: result.map((stop) => {
          return {
            id: stop.id,
            name: stop.name,
          };
        }),
      };
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "No stops found" });
    };
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

export default router;