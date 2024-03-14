import { Router } from "express";
import jwt from "jsonwebtoken";
import { createToken, createRefreshToken, validateToken } from "../controllers/userController.js";

const router = Router();

router.post("/", (req, res, next) => {
  try {
    const { authtoken, refreshtoken } = req.body;
    if (!authtoken || !refreshtoken) {
      return res.status(400).json({ message: "Invalid request" });
    };
    // Check if the authtoken is valid
    if (validateToken(authtoken) && validateToken(refreshtoken)) {
      // Send Successfull Response
      return res.status(200).json({
        message: "Token is valid",
      });
    } else {
      return res.status(403).json({ message: "Forbidden" });
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