// import express, { application } from 'express'
// import cors from "cors"
// import routes from "./routes/contact.route.js"

const express = require("express");
const cors = require("express");
const routes = require("./routes/contact.route");

//import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(cors());

app.use("/api/v1/", routes);

app.get("/", (_req, res) => {
  res.send("Hello There From - API");
});

app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
