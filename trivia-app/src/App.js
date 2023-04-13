import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

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

const TriviaApp = () => {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestions(10, 9, "easy");
      setQuestions(fetchedQuestions.map(q => q.question));
      setCorrectAnswers(fetchedQuestions.map(q => q.correct_answer));
      setIncorrectAnswers(fetchedQuestions.map(q => q.incorrect_answers));
    };

    getQuestions();
  }, []);

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question}</h3>
          <p>Correct Answer: {correctAnswers[index]}</p>
          <p>Incorrect Answers: {incorrectAnswers[index].join(', ')}</p>
        </div>
      ))}
    </div>
  );
};


// function App() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const getQuestions = async () => {
//       const fetchedQuestions = await fetchQuestions(10, 9, "easy");
//       setQuestions(fetchedQuestions);
//     };

//     getQuestions();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <div>
//           {questions.map((question, index) => (
//             <div key={index}>
//               <h3>{question.question}</h3>
//             </div>
//           ))}
//         </div>
//       </header>
//     </div>
//   );
// }

export default TriviaApp;
