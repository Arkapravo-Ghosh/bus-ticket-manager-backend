import { validateToken } from "../controllers/userController.js";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const user = validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  };
};

export default authenticateToken;