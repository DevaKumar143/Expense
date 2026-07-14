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
app.use(cors());
app.use(express.json());


app.use("/", userRoute);
app.use("/api", expenseRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});