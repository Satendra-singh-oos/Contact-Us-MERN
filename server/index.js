// import mongoose from "mongoose";
// import app from "./src/app.js";

// import config from "./src/config/index.js";

const mongoose = require("mongoose");
const app = require("./src/app.js");
const config = require("./src/config/index.js");
require("dotenv").config();
//--x-x-x-x-xx
(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB CONNECTED !");

    app.on("error", (err) => {
      console.error("ERROR : ", err);
      throw err;
    });

    const onListening = () => {
      console.log(`Listing on port ${config.PORT}`);
    };
    app.listen(config.PORT, onListening);
  } catch (err) {
    console.error("ERROR : ", err);
    throw err;
  }
})();
