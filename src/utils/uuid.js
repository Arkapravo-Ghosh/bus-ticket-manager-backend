import { v4 as uuidv4 } from "uuid";

// Function to generate a UUID
const generateUUID = () => {
  return uuidv4();
};

export default generateUUID;