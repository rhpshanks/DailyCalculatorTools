import React, { useState } from 'react';
import { Copy, RefreshCw, ArrowRightLeft } from 'lucide-react';

export default function KgToGrams() {
  const [kg, setKg] = useState<string>('');
  
  const numKg = parseFloat(kg);
  const isValid = !isNaN(numKg);
  const grams = isValid ? numKg * 1000 : 0;

  const handleCopy = () => {
    if (isValid) {
      navigator.clipboard.writeText(`${grams} grams`);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-slate-700 mb-2">Kilograms (kg)</label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none shadow-sm text-lg"
            placeholder="e.g. 5"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
          />
        </div>
        <div className="hidden md:flex mt-6 items-center justify-center text-slate-400">
          <ArrowRightLeft className="w-6 h-6" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-slate-700 mb-2">Grams (g)</label>
          <div className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-slate-600 rounded-xl text-lg min-h-[54px] flex items-center">
            {isValid ? `${grams.toLocaleString()} g` : '---'}
          </div>
        </div>
      </div>
      
      {isValid && (
        <div className="flex justify-end gap-2">
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Copy className="w-4 h-4" /> Copy result
            </button>
            <button onClick={() => setKg('')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
        </div>
      )}
    </div>
  );
}
