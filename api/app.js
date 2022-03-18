const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require('./routes/user');

mongoose.connect(
  "mongodb+srv://cezaraluca:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-api.sirxy.mongodb.net/restaurants-manager?retryWrites=true&w=majority"
);

// View engine
// app.set("views", path.join(__dirname, "views")); // tells the system our views will be in the views folder
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

// Set static folder for Angular
// app.use(express.static(path.join(__dirname, "client/restaurants-app")));

app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
