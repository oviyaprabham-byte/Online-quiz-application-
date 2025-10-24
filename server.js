// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // 👈 Serves index.html, CSS, and JS from /public folder

// Correct quiz answers
const correctAnswers = {
  q1: "c",
  q2: "b",
  q3: "b",
  q4: "b",
  q5: "c",
};

// API route to grade the quiz
app.post("/submit-quiz", (req, res) => {
  const userAnswers = req.body;
  let score = 0;
  const total = Object.keys(correctAnswers).length;

  for (let key in correctAnswers) {
    if (userAnswers[key] && userAnswers[key] === correctAnswers[key]) {
      score++;
    }
  }

  res.json({
    message: "Quiz submitted successfully!",
    score,
    total,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});