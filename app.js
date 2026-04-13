const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

const PSPRICES_API_KEY = "81240253-d2fb-4ede-812d-30d0838d5391";
const PSPRICES_BASE = "https://psprices.com/api/b2b/games/";

app.use(cors({ origin: ["http://localhost:3000", "https://jacaosborn.github.io"] }));

app.get("/api/games", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const url = `${PSPRICES_BASE}?${params}`;

    const response = await fetch(url, {
      headers: { "X-API-Key": PSPRICES_API_KEY },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
