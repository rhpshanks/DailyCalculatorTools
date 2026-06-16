import { useState } from 'react';
import { unitGroups } from '../utils/conversions';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function CategoryMenu() {
  const [search, setSearch] = useState('');
  const [openGroups, setOpenGroups] = useState<string[]>(unitGroups.map(g => g.name));
  const location = useLocation();

  const toggleGroup = (name: string) => {
    setOpenGroups(prev => 
      prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]
    );
  };

  const filteredGroups = unitGroups.map(group => {
    const cats = group.categories.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.units.some(u => u.name.toLowerCase().includes(search.toLowerCase()))
    );
    return { ...group, categories: cats };
  }).filter(g => g.categories.length > 0);

  return (
    <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex flex-col h-full border border-[var(--theme-border)] bg-[var(--theme-bg-panel)] rounded overflow-hidden">
      <div className="bg-[var(--theme-primary-dark)] text-white px-4 py-3">
        <h2 className="font-bold text-lg">All Converters</h2>
      </div>
      
      <div className="p-3 border-b border-[var(--theme-border)]">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
          <input
            type="text"
            placeholder="Search converters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] text-sm"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-2">
        <Link 
          to="/calculator"
          className={`block px-3 py-2 rounded mb-2 font-medium ${location.pathname === '/calculator' ? 'bg-[var(--theme-primary)] text-white' : 'text-[var(--theme-primary)] hover:bg-[var(--theme-bg-page)]'}`}
        >
          Scientific Calculator
        </Link>
        
        {filteredGroups.map(group => (
          <div key={group.name} className="mb-2">
            <button 
              onClick={() => toggleGroup(group.name)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-sm font-semibold text-[var(--theme-text-muted)] hover:text-[var(--theme-text-base)]"
            >
              {group.name}
              {openGroups.includes(group.name) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {openGroups.includes(group.name) && (
              <div className="pl-2 mt-1 space-y-1">
                {group.categories.map(cat => {
                  // Standard path is to convert from first unit to second unit to show as default
                  const defaultFrom = cat.units[0];
                  const defaultTo = cat.units[1] || cat.units[0];
                  const path = `/convert/${cat.id}-${defaultFrom.id}-to-${defaultTo.id}`;
                  const isActive = location.pathname.startsWith(`/convert/${cat.id}`);
                  
                  return (
                    <Link
                      key={cat.id}
                      to={path}
                      className={`block px-3 py-1.5 text-sm rounded transition-colors ${isActive ? 'bg-black/5 dark:bg-white/10 text-[var(--theme-primary)] font-medium border-l-2 border-[var(--theme-primary)]' : 'text-[var(--theme-text-base)] hover:bg-[var(--theme-bg-page)] border-l-2 border-transparent'}`}
                    >
                      {cat.name}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
        {filteredGroups.length === 0 && (
          <div className="p-4 text-center text-sm text-[var(--theme-text-muted)]">
            No converters found.
          </div>
        )}
      </div>
    </div>
  );
}
