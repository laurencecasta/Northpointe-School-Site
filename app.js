const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { readFile } = require("fs").promises;
const path = require("path");

const app = express();

/* eslint-disable no-debugger, no-console, consistent-return */

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send(await readFile("./views/index.html", "utf8"));
});

app.get("/about", async (req, res) => {
  res.send(await readFile("./views/about.html", "utf8"));
});

app.get("/tuition", async (req, res) => {
  res.send(await readFile("./views/tuition.html", "utf8"));
});

app.get("/faq", async (req, res) => {
  res.send(await readFile("./views/faq.html", "utf8"));
});

app.get("/apply", async (req, res) => {
  res.send(await readFile("./views/apply.html", "utf8"));
});

app.get("/contact", async (req, res) => {
  res.send(await readFile("./views/contact.html", "utf8"));
});

// Post route for application submission
app.post("/sent", async (req, res) => {
  const output = `
    <p>Here is the student application information</p>
    <h3>Applitcation Info</h3>

    <ul>
      <li>First Name: ${req.body["first-name"]}</li>
    </ul>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "larrycasta11@gmail.com", // generated ethereal user
      pass: "Goodjourney1209", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Nodemailer Contact" <larrycasta11@gmail.com>', // sender address
    to: "laurence@theexchangechurch.org", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  res.send(await readFile("./views/sent.html", "utf8"));
});

app.listen(8080, () => {
  console.log("App available on http://localhost:8080");
});
