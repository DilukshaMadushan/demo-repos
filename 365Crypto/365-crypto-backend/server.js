const path = require("path");
const fileupload = require("express-fileupload");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const errorHandler = require("./Middleware/error");
const connectDB = require("./Config/db");

//Route Files
const mount_routes = require("./routes");

//Load env vars
dotenv.config({ path: "./Config/config.env" });

//Connect to the database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev login meddleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Enable CORS
app.use(
  cors({
    origin: [
      "http://365crypto.com",
      "https://365crypto.com",
      "http://localhost:3000",
      "http://ec2-18-191-160-32.us-east-2.compute.amazonaws.com",
    ],
    credentials: true,
  })
);
// app.use(cors());

//File Uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windows: 1 * 60 * 1000, //1 min
  max: 10000,
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Set static folder
app.use(express.static(path.join(__dirname, "../Storage/Public")));

//Mount routes
mount_routes.forEach(route => {
  app.use(route.path, route.route);
});

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
