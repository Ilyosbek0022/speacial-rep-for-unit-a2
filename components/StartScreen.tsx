
'use client';

import React, { useState } from 'react';

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-50 to-white">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 text-center animate-fadeIn">
        <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white text-4xl shadow-xl rotate-6 hover:rotate-0 transition-transform cursor-pointer">
          <i className="fas fa-pencil-alt"></i>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Unit 2 Assessment</h1>
        <p className="text-slate-500 mb-10">Ismingizni kiriting va bilimingizni sinab ko'ring!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 ml-1">
              O'quvchi Ismi
            </label>
            <input
              type="text"
              autoFocus
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-lg font-bold text-slate-700"
              placeholder="Masalan: Ilyos yoki Gulchapchap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all disabled:bg-slate-200 disabled:shadow-none shadow-xl shadow-indigo-100 text-lg active:scale-95"
          >
            Boshlash <i className="fas fa-rocket ml-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
