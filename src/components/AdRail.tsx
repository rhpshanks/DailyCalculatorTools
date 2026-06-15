import React from 'react';

export default function AdRail() {
  return (
    <aside className="w-full md:w-[300px] shrink-0 flex flex-col gap-6">
      <div className="w-[300px] h-[250px] bg-slate-100/60 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center rounded-2xl text-slate-400 dark:text-slate-500 shadow-sm transition-colors">
        <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-60">Advertisement</span>
        <span className="text-[13px] font-medium">300 x 250</span>
      </div>
      <div className="w-[300px] h-[250px] bg-slate-100/60 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center rounded-2xl text-slate-400 dark:text-slate-500 shadow-sm transition-colors">
        <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-60">Advertisement</span>
        <span className="text-[13px] font-medium">300 x 250</span>
      </div>
    </aside>
  );
}
