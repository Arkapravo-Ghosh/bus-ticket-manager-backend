import executeQuery from "../utils/sql.js";
import generateUUID from "../utils/uuid.js";

export const createTicket = async (origin, destination, uuid = generateUUID()) => {
  const checkIfStopExists = "SELECT * FROM stops WHERE name = ?";
  try {
    const originStop = await executeQuery(checkIfStopExists, [origin]);
    const destinationStop = await executeQuery(checkIfStopExists, [destination]);
    if (originStop.length === 0 || destinationStop.length === 0) {
      throw new Error("Invalid origin or destination");
    };
  } catch (error) {
    console.error("Error checking if stop exists:", error);
    throw new Error("Internal Server Error");
  };
  const query = "INSERT INTO tickets (origin, destination, uuid) VALUES (?, ?, ?)";
  try {
    await executeQuery(query, [origin, destination, uuid]);
    return uuid;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return createTicket(origin, destination);
    } else {
      console.error("Error creating ticket:", error);
      throw new Error("Internal Server Error");
    };
  };
};