const express = require("express");
const axios = require("axios");
const app = express();

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: { vs_currency: "usd" },
    });
    const coins = response.data;
    res.render("index", { coins });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cryptocurrency data.");
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
