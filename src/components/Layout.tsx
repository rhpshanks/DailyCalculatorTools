import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ShieldAlert, Lock, CheckCircle2, Clock, Shield } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Header />
      
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Badges / Features Section */}
      <section className="bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[15px]">100% Free</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">All tools are free to use.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[15px]">Privacy First</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">No personal data collected.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[15px]">Accurate Results</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Tested formulas you can trust.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-[15px]">Always Available</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Use anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-slate-900 text-slate-400 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <img src="/logo.jpg" alt="Calculator Converter Tools Logo" className="w-7 h-7 rounded-md object-cover" />
              <p className="text-slate-200 font-bold text-lg tracking-tight">Calculator Converter Tools</p>
            </div>
            <p className="text-sm mt-2 text-slate-400">Simple calculators and converters for daily work.</p>
          </div>
          <div className="mt-4 sm:mt-0 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Calculator Converter Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
