const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const { readFile } = require("fs").promises;
const path = require("path");
const debug = require("debug")("http");

const app = express();

/* eslint-disable no-debugger, no-console, consistent-return */

app.use(helmet());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  debug('GET index');
  res.send(await readFile("./views/index.html", "utf8"));
});

app.get("/about", async (req, res) => {
  debug('GET about page');
  res.send(await readFile("./views/about.html", "utf8"));
});

app.get("/tuition", async (req, res) => {
  debug('GET tuition info page');
  res.send(await readFile("./views/tuition.html", "utf8"));
});

app.get("/faq", async (req, res) => {
  debug('GET faq page');
  res.send(await readFile("./views/faq.html", "utf8"));
});

app.get("/apply", async (req, res) => {
  debug('GET apply page');
  res.send(await readFile("./views/apply.html", "utf8"));
});

app.get("/contact", async (req, res) => {
  debug('GET contact page');
  res.send(await readFile("./views/contact.html", "utf8"));
});

// Post route for application submission
app.post("/sent", async (req, res) => {
  const output = `
  <body style="background: #fcf5ff">
  <h1 style="color: #9c79e4;">You Have a New Application for Enrollment!</h1>
    
  <h2>Application Info...</h2>
  
  <h3 style="color: #9c79e4;">Student Info</h3>
  <ul style="list-style-type: none;">
    <li>First Name: ${req.body["first-name"]}</li>
    <li>Last Name: ${req.body["last-name"]}</li>
    <li>Date of Birth: ${req.body.birthday}</li>
    <li>Address Line 1: ${req.body.address1}</li>
    <li>Address Line 2: ${req.body.address2}</li>
    <li>Last Grade Completed: ${req.body.grade}</li>
    <li>Last School: ${req.body.school}</li>
  </ul>
  
  <h3 style="color: #9c79e4;">Parent/Guardian Info</h3>
  <ul style="list-style-type: none;">
    <li>First Name: ${req.body["pfirst-name"]}</li>
    <li>Last Name: ${req.body["plast-name"]}</li>
    <li>Address Line 1: ${req.body.sameaddress === 'on' ? req.body.address1 : req.body.paddress1}</li>
    <li>Address Line 2: ${req.body.sameaddress === 'on' ? req.body.address2 : req.body.paddress2}</li>
    <li>Phone: ${req.body["pcell-phone"]}</li>
    <li>Email: ${req.body.pemail}</li>
  </ul>
  
  <h3 style="color: #9c79e4;">Person Responsible for Tuition</h3>
  <ul style="list-style-type: none;">
    <li>First Name: ${req.body.sametuition === 'on' ? req.body["pfirst-name"] : req.body["tfirst-name"]}</li>
    <li>Last Name: ${req.body.sametuition === 'on' ? req.body["plast-name"] : req.body["tlast-name"]}</li>
    <li>Address Line 1: ${req.body.sametuition === 'on' ? (req.body.address1 || req.body.paddress1) : req.body.taddress1}</li>
    <li>Address Line 1: ${req.body.sametuition === 'on' ? (req.body.address2 || req.body.paddress2) : req.body.taddress2}</li>
    <li>Phone: ${req.body.sametuition === 'on' ? req.body["pcell-phone"] || req.body["pwork-phone"] || req.body["phome-phone"] : req.body["tcell-phone"]}</li>
    <li>Email: ${req.body.sametuition === 'on' ? req.body.pemail : req.body.temail}</li>
  </ul>
  
  <h3 style="color: #9c79e4;">Additional Info</h3>
  <ul style="list-style-type: none;">
    <li><strong>What interests you about our program? What do you hope your child will gain from NPCS?:</strong><br><br>${req.body.interest}</li>
    <br>
    <li><strong>Describe your student’s academic and personal strengths:</strong><br><br>${req.body.strengths}</li>
    <br>
    <li><strong>Describe your student’s academic and personal weaknesses:</strong><br><br>${req.body.weaknesses}</li>
    <br>
    <li><strong>NPCS is a teacher-parent partnership. How will you keep your child on track in their studies on the days they are not on campus?:</strong><br><br>${req.body.partnership}</li>
  </ul>
  <br>
  </body>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "laurence.d.castaneda@gmail.com",
      pass: "Yummyfood11",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"NPCS Application Email" <laurence.d.castaneda@gmail.com>', // sender address
    to: "laurence@theexchangechurch.org, makayla@theexchangechurch.org", // list of receivers
    subject: `NPCS Application from ${req.body["first-name"]} ${req.body["last-name"]}`, // Subject line
    text: "", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return debug(error);
    }
    debug("Message sent: %s", info.messageId);
    debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  res.send(await readFile("./views/sent.html", "utf8"));
});

app.listen(4000, () => {
  debug("Listening on http://localhost:4000");
});
