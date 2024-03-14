import mariadb from "mariadb";
import sqlConfig from "../config/dbConfig.js";

const executeQuery = async (query, values = [], retries = 3) => {
  try {
    const connection = await mariadb.createConnection(sqlConfig);
    try {
      const results = await connection.query(query, values);
      return results;
    } catch (error) {
      console.error("Error executing query:", error.message);
    };
    await connection.end();
  } catch (error) {
    console.error("Error connecting to SQL Server, retrying:", error);
    if (retries) {
      retries--;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await executeQuery(query, values, retries);
    } else {
      console.error("Error connecting to SQL Server:", error);
    };
  };
};

export default executeQuery;