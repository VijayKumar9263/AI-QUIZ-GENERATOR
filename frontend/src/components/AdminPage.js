import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [inputText, setInputText] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => setInputText(e.target.value);
  const handleInputChange1 = (e) => setInputNumber(e.target.value);
  const handleInputChange2 = (e) => setInputTime(e.target.value);

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    const prompt = `Generate ${inputNumber} MCQ questions for the topic "${inputText}" in JSON format with the following structure: {"questions": [{"question": "string", "options": ["string"], "correctAnswer": "string"}]}. Ensure the JSON is valid.`;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const questions = JSON.parse(response.data.choices[0].message.content).questions;
      console.log("Generated Questions:", questions); // Add logging to check response
  
      // Send questions to the server
      await axios.post('http://localhost:5000/api/exams/questions', { questions });
  
      navigate("/exam", { state: { questions, time: inputTime } });
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <input type="text" placeholder="Enter Exam Topic" value={inputText} onChange={handleInputChange} />
      <input type="number" placeholder="Enter No Of Questions" value={inputNumber} onChange={handleInputChange1} />
      <input type="number" placeholder="Enter Test Time (minutes)" value={inputTime} onChange={handleInputChange2} />
      <button onClick={handleGenerateQuestions} disabled={isLoading}>
        {isLoading ? "Loading..." : "Generate Questions"}
      </button>
    </div>
  );
};

export default AdminPage;
