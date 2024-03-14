import executeQuery from "../utils/sql.js";

const checkIfUserExists = async (req, res, next) => {
  const { email } = req.body;

  const result = await executeQuery(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  try {
    if (result.length > 0) {
      next();
    } else {
      return res.status(400).json({ message: "User not found" });
    };
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  };
};

export default checkIfUserExists;