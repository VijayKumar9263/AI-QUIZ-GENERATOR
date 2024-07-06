const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correctAnswer: { type: String, required: true }
    }
  ],
  time: { type: Number, required: true }
});

module.exports = mongoose.model('Exam', examSchema);
