import config from "../config/index.js";
import Contact from "../model/contact.schema.js";
import CustomError from "../utils/CustomError.js";
import nodemailer from "nodemailer";
import fs from "fs";

//Create Contect
//let emailContent = fs.readFileSync("index.html", "utf-8");

export const createContactAndSendMail = async (req, res) => {
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

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    // secure: true,
    auth: {
      user: config.USER_MAIL,
      pass: config.USER_PASS,
    },
  });

  const mailOptions = {
    from: config.USER_MAIL,
    to: email, // use []list for n number of user
    subject: "New Contact Form Submission",
    //     text: ``,
    html: `
    <div
      style="
        max-width: 670px;
        margin: 0 auto;
        background-color: #f2f3f8;
        font-family: 'Open Sans', sans-serif;
      "
    >
      <div style="text-align: center; padding: 80px 0">
        <a href="https://www.google.com/" title="logo" target="_blank">
          <img
            width="80"
            src="https://i.pngimg.me/thumb/f/720/m2i8G6G6Z5A0i8b1.jpg"
            title="logo"
            alt="logo"
          />
        </a>
      </div>
      <div
        style="
          background: #fff;
          border-radius: 3px;
          text-align: center;
          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          margin: 0 15px;
        "
      >
        <div style="padding: 0 35px">
          <h1
            style="
              color: #1e1e2d;
              font-weight: 500;
              margin: 0;
              font-size: 32px;
              font-family: 'Rubik', sans-serif;
              padding-top: 60px;
            "
          >
            Get started
          </h1>
          <p
            style="
              font-size: 15px;
              color: #455056;
              margin: 8px 0 0;
              line-height: 24px;
            "
          >
            Congratulations! You've successfully registered your account with
            FinancePro. Here are your login details,<br /><strong
              >Please ensure the security of your account.</strong
            >
          </p>

          <div
            style="
              display: inline-block;
              vertical-align: middle;
              margin: 29px 0 26px;
              border-bottom: 1px solid #cecece;
              width: 100px;
            "
          ></div>
          <p
            style="
              color: #455056;
              font-size: 18px;
              line-height: 20px;
              margin: 0;
              font-weight: 500;
            "
          >
            <strong
              style="
                display: block;
                font-size: 13px;
                margin: 0 0 4px;
                color: rgba(0, 0, 0, 0.64);
                font-weight: normal;
              "
              >Your Email</strong
            >
            <span style="color: #bb2cd9">${email}</span>
            <strong
              style="
                display: block;
                font-size: 13px;
                margin: 24px 0 4px 0;
                font-weight: normal;
                color: rgba(0, 0, 0, 0.64);
              "
              >Your Name</strong
            >
            <span style="color: #bb2cd9">${firstname} ${" "} ${lastname}</span>
          </p>
          <p
            style="
              color: #455056;
              font-size: 18px;
              line-height: 20px;
              margin: 0;
              font-weight: 500;
            "
          >
            <strong
              style="
                display: block;
                font-size: 13px;
                margin: 2px 0 4px;
                color: rgba(0, 0, 0, 0.64);
                font-weight: normal;
              "
              >Username</strong
            >
            <span style="color: #bb2cd9">${message}</span>
          </p>
          <a
            href="https://www.google.com/"
            style="
              background: #bb2cd9;
              text-decoration: none !important;
              display: inline-block;
              font-weight: 500;
              margin-top: 24px;
              margin-bottom: 24px;
              color: #fff;
              text-transform: uppercase;
              font-size: 14px;
              padding: 10px 24px;
              display: inline-block;
              border-radius: 50px;
            "
            >Login to your Account</a
          >
        </div>
      </div>
      <div style="text-align: center; padding: 20px 0">
        <p
          style="
            font-size: 14px;
            color: rgba(69, 80, 86, 0.7411764705882353);
            line-height: 18px;
            margin: 0 0 0;
          "
        >
          &copy; <strong style="color: #bb2cd9">www.Website.com</strong>
        </p>
      </div>
    </div>
  
    `,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    success: true,
    message: "Contact was Created Succesfully",
    contact,
  });
};
