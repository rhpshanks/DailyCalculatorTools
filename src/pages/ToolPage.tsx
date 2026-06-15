import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getToolBySlug, getActiveTools } from '../data/tools';
import AdRail from '../components/AdRail';
import ToolFactory from '../tools/ToolFactory';
import { 
  Search, 
  Briefcase, 
  ArrowRightLeft, 
  FileText, 
  Type, 
  Image as ImageIcon, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Percent,
  Coins
} from 'lucide-react';

const categoryDetails = [
  { name: 'Business', label: 'Business Calculators', desc: 'Finance, loans, tax, investment & more', icon: Briefcase, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30' },
  { name: 'Unit Converter', label: 'Unit Converters', desc: 'Length, weight, area, volume & more', icon: ArrowRightLeft, color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800/30' },
  { name: 'Print & Paper', label: 'Paper & Print Tools', desc: 'A4, letter, margins, size converters', icon: FileText, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30' },
  { name: 'Text', label: 'Text Tools', desc: 'Case converter, word counter, formatter', icon: Type, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/30' },
  { name: 'Image & Media', label: 'Image Tools', desc: 'Resize, compress, converters & more', icon: ImageIcon, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30' },
  { name: 'Daily Use', label: 'Daily-use Tools', desc: 'Date, time, age, BMI, temperature & more', icon: Calendar, color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/30' }
];

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tool = slug ? getToolBySlug(slug) : null;
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleCategoryClick = (catName: string) => {
    navigate(`/?q=${encodeURIComponent(catName)}`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-full flex flex-col">
      {/* Search Header Banner (matching Homepage) */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/20 dark:via-slate-950 dark:to-slate-950 pt-10 pb-8 px-4 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="h-5 w-5" />
            </div>
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
              <input
                type="text"
                className="block w-full pl-11 pr-28 py-3 bg-transparent outline-none text-[15px] text-slate-900 dark:text-white placeholder-slate-400"
                placeholder="Search calculators and converters..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1.5 bottom-1.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13.5px] rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Popular Search Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Popular searches:</span>
            {[
              { label: 'Percentage', query: 'Percentage' },
              { label: 'BMI', query: 'BMI' },
              { label: 'Loan EMI', query: 'Loan' },
              { label: 'Unit Converter', query: 'Unit Converter' },
              { label: 'Age Calculator', query: 'Age' },
              { label: 'Discount', query: 'Discount' }
            ].map((pill) => (
              <button
                key={pill.label}
                onClick={() => navigate(`/?q=${pill.query}`)}
                className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-full transition-colors cursor-pointer shadow-sm"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Icons Overlay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-10 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categoryDetails.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-sm transition-all group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 border transition-all ${cat.color} group-hover:scale-105`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-[13px] leading-tight mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.label}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Grid: Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Content) */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            
            {/* 1. Calculator Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-slate-900/10 transition-shadow">
              {/* Tool Header */}
              <div className="px-6 py-8 border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/30">
                <span className="inline-block px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded uppercase tracking-wider mb-2">
                  {tool.category} Tool
                </span>
                <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">{tool.name}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-[15px]">{tool.benefit}</p>
              </div>
              
              {/* Tool Component Loader */}
              <div className="p-6 sm:p-8">
                <ToolFactory tool={tool} />
              </div>
            </div>

            {/* 2. Details Section (Formula, Example, Common Values, FAQs, Related Tools) */}
            {(tool.formulaText || tool.exampleText || tool.tableData || tool.faqs.length > 0 || relatedTools.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Formula Card */}
                {tool.formulaText && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm transition-colors">
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                        <Coins className="w-5 h-5 text-blue-500" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Formula</span>
                      </div>
                      
                      {/* Stylized Math Formula if division/multiplication is present */}
                      {tool.formulaText.includes('÷') || tool.formulaText.includes('/') ? (
                        <div className="flex items-center gap-2.5 font-semibold text-lg text-slate-800 dark:text-slate-200 my-5">
                          <span className="text-[15px] text-slate-500 dark:text-slate-400">Formula:</span>
                          <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[14px] font-mono text-slate-700 dark:text-slate-350">
                            {tool.formulaText}
                          </div>
                        </div>
                      ) : (
                        <div className="my-5 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-slate-850 dark:text-slate-300 text-sm">
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
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Example</span>
                      </div>
                      <p className="text-[14.5px] text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
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
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Common Values</span>
                    </div>
                    <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-xl">
                      <table className="w-full text-[14px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-left font-bold">
                            <th className="px-4 py-2.5">{tool.tableData.headers[0]}</th>
                            <th className="px-4 py-2.5">{tool.tableData.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-600 dark:text-slate-400 font-medium">
                          {tool.tableData.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/40 transition-colors">
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
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">FAQ</span>
                    </div>
                    <div className="space-y-2.5">
                      {tool.faqs.map((faq, idx) => {
                        const isOpen = openFaqs[idx];
                        return (
                          <div key={idx} className="border border-slate-100 dark:border-slate-800/80 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full flex items-center justify-between p-3.5 bg-slate-50/40 dark:bg-slate-900/20 text-left font-bold text-[13.5px] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer"
                            >
                              <span>{faq.question}</span>
                              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {isOpen && (
                              <div className="p-3.5 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850">
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
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Related Tools</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {relatedTools.map((rt) => (
                        <Link
                          key={rt.slug}
                          to={`/${rt.slug}`}
                          className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
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
