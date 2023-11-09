const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
const router = require("./routes/routes");
const { errorController } = require("./controller/errorController");

// process.on("uncaughtException", (err) => {
//   console.log("SHUTTING DOWN");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

app.use(express.json());

// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }));

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/gym/app/v1/", router);

app.all("*", (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is invalid url` });
  next();
});

app.use(errorController);
const server = app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server connected on port", process.env.PORT);
});

// process.on("unhandledRejection", (err) => {
//   console.log("SHUTTING DOWN");
//   console.log(err.message, err.name);
//   server.close(() => {
//     process.exit(1);
//   });
// });
