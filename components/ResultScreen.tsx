
'use client';

import React, { useState } from 'react';
import { quizData } from '../quizData';

const ResultScreen = ({ name, score, total, userAnswers, onRestart }) => {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((score / total) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) return { title: "Super Natija!", sub: "Darslarni juda yaxshi o'zlashtiribdi!", color: "text-green-600", bg: "bg-green-50", icon: "fa-trophy" };
    if (percentage >= 70) return { title: "Yaxshi Natija!", sub: "O'quvchi Unit 1 ni mustahkam o'rganibdi.", color: "text-indigo-600", bg: "bg-indigo-50", icon: "fa-star" };
    return { title: "Yana Harakat Qiling!", sub: "Xatolar ustida ishlab, qayta topshirib ko'ring.", color: "text-orange-600", bg: "bg-orange-50", icon: "fa-book" };
  };

  const fb = getFeedback();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 pb-20">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-fadeIn">
        <div className={`p-16 text-center ${fb.bg} relative`}>
          <div className="relative z-10">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl ${fb.bg} ${fb.color} border-4 border-white rotate-6`}>
              <i className={`fas ${fb.icon}`}></i>
            </div>
            <h1 className="text-5xl font-black text-slate-800 mb-4">{name}</h1>
            <p className="text-xl font-bold text-slate-500 mb-10">{fb.title}</p>
            
            <div className="flex flex-col items-center justify-center">
               <span className="text-8xl font-black text-slate-800 leading-none">{score}</span>
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest mt-4">Jami 50 Balldan</span>
            </div>
          </div>
        </div>

        <div className="p-12">
          <div className="bg-slate-50 rounded-[2rem] p-8 mb-12 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-4">Ota-onalar uchun xulosa:</h2>
            <p className="text-slate-600 font-medium text-lg leading-relaxed">
              {name} Unit 1 (Grammar & Vocabulary) testini muvaffaqiyatli yakunladi. 
              Ushbu testda u jami 50 ta savoldan <span className={`font-black ${fb.color}`}>{score} ta</span> to'g'ri javob topdi ({percentage}%). 
              {fb.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <button
              onClick={() => setShowReview(!showReview)}
              className="bg-slate-800 text-white font-black py-6 rounded-2xl transition-all hover:bg-slate-900 flex items-center justify-center gap-3 text-lg"
            >
              <i className={`fas ${showReview ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              {showReview ? "Izohlarni yopish" : "Xatolar va Izohlar"}
            </button>
            <button
              onClick={onRestart}
              className="bg-indigo-600 text-white font-black py-6 rounded-2xl transition-all hover:bg-indigo-700 flex items-center justify-center gap-3 text-lg"
            >
              <i className="fas fa-sync-alt"></i> Qayta boshlash
            </button>
          </div>

          {showReview && (
            <div className="space-y-8 animate-slideDown">
              <h3 className="text-3xl font-black text-slate-800 mb-10 text-center">Tahlil va Tushuntirishlar</h3>
              {quizData.filter(q => !q.isExample).map((q, idx) => {
                const uAns = (userAnswers[q.id] || "").trim().toLowerCase();
                const cAns = q.correctAnswer.toLowerCase();
                const isCorrect = uAns === cAns;

                return (
                  <div key={q.id} className={`p-10 rounded-[2.5rem] border-2 transition-all ${isCorrect ? 'bg-green-50/20 border-green-100' : 'bg-red-50/20 border-red-100'}`}>
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-white px-4 py-1 rounded-full text-[10px] font-black uppercase text-slate-400 border border-slate-100">Savol {idx + 1}</span>
                      <span className={`px-4 py-1 rounded-full text-xs font-black uppercase ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isCorrect ? 'Barakalla!' : 'Diqqat!'}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-slate-800 mb-8">{q.label.replace('[blank]', '_______')}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Sizning javob:</p>
                        <p className={`text-lg font-black ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>{userAnswers[q.id] || "(Hech narsa)"}</p>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">To'g'ri javob:</p>
                        <p className="text-lg font-black text-green-600">{q.correctAnswer}</p>
                      </div>
                    </div>

                    {q.explanation && (
                      <div className="flex gap-4 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                           <i className="fas fa-lightbulb"></i>
                        </div>
                        <p className="text-indigo-800 font-bold leading-relaxed">
                          <span className="uppercase text-[10px] block text-indigo-400 mb-1">O'qituvchi izohi:</span>
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
