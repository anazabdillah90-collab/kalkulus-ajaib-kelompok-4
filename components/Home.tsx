import React from 'react';
import { CalculatorMode } from '../types';
import { 
  TrendingUp, 
  Scaling, 
  Box, 
  Sigma,
  Triangle
} from 'lucide-react';

interface HomeProps {
  onSelectMode: (mode: CalculatorMode) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectMode }) => {
  const features = [
    {
      mode: CalculatorMode.LIMIT,
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      desc: "Hitung limit fungsi aljabar & trigonometri.",
      color: "bg-purple-100"
    },
    {
      mode: CalculatorMode.DERIVATIVE,
      icon: <Scaling className="w-8 h-8 text-blue-500" />,
      desc: "Cari turunan pertama & kedua dengan langkah.",
      color: "bg-blue-100"
    },
    {
      mode: CalculatorMode.AREA,
      icon: <Sigma className="w-8 h-8 text-green-500" />,
      desc: "Hitung luas daerah di bawah kurva (Integral).",
      color: "bg-green-100"
    },
    {
      mode: CalculatorMode.VOLUME,
      icon: <Box className="w-8 h-8 text-orange-500" />,
      desc: "Visualisasi & hitung volume benda putar.",
      color: "bg-orange-100"
    },
    {
      mode: CalculatorMode.TRIGONOMETRY,
      icon: <Triangle className="w-8 h-8 text-red-500" />,
      desc: "Sederhanakan identitas & cari nilai sudut.",
      color: "bg-red-100"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto">
      
      {/* Welcome Hero Section */}
      <div className="text-center mb-16 max-w-2xl animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200 to-orange-200 opacity-50 group-hover:opacity-80 transition-opacity"></div>
          <span className="text-4xl relative z-10">✨</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 tracking-tight">
          Selamat Datang di<br/>Kalkulator Ajaib
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
          Teman belajar matematika yang manis & pintar. Selesaikan soal kalkulusmu dengan mudah, 
          lengkap dengan langkah-langkah ajaib dan visualisasi cantik.
        </p>

        <div className="mt-8">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 bg-pastel-pink hover:bg-pink-300 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
                Mulai Menghitung
            </button>
        </div>
      </div>

      {/* Magic Calculator Menu Cards */}
      <div id="features" className="w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8 flex items-center justify-center gap-2">
           🧮 Menu Kalkulator Ajaib
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <button
              key={item.mode}
              onClick={() => onSelectMode(item.mode)}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-pastel-pink text-left group flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.mode}</h3>
              <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};