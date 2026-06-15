import React, { useState } from 'react';
import { Copy, RefreshCw, Calculator, Coins } from 'lucide-react';

export default function ReversePercentageCalculator() {
  const [total, setTotal] = useState<string>('590');
  const [percentage, setPercentage] = useState<string>('18');
  const [calculatedResult, setCalculatedResult] = useState<{
    originalValue: number;
    difference: number;
    total: string;
    percentage: string;
  } | null>({
    originalValue: 500,
    difference: 90,
    total: '590',
    percentage: '18'
  });

  const handleCalculate = () => {
    const numTotal = parseFloat(total);
    const numPercentage = parseFloat(percentage);

    if (!isNaN(numTotal) && !isNaN(numPercentage) && numPercentage > -100) {
      const orig = numTotal / (1 + (numPercentage / 100));
      const diff = numTotal - orig;
      setCalculatedResult({
        originalValue: orig,
        difference: diff,
        total,
        percentage
      });
    } else {
      setCalculatedResult(null);
    }
  };

  const handleReset = () => {
    setTotal('');
    setPercentage('');
    setCalculatedResult(null);
  };

  const handleCopy = () => {
    if (calculatedResult) {
      navigator.clipboard.writeText(
        `Original: ${calculatedResult.originalValue.toFixed(2)}\nTax / Difference: ${calculatedResult.difference.toFixed(2)}`
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
      {/* Inputs Column */}
      <div className="md:col-span-7 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-350 mb-2">Total Amount (After % applied)</label>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden bg-white dark:bg-slate-900 transition-shadow">
              <div className="flex items-center justify-center bg-slate-100/60 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-4 text-slate-400 dark:text-slate-500 select-none shrink-0">
                <Coins className="h-[16px] w-[16px]" />
              </div>
              <input
                type="number"
                className="block w-full px-4 py-3 bg-transparent outline-none text-[16px] text-slate-955 dark:text-white placeholder-slate-400"
                placeholder="e.g. 590"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-350 mb-2">Percentage Added (%)</label>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden bg-white dark:bg-slate-900 transition-shadow">
              <div className="flex items-center justify-center bg-slate-100/60 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-4.5 text-[15px] font-bold text-slate-500 dark:text-slate-400 select-none shrink-0">
                %
              </div>
              <input
                type="number"
                className="block w-full px-4 py-3 bg-transparent outline-none text-[16px] text-slate-955 dark:text-white placeholder-slate-400"
                placeholder="e.g. 18"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow active:scale-[0.99] transition-all cursor-pointer border border-transparent mt-4"
        >
          <Calculator className="w-[18px] h-[18px]" />
          <span>Calculate</span>
        </button>
      </div>

      {/* Result Column */}
      <div className="md:col-span-5 flex">
        <div className="w-full bg-[#f0fdf4]/80 dark:bg-emerald-950/10 border border-[#dcfce7] dark:border-emerald-900/30 rounded-2xl p-6 flex flex-col items-center justify-between text-center min-h-[220px] transition-colors">
          <div>
            <span className="text-[12px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Original Value</span>
            <div className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 my-4 tracking-tight">
              {calculatedResult ? calculatedResult.originalValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'}
            </div>
            <p className="text-[14px] text-slate-650 dark:text-slate-400 font-semibold leading-relaxed">
              {calculatedResult 
                ? `Difference Amount: ${calculatedResult.difference.toLocaleString(undefined, { maximumFractionDigits: 2 })}` 
                : 'Enter values to calculate'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full mt-6 justify-center">
            {calculatedResult && (
              <button 
                onClick={handleCopy} 
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px] font-semibold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
                title="Copy result"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            )}
            <button 
              onClick={handleReset} 
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-[13px] font-semibold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              title="Reset fields"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
