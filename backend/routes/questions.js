// backend/routes/questions.js
const express = require('express');
const router = express.Router();

let storedQuestions = [];

router.post('/', (req, res) => {
  const { questions } = req.body;
  if (questions) {
    storedQuestions = questions;
    return res.status(200).json({ message: 'Questions stored successfully' });
  }
  res.status(400).json({ message: 'Invalid request' });
});

router.get('/', (req, res) => {
  res.status(200).json({ questions: storedQuestions });
});

module.exports = router;
