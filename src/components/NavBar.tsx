import { Moon, Sun, Eye, Bug, Lightbulb, ArrowLeftRight } from 'lucide-react';
import { useTheme } from '../utils/themeContext';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { isDark, isColorblind, toggleDark, toggleColorblind } = useTheme();

  return (
    <nav className="w-full bg-[var(--theme-primary)] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <ArrowLeftRight size={24} />
        <span className="text-xl font-bold tracking-tight">Daily Calculator Tools</span>
      </Link>
      
      <div className="flex items-center gap-3">
        <button 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/10 hover:bg-black/20 text-sm font-medium transition-colors"
          onClick={() => alert('Report Bug modal would open here')}
        >
          <Bug size={16} />
          <span className="hidden sm:inline">Report a Bug</span>
        </button>
        <button 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/10 hover:bg-black/20 text-sm font-medium transition-colors"
          onClick={() => alert('Request Feature modal would open here')}
        >
          <Lightbulb size={16} />
          <span className="hidden sm:inline">Request Feature</span>
        </button>
        <div className="w-px h-6 bg-white/20 mx-1"></div>
        <button 
          onClick={toggleColorblind}
          title="Toggle Colorblind Mode"
          className={`p-2 rounded transition-colors ${isColorblind ? 'bg-white/20' : 'hover:bg-black/10'}`}
        >
          <Eye size={20} />
        </button>
        <button 
          onClick={toggleDark}
          title="Toggle Dark Mode"
          className="p-2 rounded hover:bg-black/10 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
