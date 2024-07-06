// QuestionContext.js
import React, { createContext, useState } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  return (
    <QuestionContext.Provider value={{ questions, updateQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionProvider };
