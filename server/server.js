require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
