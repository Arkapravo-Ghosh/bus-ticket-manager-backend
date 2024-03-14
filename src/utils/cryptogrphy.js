// import crypto from "crypto";
import bcrypt from "bcrypt";

/*
const encryptionKey = process.env.ENCRYPTION_KEY;

// Function to encrypt data
export const encrypt = (data) => {
  const key = crypto.createHash("sha256").update(encryptionKey).digest("hex").slice(0, 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), Buffer.from("1234567890123456"));
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Function to decrypt data
export const decrypt = (encryptedData) => {
  const key = crypto.createHash("sha256").update(encryptionKey).digest("hex").slice(0, 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), Buffer.from("1234567890123456"));
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
*/

// Function to hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// Function to check password
export const checkPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};