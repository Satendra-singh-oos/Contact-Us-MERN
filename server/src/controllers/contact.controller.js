// import config from "../config/index.js";
// import Contact from "../model/contact.schema.js";
// import CustomError from "../utils/CustomError.js";
// import nodemailer from "nodemailer";
// import fs from "node:fs";
// import path from "path";
// import handlebars from "handlebars";
// import { fileURLToPath } from "url";
const config = require("../config/index.js");
const Contact = require("../model/contact.schema.js");
const CustomError = require("../utils/CustomError.js");
const nodemailer = require("nodemailer");
const fs = require("node:fs");
const path = require("path");
const handlebars = require("handlebars");
const { fileURLToPath } = require("url");
//Create Contect
// let emailContent = fs.readFileSync("index.html", "");

const nodemailerFunction = async ({ email, firstname, lastname, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //port: 465,
    //service: "qrofid",
    //host: "smtpout.secureserver.net",
    //host: "mail.qrofid.com",
    port: 465,
    //port: "587",
    secure: true,
    auth: {
      user: config.USER_MAIL,
      pass: config.USER_PASS,
    },
  });
  // const __filename = fileURLToPath(__filename);
  // const __dirname = path.dirname(__filename);

  const absolutePath = path.join(__dirname, "src", "index.hbs");
  console.log(absolutePath);

  const indexHbs = fs.readFileSync(absolutePath, "utf8");
  const template = handlebars.compile(indexHbs);
  const data = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    message: message,
  };
  const html = template(data);

  const mailOptions = {
    from: config.USER_MAIL,
    to: email, // use []list for n number of user
    subject: "New Contact Form Submission",
    //     text: ``,
    html: html,
  };
  await transporter.sendMail(mailOptions);
};

const createContactAndSendMail = async (req, res) => {
  const { firstname, lastname, email, telephone, message } = req.body;

  if (!firstname || !lastname || !email || !telephone || !message) {
    throw new CustomError("Some information is missing");
  }

  const contact = await Contact.create({
    firstname,
    lastname,
    email,
    telephone,
    message,
  });

  await nodemailerFunction({ email, firstname, lastname, message });
  res.status(200).json({
    success: true,
    message: "Contact was Created Succesfully",
    contact,
  });
};

const optpValidationNodmailerFunction = async ({ email }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //port: 465,
    //service: "qrofid",
    //host: "smtpout.secureserver.net",
    //host: "mail.qrofid.com",
    port: 465,
    //port: "587",
    //secure: true,
    auth: {
      user: config.USER_MAIL,
      pass: config.USER_PASS,
    },
  });
  const absolutePath = path.join(__dirname, "src", "otp.hbs");
  //console.log(absolutePath);

  const otpHbs = fs.readFileSync(absolutePath, "utf8");
  const template = handlebars.compile(otpHbs);

  const min = 1000;
  const max = 9999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  const data = {
    otp: otp,
  };
  const html = template(data);

  const mailOptions = {
    from: config.USER_MAIL,
    to: email, // use []list for n number of user
    subject: "New Contact Form Submission",
    //     text: ``,
    html: html,
  };
  await transporter.sendMail(mailOptions);
};

const createOtpVerificationMail = async (req, res) => {
  const email = req.body;
  await optpValidationNodmailerFunction(email);
  if (!email) {
    throw new CustomError("Some information is missing");
  }
  res.status(200).json({
    success: true,
    message: "Otp  Sent Succesfully",
  });
};

module.exports = { createContactAndSendMail, createOtpVerificationMail };
