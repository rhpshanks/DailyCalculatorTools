import React, { useState } from 'react';

export default function A4SizeInPixels() {
  const [dpi, setDpi] = useState<string>('300');
  
  // A4 is 8.27 x 11.69 inches
  const a4WidthInches = 8.27;
  const a4HeightInches = 11.69;

  const numDpi = parseInt(dpi);
  const isValid = !isNaN(numDpi) && numDpi > 0;
  
  const widthPixels = isValid ? Math.round(a4WidthInches * numDpi) : 0;
  const heightPixels = isValid ? Math.round(a4HeightInches * numDpi) : 0;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Resolution (DPI)</label>
          <select
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white transition-shadow outline-none text-lg"
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
          >
            <option value="72">72 DPI (Web)</option>
            <option value="150">150 DPI (Draft Print)</option>
            <option value="300">300 DPI (High Quality Print)</option>
            <option value="600">600 DPI (Ultra Quality)</option>
            <option value="custom">Custom DPI</option>
          </select>
        </div>
        
        {dpi === 'custom' && (
           <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Custom DPI</label>
             <input
               type="number"
               className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
               placeholder="e.g. 1200"
               onChange={(e) => setDpi(e.target.value)}
             />
           </div>
        )}
      </div>

      {isValid && (
        <div className="bg-white border rounded-xl overflow-hidden mt-6 shadow-sm">
          <div className="flex border-b border-slate-200">
             <div className="flex-1 p-6 border-r border-slate-200 text-center">
                 <div className="text-sm font-medium text-slate-500 mb-1">Width in Pixels</div>
                 <div className="text-3xl font-bold text-slate-900">{widthPixels.toLocaleString()} px</div>
             </div>
             <div className="flex-1 p-6 text-center">
                 <div className="text-sm font-medium text-slate-500 mb-1">Height in Pixels</div>
                 <div className="text-3xl font-bold text-slate-900">{heightPixels.toLocaleString()} px</div>
             </div>
          </div>
          <div className="p-4 bg-slate-50 text-center text-sm text-slate-600">
             Standard A4 Size is 8.27" × 11.69" (210mm × 297mm)
          </div>
        </div>
      )}
    </div>
  );
}
