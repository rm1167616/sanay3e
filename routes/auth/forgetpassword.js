const express = require('express');
const nodemailer = require('nodemailer');
const uuid= require("uuid");
const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '5reyadaaa@gmail.com',
    pass: 'Alfarma_News_4040'
  },
  tls: {
    rejectUnauthorized: false
  }
});


// Route to send confirmation code to email
router.post('/', (req, res) => {
  const { email } = req.body;

  // Generate confirmation code
  const confirmationCode = uuid.v4();

  // Compose email
  const mailOptions = {
    from: 'rmm1167616@gmail.com', // Sender address
    to: email, // Recipient address
    subject: 'Password Reset Confirmation Code',
    text: `Your password reset confirmation code is: ${confirmationCode}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Confirmation code sent successfully' });
    }
  });
});



module.exports = router