import React, { useState } from 'react';
import { getActiveTools, categories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import PercentageCalculator from '../tools/implementations/PercentageCalculator';
import AdRail from '../components/AdRail';
import { 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Coins
} from 'lucide-react';

export default function HomePage() {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true }); // first FAQ open by default
  const tools = getActiveTools();

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Common Values of 500 for Percentage Calculator
  const commonPercentageValues = [
    { percent: '1%', val: '5' },
    { percent: '10%', val: '50' },
    { percent: '15%', val: '75' },
    { percent: '20%', val: '100' },
    { percent: '25%', val: '125' }
  ];

  // FAQs for Percentage Calculator
  const percentageFaqs = [
    { question: 'What is percentage?', answer: 'A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign "%".' },
    { question: 'How to calculate percentage?', answer: 'To calculate percentage, divide the part by the whole and multiply by 100. Formula: Value = (Amount × Percentage) ÷ 100.' },
    { question: 'What is 15% of 500?', answer: '15% of 500 is calculated as (500 × 15) ÷ 100 = 75.' },
    { question: 'Is the calculator free to use?', answer: 'Yes! Calculator Converter Tools are 100% free, run locally in your browser, and do not store or transmit your personal data.' }
  ];

  return (
    <div className="w-full flex flex-col bg-[#f8fafc] dark:bg-slate-950 transition-colors pt-8">
      {/* Main Grid: Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Content) */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              
              {/* 1. Featured Calculator Panel */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-slate-900/5 transition-shadow">
                {/* Tool Header */}
                <div className="px-6 py-6 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Featured Calculator</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Percentage Calculator</h2>
                  <p className="text-slate-405 dark:text-slate-500 text-[14px]">Calculate percentage of a number.</p>
                </div>
                {/* Active Tool Form Implementation */}
                <div className="p-6 sm:p-8 bg-white dark:bg-slate-900">
                  <PercentageCalculator />
                </div>
              </div>

              {/* 2. Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Formula Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-sm transition-colors">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                      <Coins className="w-5 h-5 text-blue-500" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-550 dark:text-slate-400">Formula</span>
                    </div>
                    
                    {/* Styled Math Formula */}
                    <div className="flex items-center gap-3 font-semibold text-lg text-slate-800 dark:text-slate-200 my-6">
                      <span className="text-[16px] text-slate-500 dark:text-slate-400">Result =</span>
                      <div className="flex flex-col items-center">
                        <span className="px-3 border-b border-slate-300 dark:border-slate-700 pb-0.5 text-slate-800 dark:text-slate-200">Amount × Percentage</span>
                        <span className="pt-0.5 text-slate-800 dark:text-slate-200">100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-550 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4 space-y-1">
                    <p><span className="font-bold text-slate-700 dark:text-slate-350">Amount:</span> The total baseline amount.</p>
                    <p><span className="font-bold text-slate-700 dark:text-slate-350">Percentage:</span> The percentage value to calculate.</p>
                  </div>
                </div>

                {/* Example Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-sm transition-colors">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                      <BookOpen className="w-5 h-5 text-indigo-500" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-550 dark:text-slate-400">Example</span>
                    </div>
                    <h4 className="text-[14px] font-bold text-slate-900 dark:text-white mb-2">Find 15% of 500.</h4>
                    
                    {/* Styled Math Step-by-Step */}
                    <div className="flex items-center gap-2.5 font-medium text-slate-800 dark:text-slate-200 my-4 text-[15px]">
                      <span>15% of 500 =</span>
                      <div className="flex flex-col items-center">
                        <span className="px-2 border-b border-slate-300 dark:border-slate-700 pb-0.5">500 × 15</span>
                        <span className="pt-0.5">100</span>
                      </div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">= 75</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-550 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4">
                    <p>For example, if you pay 15% service tax on a $500 dinner bill, the tax amount totals $75.</p>
                  </div>
                </div>

                {/* Common Values Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-colors md:col-span-1">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">Common Values (Of 500)</span>
                  </div>
                  <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-[14px]">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-left font-bold">
                          <th className="px-4 py-2.5">Percentage</th>
                          <th className="px-4 py-2.5">Of 500</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-650 dark:text-slate-400 font-medium">
                        {commonPercentageValues.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/40 transition-colors">
                            <td className="px-4 py-2.5 text-slate-900 dark:text-white">{row.percent}</td>
                            <td className="px-4 py-2.5 font-bold text-slate-800 dark:text-slate-300">{row.val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FAQ Accordion */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-colors md:col-span-1">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">FAQ</span>
                  </div>
                  <div className="space-y-2.5">
                    {percentageFaqs.map((faq, idx) => {
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
                            <div className="p-3.5 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Related Tools Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-colors md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                    <ArrowRightLeft className="w-5 h-5 text-purple-500" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-555 dark:text-slate-400">Related Tools</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { name: 'Reverse Percentage Calculator', slug: 'reverse-percentage-calculator', desc: 'Find original number before percentage added' },
                      { name: 'Word Counter & Stats', slug: 'word-counter', desc: 'Count words, characters, and reading time' },
                      { name: 'Age & Birthday Calculator', slug: 'age-calculator', desc: 'Find exact chronological age breakdown' },
                      { name: 'Image Resize Tool', slug: 'image-resize-tool', desc: 'Resize, scale, and compress images' }
                    ].map((rt) => (
                      <a
                        key={rt.slug}
                        href={`/${rt.slug}`}
                        className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-555 hover:shadow-sm transition-all group"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {rt.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{rt.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Categories Overview List of All Tools */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Browse All Tools</h3>
                <div className="space-y-10">
                  {categories.map(category => {
                    const categoryTools = tools.filter(t => t.category === category);
                    if (categoryTools.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h4 className="text-[16px] font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-3.5 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                          <span>{category} Tools</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                          {categoryTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
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
