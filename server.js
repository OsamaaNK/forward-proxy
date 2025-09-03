const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 81;

// Enable CORS for all origins
app.use(cors());

// Parse all incoming requests as JSON
app.use(express.json());

// Example endpoint: forward request to another app
app.use( async (req, res) => {
  try {
    // Replace with your target app URL
    const targetUrl = `https://www.change_the_domain_to_target_server.com${req.originalUrl}`;

    // Forward the request body to the target app
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: req.headers,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Forwarding error:", error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
