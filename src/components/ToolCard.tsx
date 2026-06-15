import { Link } from 'react-router-dom';
import { ToolMetadata } from '../types';
import { ChevronRight } from 'lucide-react';

export default function ToolCard({ tool }: { tool: ToolMetadata }) {
  return (
    <Link 
      to={`/${tool.slug}`}
      className="block group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/5 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase tracking-wider mb-3">
            {tool.category}
          </span>
          <h3 className="text-[16px] font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
            {tool.benefit}
          </p>
        </div>
        
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-850 font-bold text-blue-600 dark:text-blue-400 text-[12.5px] flex items-center gap-0.5 group-hover:gap-1 transition-all">
          <span>Use tool</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
