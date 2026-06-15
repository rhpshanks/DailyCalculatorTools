import React, { useState } from 'react';
import { Copy, RefreshCw, Calculator, Coins } from 'lucide-react';

export default function PercentageCalculator() {
  const [amount, setAmount] = useState<string>('500');
  const [percentage, setPercentage] = useState<string>('15');
  const [calculatedResult, setCalculatedResult] = useState<{
    percentValue: number;
    amount: string;
    percentage: string;
  } | null>({
    percentValue: 75,
    amount: '500',
    percentage: '15'
  });

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    const numPercentage = parseFloat(percentage);

    if (!isNaN(numAmount) && !isNaN(numPercentage)) {
      const val = (numAmount * numPercentage) / 100;
      setCalculatedResult({
        percentValue: val,
        amount,
        percentage
      });
    } else {
      setCalculatedResult(null);
    }
  };

  const handleReset = () => {
    setAmount('');
    setPercentage('');
    setCalculatedResult(null);
  };

  const handleCopy = () => {
    if (calculatedResult) {
      navigator.clipboard.writeText(
        `${calculatedResult.percentage}% of ${calculatedResult.amount} = ${calculatedResult.percentValue}`
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
      {/* Inputs Column */}
      <div className="md:col-span-7 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-350 mb-2">Amount</label>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden bg-white dark:bg-slate-900 transition-shadow">
              <div className="flex items-center justify-center bg-slate-100/60 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-4 text-slate-400 dark:text-slate-500 select-none shrink-0">
                <Coins className="h-[16px] w-[16px]" />
              </div>
              <input
                type="number"
                className="block w-full px-4 py-3 bg-transparent outline-none text-[16px] text-slate-950 dark:text-white placeholder-slate-400"
                placeholder="e.g. 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-slate-700 dark:text-slate-350 mb-2">Percentage (%)</label>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden bg-white dark:bg-slate-900 transition-shadow">
              <div className="flex items-center justify-center bg-slate-100/60 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-4.5 text-[15px] font-bold text-slate-500 dark:text-slate-400 select-none shrink-0">
                %
              </div>
              <input
                type="number"
                className="block w-full px-4 py-3 bg-transparent outline-none text-[16px] text-slate-950 dark:text-white placeholder-slate-400"
                placeholder="e.g. 15"
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
            <span className="text-[12px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Result</span>
            <div className="text-6xl font-extrabold text-emerald-600 dark:text-emerald-400 my-4 tracking-tight">
              {calculatedResult ? calculatedResult.percentValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'}
            </div>
            <p className="text-[14px] text-slate-650 dark:text-slate-400 font-semibold leading-relaxed">
              {calculatedResult 
                ? `${calculatedResult.percentage}% of ${parseFloat(calculatedResult.amount).toLocaleString()} = ${calculatedResult.percentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}` 
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
