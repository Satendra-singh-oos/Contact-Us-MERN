// import { Router } from "express";
// import { createContactAndSendMail } from "../controllers/contact.controller.js";

const { Router } = require("express");
const {
  createContactAndSendMail,
} = require("../controllers/contact.controller.js");
const {
  createOtpVerificationMail,
} = require("../controllers/contact.controller.js");

const router = Router();

router.post("/contact", createContactAndSendMail);
router.get("/", (req, res) => {
  res.json("Hello World");
});

router.post("/otp", createOtpVerificationMail);

module.exports = router;
