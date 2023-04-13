import './App.css';
import React, { useState, useEffect } from "react";
import Question from "./Question";

const fetchQuestions = async (amount = 10, category, difficulty) => {
  const url = `https://opentdb.com/api.php?amount=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    return [];
  }
};

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestions(10, 9, "easy");
      setQuestions(fetchedQuestions);
    };

    getQuestions();
  }, []);

  return (
    <div>
      {questions.map((question, index) => (
        <Question key={index} questionObj={question} />
      ))}
    </div>
  );
}

export default App;
