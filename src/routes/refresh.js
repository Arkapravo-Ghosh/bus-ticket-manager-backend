import { Router } from "express";
import jwt from "jsonwebtoken";
import { createToken, createRefreshToken, validateToken } from "../controllers/userController.js";

const router = Router();

router.post("/", (req, res, next) => {
  try {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
      return res.status(400).json({ message: "Invalid request" });
    };

    // Check if the refreshtoken is valid
    if (validateToken(refreshtoken)) {

      // Create a new token
      const user = {
        email: jwt.decode(refreshtoken).email,
      };

      const authtoken = createToken(user);

      // Create a new refresh token
      const refreshtoken = createRefreshToken(user);

      // Send the new token and refresh token
      return res.status(200).json({
        message: "Token refreshed successfully",
        authtoken: authtoken,
        refreshtoken: refreshtoken
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