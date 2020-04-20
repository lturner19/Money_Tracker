//Requiring dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();
const PORT = process.env.port || 3000;

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//setup required to connect to MLab db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";

mongoose.connect(MONGODB_URI, {
  //prevents deprecation warning
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// route
app.use(require("./routes/api.js"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});