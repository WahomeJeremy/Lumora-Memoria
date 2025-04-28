require('dotenv').config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;


const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { v2: cloudinary } = require("cloudinary");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

// Upload and send email
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const { name, story } = req.body;
        const file = req.file;

        if (!file) return res.status(400).json({ error: "No image uploaded" });

        // Upload image to Cloudinary
        cloudinary.uploader.upload_stream(
            { folder: "photography_archive" },
            async (error, cloudinaryResult) => {
                if (error) return res.status(500).json({ error: error.message });

                // Send email
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.REN_EMAIL || "wahomejerry35@gmail.com",
                    subject: `New Photography Submission from ${name}`,
                    html: `
                        <h2>New Submission from ${name}</h2>
                        <p><strong>Story:</strong> ${story}</p>
                        <p><strong>Image:</strong></p>
                        <img src="${cloudinaryResult.secure_url}" width="300">
                    `
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: "Submission sent to your email!" });
                });
            }
        ).end(file.buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));