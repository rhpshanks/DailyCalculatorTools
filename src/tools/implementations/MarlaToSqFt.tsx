import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function MarlaToSqFt() {
  const [marla, setMarla] = useState<string>('');
  // By default, a marla is 225 or 272 sq ft in Pakistan
  const [marlaSize, setMarlaSize] = useState<string>('225');
  
  const numMarla = parseFloat(marla);
  const numSize = parseFloat(marlaSize);
  const isValid = !isNaN(numMarla) && !isNaN(numSize);
  const sqft = isValid ? numMarla * numSize : 0;

  const handleCopy = () => {
    if (isValid) {
      navigator.clipboard.writeText(`${sqft} sq ft`);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Marla Value</label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none shadow-sm text-lg"
            placeholder="e.g. 10"
            value={marla}
            onChange={(e) => setMarla(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Marla Standard (Sq Ft)</label>
          <select
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-shadow outline-none shadow-sm text-lg"
            value={marlaSize}
            onChange={(e) => setMarlaSize(e.target.value)}
          >
            <option value="225">225 Sq Ft (Standard)</option>
            <option value="272.25">272.25 Sq Ft (Revenue Dept)</option>
            <option value="272">272 Sq Ft (Common)</option>
            <option value="250">250 Sq Ft</option>
          </select>
        </div>
      </div>
      
      {isValid && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={handleCopy} className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors" title="Copy result">
              <Copy className="w-5 h-5" />
            </button>
            <button onClick={() => setMarla('')} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" title="Reset">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-2">
            <div className="text-sm font-medium text-amber-800 mb-1">Total Area in Square Feet:</div>
            <div className="text-3xl font-extrabold text-amber-900">{sqft.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-xl font-normal text-amber-700">sq ft</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
