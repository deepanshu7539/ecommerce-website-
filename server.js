const express = require("express");
const clothes = require("./data/clothes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Endpoint to search for clothes
app.get("/search", (req, res) => {
  const query = req.query.q;

  if (query && typeof query !== "string") {
    return res.status(400).json({ error: "Invalid search query" });
  }

  let results = clothes;

  if (query) {
    results = clothes.filter((cloth) =>
      cloth.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  results = shuffleArray(results);

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
