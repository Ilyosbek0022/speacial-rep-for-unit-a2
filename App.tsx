
'use client';

import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizContainer from './components/QuizContainer';
import ResultScreen from './components/ResultScreen';
import Header from './components/Header';

const App = () => {
  const [userName, setUserName] = useState(null);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  const handleStart = (name) => setUserName(name);

  const handleFinish = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
  };

  const handleRestart = () => {
    setUserName(null);
    setScore(null);
    setUserAnswers({});
  };

  return (
    <div className="all">
  <Header/>
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {!userName ? (
        <StartScreen onStart={handleStart} />
      ) : score === null ? (
        <QuizContainer userName={userName} onFinish={handleFinish} />
      ) : (
        <ResultScreen 
          name={userName} 
          score={score} 
          total={50} 
          userAnswers={userAnswers}
          onRestart={handleRestart} 
        />
      )}
      
      <footer className="py-12 text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Unit 2 Proficiency Test &middot; Smart Learning</p>
      </footer>
    </div>
    </div>
  );
};

export default App;
