require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const crosOption = require("./config/crosOption");
const PORT = process.env.PORT || 3500;
const { logger } = require("./midleware/logEvents");
const errorHandler = require("./midleware/errorHandler");
const verifyJWT = require("./midleware/verifyJWT");
const connectDB = require("./config/dbCon");

connectDB();

app.use(logger);

app.use(cors(crosOption));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.json());

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/register", require("./routes/api/userRegister"));
app.use("/logout", require("./routes/api/logout"));
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MangoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
