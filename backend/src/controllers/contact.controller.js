require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');
const logger = require("../configs/winston.config.js");
const {
    ConflictError,
    NotFoundError,
    BadRequestError,
  } = require("../errors/errors.js");

const contactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // Use SSL
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: `AppKYC <pgoyal_realestate@propertymela.in>`, // Sender
        to: process.env.ADMIN_EMAIL, // Recipient
        subject: 'Contact Us Message',
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
    };

    try {
        // Send Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        logger.error('Error sending email:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
    }
};

module.exports= contactForm;