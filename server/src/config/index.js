import dontenv from "dotenv";

dontenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/contactUs",
  USER_MAIL: process.env.USER_MAIL,
  USER_PASS: process.env.USER_PASS,
};

export default config;
