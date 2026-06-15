import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolBySlug, getActiveTools } from '../data/tools';
import AdRail from '../components/AdRail';
import ToolFactory from '../tools/ToolFactory';
import { 
  ArrowRightLeft, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  BookOpen,
  TrendingUp,
  Coins,
  HelpCircle
} from 'lucide-react';

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : null;
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true }); // first FAQ open by default
  
  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Tool not found</h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">We couldn't find the tool you're looking for.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium cursor-pointer shadow-md transition-colors">
          Browse all tools
        </Link>
      </div>
    );
  }

  // Related tools
  const relatedTools = getActiveTools().filter(t => tool.relatedTools.includes(t.slug));

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full flex flex-col bg-[#f8fafc] dark:bg-slate-950 transition-colors pt-8">
      {/* Main Grid: Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Content) */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            
            {/* 1. Calculator Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-slate-900/5 transition-shadow">
              {/* Tool Header */}
              <div className="px-6 py-6 border-b border-slate-250 dark:border-slate-800/65 bg-slate-50/50 dark:bg-slate-900/30">
                <span className="inline-block px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded uppercase tracking-wider mb-2">
                  {tool.category} Tool
                </span>
                <h1 className="text-2xl font-extrabold text-slate-955 dark:text-white tracking-tight mb-1">{tool.name}</h1>
                <p className="text-slate-400 dark:text-slate-500 text-[14px]">{tool.benefit}</p>
              </div>
              
              {/* Tool Component Loader */}
              <div className="p-6 sm:p-8">
                <ToolFactory tool={tool} />
              </div>
            </div>

            {/* 2. Details Section */}
            {(tool.formulaText || tool.exampleText || tool.tableData || tool.faqs.length > 0 || relatedTools.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Formula Card */}
                {tool.formulaText && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm transition-colors">
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                        <Coins className="w-5 h-5 text-blue-500" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-550 dark:text-slate-400">Formula</span>
                      </div>
                      
                      {tool.formulaText.includes('÷') || tool.formulaText.includes('/') ? (
                        <div className="flex items-center gap-2.5 font-semibold text-lg text-slate-800 dark:text-slate-200 my-5">
                          <span className="text-[15px] text-slate-500 dark:text-slate-400">Formula:</span>
                          <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[14px] font-mono text-slate-700 dark:text-slate-350">
                            {tool.formulaText}
                          </div>
                        </div>
                      ) : (
                        <div className="my-5 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-slate-855 dark:text-slate-300 text-sm">
                          {tool.formulaText}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Example Card */}
                {tool.exampleText && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm transition-colors">
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                        <BookOpen className="w-5 h-5 text-indigo-500" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">Example</span>
                      </div>
                      <p className="text-[14.5px] text-slate-605 dark:text-slate-350 leading-relaxed font-semibold">
                        {tool.exampleText}
                      </p>
                    </div>
                  </div>
                )}

                {/* Common Values Table */}
                {tool.tableData && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors md:col-span-1">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">Common Values</span>
                    </div>
                    <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
                      <table className="w-full text-[14px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-left font-bold">
                            <th className="px-4 py-2.5">{tool.tableData.headers[0]}</th>
                            <th className="px-4 py-2.5">{tool.tableData.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-855 text-slate-650 dark:text-slate-400 font-medium">
                          {tool.tableData.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-855/40 transition-colors">
                              <td className="px-4 py-2.5 text-slate-900 dark:text-white">{row.label}</td>
                              <td className="px-4 py-2.5 font-bold text-slate-800 dark:text-slate-300">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* FAQ Accordion */}
                {tool.faqs.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors md:col-span-1">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                      <HelpCircle className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">FAQ</span>
                    </div>
                    <div className="space-y-2.5">
                      {tool.faqs.map((faq, idx) => {
                        const isOpen = openFaqs[idx];
                        return (
                          <div key={idx} className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 text-left font-bold text-[13.5px] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer"
                            >
                              <span>{faq.question}</span>
                              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {isOpen && (
                              <div className="p-3.5 bg-white dark:bg-slate-900 text-xs text-slate-550 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Related Tools Card */}
                {relatedTools.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors md:col-span-2">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                      <ArrowRightLeft className="w-5 h-5 text-purple-500" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">Related Tools</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {relatedTools.map((rt) => (
                        <Link
                          key={rt.slug}
                          to={`/${rt.slug}`}
                          className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-550 hover:shadow-sm transition-all group"
                        >
                          <div className="min-w-0 pr-2">
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {rt.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{rt.category}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
            
          </div>

          {/* Right Column (Ads) */}
          <div className="hidden lg:block w-[300px] shrink-0 self-start sticky top-24">
            <AdRail />
          </div>

        </div>
      </section>
    </div>
  );
}
