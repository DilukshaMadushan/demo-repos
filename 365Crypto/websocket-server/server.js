const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const errorHandler = require("./Middleware/error");
const connectDB = require("./Config/db");

//Load env vars
dotenv.config({ path: "./Config/config.env" });

//Connect to the database
connectDB();

//No Route Files yet
//const coin = require("./Routes/coinRouters");

//Interface
// const Spot_Server = require("./Interface/Spot_Server");
// const Future_Server = require("./Interface/Future_Server");
// const Perpetual_Server = require("./Interface/Perpetual_Server");
const WsServer = require("./Interface/Ws_Server");

const app = express();

//Body parser
app.use(express.json());

//Dev login meddleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Core
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, "../Storage/Public")));

//No Mount routes yet
//app.use("/api/spot", spot);

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});

WsServer()
// Spot_Server();
// Future_Server();
// Perpetual_Server();
