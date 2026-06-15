import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState<string>('');

  const charCount = text.length;
  // Match words, ignoring extra spaces and punctuation
  const words = text.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;
  
  // Calculate reading time: avg 200 words per minute
  const readingTime = Math.ceil(wordCount / 200);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => setText('');

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-sm font-medium text-slate-500 mb-1 leading-tight">Words</div>
          <div className="text-2xl font-bold text-slate-900">{wordCount.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-sm font-medium text-slate-500 mb-1 leading-tight">Characters</div>
          <div className="text-2xl font-bold text-slate-900">{charCount.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-sm font-medium text-slate-500 mb-1 leading-tight">Reading Time</div>
          <div className="text-2xl font-bold text-slate-900">{wordCount > 0 ? `${readingTime}m` : '0m'}</div>
        </div>
      </div>

      <div className="relative">
        <textarea
          className="w-full h-64 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none resize-y"
          placeholder="Type or paste your text here to count words and characters..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="absolute bottom-4 right-4 flex gap-2">
            <button onClick={handleCopy} className="p-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-sm" title="Copy text">
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={handleClear} className="p-2 bg-white text-rose-500 border border-slate-200 hover:bg-rose-50 rounded-lg transition-colors shadow-sm" title="Clear text">
              <RefreshCw className="w-4 h-4" />
            </button>
        </div>
      </div>
      
    </div>
  );
}
