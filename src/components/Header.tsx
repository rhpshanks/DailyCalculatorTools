import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Moon, Sun, Star, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white tracking-tight shrink-0">
          <img src="/logo.jpg" alt="Calculator Converter Tools" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          <span className="hidden sm:inline">Calculator Converter Tools</span>
          <span className="sm:hidden text-lg">CCT</span>
        </Link>

        {/* Right Side: Theme Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>
    </header>
  );
}
