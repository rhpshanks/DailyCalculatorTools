import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

interface Props {
  label1: string;
  label2: string;
  forwardRate: number; // to multiply val1 to get val2
  isLinear?: boolean;
}

export default function GenericConverter({ label1, label2, forwardRate }: Props) {
  const [val1, setVal1] = useState<string>('');
  
  const num1 = parseFloat(val1);
  const isValid = !isNaN(num1);
  const val2 = isValid ? num1 * forwardRate : 0;

  const handleCopy = () => {
    if (isValid) {
      navigator.clipboard.writeText(`${val2} ${label2}`);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-slate-700 mb-2">{label1}</label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-shadow outline-none text-lg"
            placeholder="Enter value"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-slate-700 mb-2">{label2}</label>
          <div className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-slate-600 rounded-xl text-lg min-h-[54px] flex items-center">
            {isValid ? `${val2.toLocaleString(undefined, {maximumFractionDigits: 4})}` : '---'}
          </div>
        </div>
      </div>
      {isValid && (
        <div className="flex justify-end gap-2">
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">
              <Copy className="w-4 h-4" /> Copy result
            </button>
            <button onClick={() => setVal1('')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg">
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
        </div>
      )}
    </div>
  );
}
