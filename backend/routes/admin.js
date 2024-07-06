const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const { verifyAdminToken } = require('./adminAuth');

router.post('/generate-questions', verifyAdminToken, async (req, res) => {
  const { topic, questions, timeLimit } = req.body;

  try {
    const newExam = new Exam({
      topic,
      questions,
      timeLimit,
    });
    await newExam.save();

    res.status(200).json({ message: 'Questions generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating questions', error });
  }
});

module.exports = router;
