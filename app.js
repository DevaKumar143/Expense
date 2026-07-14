const express = require("express");
const app = express()
const port = 8080
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const expenseRoute = require("./routes/expense.route");
const userRoute = require("./routes/user.route");
const cors = require("cors");


connectDB();
// app.use(cors());
const allowedOrigins = [
  "http://localhost:3000",
  "https://expensetrackertas.netlify.app"
];


app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true
  })
);


app.use(express.json());


app.use("/", userRoute);
app.use("/api", expenseRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});