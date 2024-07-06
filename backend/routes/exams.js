// backend/routes/exams.js
const express = require('express');
const router = express.Router();

let questionsData = null;

router.post('/questions', (req, res) => {
  questionsData = req.body;
  res.status(200).json({ message: "Questions stored successfully" });
});

router.get('/questions', (req, res) => {
  res.status(200).json(questionsData);
});

module.exports = router;
