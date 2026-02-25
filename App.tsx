'use client';

import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuizContainer from './components/QuizContainer';
import ResultScreen from './components/ResultScreen';
import Header from './components/Header';

const TEST_DURATION = 25 * 60; // 25 minutes (in seconds)

const App = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<any>({});

  const [timeLeft, setTimeLeft] = useState<number>(TEST_DURATION);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // ⏳ TIMER LOGIC (faqat App ichida)
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = (name: string) => {
    setUserName(name);
    setTimeLeft(TEST_DURATION);
    setIsRunning(true);
  };

  const handleFinish = (finalScore: number, answers: any) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setIsRunning(false);
  };

  const handleRestart = () => {
    setUserName(null);
    setScore(null);
    setUserAnswers({});
    setTimeLeft(TEST_DURATION);
    setIsRunning(false);
  };

  return (
    <div className="all">

      {/* Agar Header timeLeft qabul qilmasa ham problem emas */}
      <Header />

      {/* TIMER DISPLAY (App ichida ko‘rsatamiz) */}
      {userName && score === null && (
        <div className="fixed top-4 right-4 bg-black text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl z-50">
          ⏳ {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      )}

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
        {!userName ? (
          <StartScreen onStart={handleStart} />
        ) : score === null ? (
          <QuizContainer
            userName={userName}
            onFinish={handleFinish}
          />
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
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
            Unit 2 Proficiency Test · Smart Learning
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;