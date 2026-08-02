const express = require("express");

const app = express();

app.use(express.json());

const API_URL = "http://192.168.100.245:5001/api/sunwin/tx";

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "SUN API Proxy",
        status: "Online",
        endpoint: "/api/sun/tx"
    });
});

// Proxy API
app.get("/api/sun/tx", async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: "Không thể kết nối API gốc"
            });
        }

        const data = await response.json();

        // Trả nguyên JSON
        return res.json(data);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Fetch API thất bại",
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại cổng ${PORT}`);
});
