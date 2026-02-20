
'use client';

import React, { useState, useMemo } from 'react';
import { quizData } from '../quizData';

const QuizContainer = ({ userName, onFinish }) => {
  const [answers, setAnswers] = useState({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    quizData.forEach(q => {
      if (!grouped[q.task]) grouped[q.task] = [];
      grouped[q.task].push(q);
    });
    return Object.entries(grouped);
  }, []);

  const currentTaskTitle = sections[currentSectionIndex][0];
  const currentQuestions = sections[currentSectionIndex][1];

  const boxOptions = useMemo(() => {
    if (currentQuestions[0].type === 'box-fill') {
      return currentQuestions[0].options || [];
    }
    return null;
  }, [currentQuestions]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleFinish = () => {
    let finalScore = 0;
    quizData.forEach(q => {
      if (q.isExample) return;
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();
      const correctAnswer = q.correctAnswer.toLowerCase();
      if (userAnswer === correctAnswer) {
        finalScore += 1;
      }
    });
    onFinish(finalScore, answers);
  };

  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 pb-32">
      <header className="mb-10 sticky top-4 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] z-30 border border-slate-100 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            <i className="fas fa-book-open"></i>
          </div>
          <div>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">O'quvchi</p>
            <h2 className="text-xl font-black text-slate-800 leading-none">{userName}</h2>
          </div>
        </div>
        <div className="w-40 flex flex-col gap-2">
           <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
           </div>
           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="bg-indigo-600 h-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
           </div>
        </div>
      </header>

      {boxOptions && (
        <div className="mb-10 p-8 bg-indigo-50 rounded-[2.5rem] border-4 border-dashed border-indigo-200 relative overflow-hidden group">
          <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-3">
            <i className="fas fa-box-open text-lg"></i> Words for this Task:
          </h3>
          <div className="flex flex-wrap gap-3 relative z-10">
            {boxOptions.map((opt, idx) => (
              <span key={idx} className="bg-white px-5 py-3 rounded-2xl text-sm font-black text-slate-700 shadow-sm border border-slate-100">
                {opt}
              </span>
            ))}
          </div>
        </div>
      )}

      <main className="space-y-8 animate-fadeIn">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-slate-800 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Part {currentSectionIndex + 1}</span>
          <h1 className="text-xl font-black text-slate-700">{currentTaskTitle}</h1>
        </div>

        {currentQuestions.map((q) => {
          const isExample = q.isExample;
          return (
            <div key={q.id} className={`p-8 rounded-[2.5rem] border-2 transition-all ${isExample ? 'bg-amber-50/30 border-amber-100' : 'bg-white border-slate-50 hover:border-indigo-100 hover:shadow-xl'}`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xs ${isExample ? 'bg-amber-400 text-amber-900' : 'bg-indigo-100 text-indigo-700'}`}>
                  {isExample ? 'EX' : q.id.split('_')[1]}
                </div>
                
                <div className="flex-1 w-full">
                  {q.visualHint && (
                    <div className="mb-4 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 w-fit">
                      <i className="fas fa-hand-point-right text-indigo-500"></i>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{q.visualHint}</span>
                    </div>
                  )}

                  <div className="text-xl text-slate-800 font-bold mb-8 leading-relaxed">
                    {q.label.split('[blank]').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="inline-flex items-center mx-2 font-black text-indigo-600 border-b-4 border-indigo-400 min-w-[120px] justify-center px-4 bg-indigo-50/50 rounded-t-xl h-10">
                            {answers[q.id] || "..."}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-4">
                    {q.type === 'choice' && (
                      <div className="flex flex-wrap gap-3">
                        {q.options?.map(opt => (
                          <button
                            key={opt}
                            disabled={isExample}
                            onClick={() => handleAnswerChange(q.id, opt)}
                            className={`px-6 py-4 rounded-2xl font-black border-2 transition-all ${
                              answers[q.id] === opt 
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === 'box-fill' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {q.options?.map(opt => (
                          <button
                            key={opt}
                            disabled={isExample}
                            onClick={() => handleAnswerChange(q.id, opt)}
                            className={`px-3 py-3 text-sm rounded-xl border-2 transition-all font-bold ${
                              answers[q.id] === opt 
                              ? 'bg-slate-800 border-slate-800 text-white' 
                              : 'bg-white border-slate-50 text-slate-400 hover:border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {(q.type === 'text-input' || q.type === 'unscramble') && (
                      <input
                        type="text"
                        disabled={isExample}
                        placeholder={isExample ? q.correctAnswer : "Write here..."}
                        value={isExample ? q.correctAnswer : (answers[q.id] || '')}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="w-full max-w-md px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white outline-none transition-all text-lg font-black text-slate-700 bg-slate-50"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex items-center justify-center gap-4 z-40">
        <button
          onClick={() => {
            setCurrentSectionIndex(prev => Math.max(0, prev - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentSectionIndex === 0}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-slate-400 bg-white border border-slate-100 hover:bg-slate-50 disabled:opacity-30"
        >
          <i className="fas fa-chevron-left"></i> Back
        </button>

        <button
          onClick={() => {
            if (currentSectionIndex < sections.length - 1) {
              setCurrentSectionIndex(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              handleFinish();
            }
          }}
          className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-black text-white shadow-xl active:scale-95 ${
            currentSectionIndex === sections.length - 1 ? 'bg-green-600' : 'bg-indigo-600'
          }`}
        >
          {currentSectionIndex === sections.length - 1 ? "Finish Test" : "Next Part"} 
          <i className={`fas ${currentSectionIndex === sections.length - 1 ? 'fa-flag-checkered' : 'fa-chevron-right'}`}></i>
        </button>
      </footer>
    </div>
  );
};

export default QuizContainer;
