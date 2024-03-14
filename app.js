import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import checkJSON from "./src/middlewares/checkJSON.js";

// Express Configuration
const app = express();
app.use(cors());
app.options("*", cors());
app.use(process.env.PRODUCTION ? logger("combined") : logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("public")));
app.use(checkJSON);

// Route Imports
import indexRouter from "./src/routes/index.js";
import verifyRouter from "./src/routes/verify.js";
import loginRouter from "./src/routes/login.js";
import refreshRouter from "./src/routes/refresh.js";
import ticketRouter from "./src/routes/ticket.js";
import stopsRouter from "./src/routes/stops.js";

// Route Configuration
app.use("/", indexRouter);
app.use("/verify", verifyRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshRouter);
app.use("/ticket", ticketRouter);
app.use("/stops", stopsRouter);

// Start the server
const startServer = (port = 8000) => {
  port = Number(port);
  const server = http.createServer(app);

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use, trying port ${port + 1}`);
      startServer(port + 1); // Retry with the next port
    } else {
      console.error("Server error:", error);
    };
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

const port = process.env.PORT;
startServer(port);

// Test the SQL connection
import mariadb from "mariadb";
import sqlConfig from "./src/config/dbConfig.js";
const testDBConnection = async () => {
  try {
    const connection = await mariadb.createConnection(sqlConfig);
    console.log(`Connected to SQL Server with ID ${connection.threadId}`);
    await connection.end();
  } catch (error) {
    console.error("Error connecting to SQL Server:", error);
  };
};
testDBConnection();