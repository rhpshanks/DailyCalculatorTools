import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeState = {
  isDark: boolean;
  isColorblind: boolean;
  toggleDark: () => void;
  toggleColorblind: () => void;
};

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('isDark') === 'true';
  });
  
  const [isColorblind, setIsColorblind] = useState(() => {
    return localStorage.getItem('isColorblind') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('isDark', isDark.toString());
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    if (isColorblind) root.classList.add('colorblind');
    else root.classList.remove('colorblind');
    localStorage.setItem('isColorblind', isColorblind.toString());
  }, [isColorblind]);

  const toggleDark = () => setIsDark(p => !p);
  const toggleColorblind = () => setIsColorblind(p => !p);

  return (
    <ThemeContext.Provider value={{ isDark, isColorblind, toggleDark, toggleColorblind }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
