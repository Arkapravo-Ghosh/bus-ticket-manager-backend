import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const validateToken = (token) => {
  if (!token) {
    return false;
  }
  let result = false;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return false;
    } else if (error.name === "JsonWebTokenError") {
      return false;
    } else {
      console.error("Error validating token:", error);
      return false;
    };
  };
};