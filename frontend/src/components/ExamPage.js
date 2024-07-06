import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../styles/ExamPage.css';

const ExamPage = () => {
  const location = useLocation();
  const { questions, time } = location.state;
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(time * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    try {
      const parsed = JSON.parse(questions);
      if (Array.isArray(parsed)) {
        setParsedQuestions(parsed);
      } else {
        console.error('Parsed questions are not an array');
        alert('Error: Questions format is incorrect.');
      }
    } catch (error) {
      console.error('Error parsing questions:', error);
      alert('Error parsing questions. Please try again.');
    }
  }, [questions]);

  
  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
        if (timer === 30) {
          const timerElement = document.getElementById("timer");
          timerElement.style.color = 'red'; // Change timer color to red
          timerElement.classList.add("blink"); // Add blink effect
        }
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleOptionClick = (qIndex, option) => {
    if (userAnswers[qIndex] === option) {
      // If the option is already selected, untick it
      const { [qIndex]: removedOption, ...updatedAnswers } = userAnswers;
      setUserAnswers(updatedAnswers);
    } else {
      // Otherwise, select the option
      setUserAnswers({ ...userAnswers, [qIndex]: option });
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    parsedQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setIsActive(false);
    setTimer(0); // Reset timer to zero
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculatePercentage = () => {
    return (score / parsedQuestions.length) * 100;
  };

  const getAttemptedQuestions = () => {
    return parsedQuestions.map((_, index) => userAnswers.hasOwnProperty(index));
  };

  return (
    <div className="exam-page">
      {score === null && (
        <div className="btn">
          <button id="submit" onClick={handleSubmit}>Submit</button>
          <div id="timer">{formatTime(timer)}</div>
        </div>
      )}
      <div className="question-container">
        {score === null ? (
          <div>
            {parsedQuestions.map((question, index) => (
              <div key={index} className="question-box">
                <p className="question">{index + 1}. {question.question}</p>
                <div className="options">
                  {question.options.map((option, oIndex) => (
                    <span
                      key={oIndex}
                      className={`option ${userAnswers[index] === option ? 'selected' : ''}`}
                      onClick={() => handleOptionClick(index, option)}
                    >
                      {String.fromCharCode(97 + oIndex)}. {option}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3 style={{ color: calculatePercentage() > 33 ? 'green' : 'red' }}>
              Score: {score} / {parsedQuestions.length}
            </h3>
            <h3 style={{ color: calculatePercentage() > 33 ? 'green' : 'red', fontWeight: 'bold' }}>
              {calculatePercentage() > 33 ? 'PASS' : 'FAIL'}
            </h3>
            <h4>Attempted Questions: {getAttemptedQuestions().filter(attempted => attempted).length}</h4>
            <h4>Unattempted Questions: {getAttemptedQuestions().filter(attempted => !attempted).length}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
