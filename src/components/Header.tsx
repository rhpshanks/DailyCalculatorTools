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

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Calculators</Link>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Converters</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tools</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a>
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <span>About</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </div>
        </nav>

        {/* Right Side: Theme Toggle, Favorites, Sign In */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          
          <button className="hidden sm:flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-[15px] transition-colors cursor-pointer">
            <Star className="w-[18px] h-[18px]" />
            <span>Favorites</span>
          </button>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer border border-transparent">
            <User className="w-[16px] h-[16px]" />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}
