import { Router } from "express";
import checkIfUserExists from "../middlewares/checkIfUserExists.js";
import { checkPassword } from "../utils/cryptogrphy.js";
import executeQuery from "../utils/sql.js";
import { createToken, createRefreshToken } from "../controllers/userController.js";
import validateEmail from "../middlewares/emailValidation.js";

const router = Router();

router.post("/", await validateEmail, await checkIfUserExists, async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!password) {
    return res.status(400).json({ message: "Invalid request" });
  };

  try {
    let user = {};

    // Get the data of user from the database
    const query = "SELECT * FROM users WHERE email = ?";
    const result = await executeQuery(query, [email]);
    const hashedPassword = result[0].password;

    // Check if the password is correct
    if (await checkPassword(password, hashedPassword)) {
      user = {
        email: result[0].email,
      };
    } else {
      return res.status(400).json({ message: "Unsuccessful login" });
    };

    // Create a token
    const authtoken = createToken(user);

    // Create a refresh token
    const refreshtoken = createRefreshToken(user);

    // Send the token and refresh token
    return res.status(200).json({
      message: "Login successful",
      authtoken: authtoken,
      refreshtoken: refreshtoken,
    });
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