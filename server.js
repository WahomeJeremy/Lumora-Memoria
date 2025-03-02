const express = require("express");
const cors = require("cors");
const mpesaPayment = require("./mpesaPayment");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/purchase-ticket", async (req, res) => {
    const { phone, amount, event } = req.body;
    try {
        const response = await mpesaPayment.processPayment(phone, amount);
        res.json({ success: true, message: `Ticket for ${event} purchased successfully!`, data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: "Payment failed", error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
