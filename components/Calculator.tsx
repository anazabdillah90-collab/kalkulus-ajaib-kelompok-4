import React, { useState, useEffect } from 'react';
import { CalculatorMode, CalculationResult } from '../types';
import { solveMathProblem } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ReferenceLine } from 'recharts';
import { Loader2, Calculator, ArrowRight, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface CalculatorProps {
  mode: CalculatorMode;
  onBack: () => void;
}

// Data Contoh Soal
const EXAMPLES: Record<string, Array<{ label: string; expression: string; params?: { limitTo?: string; lowerBound?: string; upperBound?: string; axis?: string } }>> = {
  [CalculatorMode.LIMIT]: [
    { label: "Limit Trigonometri Dasar", expression: "sin(x)/x", params: { limitTo: "0" } },
    { label: "Limit Pemfaktoran", expression: "(x^2 - 4)/(x - 2)", params: { limitTo: "2" } },
    { label: "Limit Tak Hingga", expression: "(3x^2 + 2)/(x^2 - 1)", params: { limitTo: "Infinity" } }
  ],
  [CalculatorMode.DERIVATIVE]: [
    { label: "Polinomial Pangkat 3", expression: "x^3 + 2x^2 - 5x + 1" },
    { label: "Perkalian Trigonometri", expression: "sin(x) * cos(x)" },
    { label: "Aturan Rantai (Chain Rule)", expression: "(2x + 1)^5" }
  ],
  [CalculatorMode.AREA]: [
    { label: "Luas di Bawah Parabola", expression: "x^2", params: { lowerBound: "0", upperBound: "3" } },
    { label: "Luas Gelombang Sinus", expression: "sin(x)", params: { lowerBound: "0", upperBound: "3.14" } },
    { label: "Luas Fungsi Eksponensial", expression: "e^x", params: { lowerBound: "0", upperBound: "1" } }
  ],
  [CalculatorMode.VOLUME]: [
    { label: "Volume Kerucut (Garis Linear)", expression: "x", params: { lowerBound: "0", upperBound: "4", axis: "x" } },
    { label: "Volume Bola (Setengah Lingkaran)", expression: "sqrt(9 - x^2)", params: { lowerBound: "-3", upperBound: "3", axis: "x" } },
    { label: "Volume Benda Putar Parabola", expression: "x^2", params: { lowerBound: "0", upperBound: "2", axis: "y" } }
  ],
  [CalculatorMode.TRIGONOMETRY]: [
    { label: "Identitas Pythagoras", expression: "sin(x)^2 + cos(x)^2" },
    { label: "Sudut Rangkap", expression: "sin(2x)" },
    { label: "Penyederhanaan", expression: "(1 - cos(x))(1 + cos(x))" }
  ]
};

export const CalculatorComponent: React.FC<CalculatorProps> = ({ mode, onBack }) => {
  const [expression, setExpression] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // Specific params
  const [limitTo, setLimitTo] = useState('0');
  const [lowerBound, setLowerBound] = useState('0');
  const [upperBound, setUpperBound] = useState('5');
  const [axis, setAxis] = useState('x');

  // Reset result when mode changes
  useEffect(() => {
    setResult(null);
    setExpression('');
    setLimitTo('0');
    setLowerBound('0');
    setUpperBound('5');
    setAxis('x');
  }, [mode]);

  const handleCalculate = async () => {
    if (!expression) return;
    setLoading(true);
    const params = { limitTo, lowerBound, upperBound, axis };
    const res = await solveMathProblem(mode, expression, params);
    setResult(res);
    setLoading(false);
  };

  const loadExample = (ex: { expression: string; params?: any }) => {
    setExpression(ex.expression);
    if (ex.params) {
      if (ex.params.limitTo !== undefined) setLimitTo(ex.params.limitTo);
      if (ex.params.lowerBound !== undefined) setLowerBound(ex.params.lowerBound);
      if (ex.params.upperBound !== undefined) setUpperBound(ex.params.upperBound);
      if (ex.params.axis !== undefined) setAxis(ex.params.axis);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowRight className="rotate-180" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
          {mode}
        </h1>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
        
        {/* Example Chips */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-500">
            <Lightbulb className="w-4 h-4 text-orange-400" />
            <span>Coba Contoh Soal:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES[mode]?.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => loadExample(ex)}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full text-xs font-medium border border-orange-200 transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Fungsi / Ekspresi Matematika</label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder={mode === CalculatorMode.AREA ? "Contoh: x^2" : "Contoh: sin(x) + x^2"}
              className="w-full p-4 bg-pastel-cream rounded-xl border-2 border-transparent focus:border-pastel-pink focus:outline-none transition-all font-mono text-lg"
            />
          </div>

          {mode === CalculatorMode.LIMIT && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Mendekati (x → a)</label>
              <input
                type="text"
                value={limitTo}
                onChange={(e) => setLimitTo(e.target.value)}
                className="w-full p-3 bg-pastel-cream rounded-xl focus:border-pastel-pink focus:outline-none border-2 border-transparent"
              />
            </div>
          )}

          {(mode === CalculatorMode.AREA || mode === CalculatorMode.VOLUME) && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Batas Bawah (a)</label>
                <input
                  type="number"
                  value={lowerBound}
                  onChange={(e) => setLowerBound(e.target.value)}
                  className="w-full p-3 bg-pastel-cream rounded-xl focus:border-pastel-pink focus:outline-none border-2 border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Batas Atas (b)</label>
                <input
                  type="number"
                  value={upperBound}
                  onChange={(e) => setUpperBound(e.target.value)}
                  className="w-full p-3 bg-pastel-cream rounded-xl focus:border-pastel-pink focus:outline-none border-2 border-transparent"
                />
              </div>
            </>
          )}

          {mode === CalculatorMode.VOLUME && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Sumbu Putar</label>
              <select
                value={axis}
                onChange={(e) => setAxis(e.target.value)}
                className="w-full p-3 bg-pastel-cream rounded-xl focus:border-pastel-pink focus:outline-none border-2 border-transparent"
              >
                <option value="x">Sumbu X</option>
                <option value="y">Sumbu Y</option>
              </select>
            </div>
          )}
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading || !expression}
          className="mt-6 w-full bg-gradient-to-r from-pastel-pink to-orange-300 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Calculator />}
          Hitung Sekarang
        </button>
      </div>

      {/* Output Section */}
      {result && (
        <div className="space-y-6 animate-slide-up">
            
           {/* Graph Visualization */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-pastel-pink/30">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Visualisasi Grafik</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.graphData || []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="x" type="number" domain={['auto', 'auto']} allowDataOverflow />
                  <YAxis domain={['auto', 'auto']} allowDataOverflow />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <ReferenceLine y={0} stroke="#000" />
                  <ReferenceLine x={0} stroke="#000" />
                  {mode === CalculatorMode.AREA ? (
                     <Area type="monotone" dataKey="y" stroke="#FFCDC9" fill="#FFCDC9" fillOpacity={0.6} />
                  ) : (
                     <Line type="monotone" dataKey="y" stroke="#FF9F87" strokeWidth={3} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            {mode === CalculatorMode.VOLUME && (
                <p className="text-center text-xs text-gray-500 mt-2 italic">*Visualisasi 3D direpresentasikan sebagai penampang 2D.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Steps & Explanation */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Langkah-Langkah Solusi</h3>
              <div className="text-sm text-gray-600 mb-4 italic bg-pastel-cream p-3 rounded-lg border-l-4 border-pastel-yellow prose prose-sm max-w-none">
                 <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {result.explanation}
                 </ReactMarkdown>
              </div>
              <div className="space-y-4">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pastel-pink text-white flex items-center justify-center text-xs font-bold mt-1">
                      {idx + 1}
                    </span>
                    <div className="text-gray-700 leading-relaxed font-medium prose prose-pink max-w-none">
                       <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                         {step}
                       </ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Answer */}
            <div className="md:col-span-1">
               <div className="bg-gradient-to-br from-pastel-yellow to-orange-100 rounded-3xl p-6 shadow-md text-center sticky top-6">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Hasil Akhir</h3>
                <div className="text-xl font-bold text-orange-600 break-words py-4 flex justify-center items-center prose prose-lg prose-orange">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {result.finalAnswer}
                  </ReactMarkdown>
                </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};