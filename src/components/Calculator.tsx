import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import { Copy, Delete, Check } from 'lucide-react';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<{expr: string, res: string}[]>([]);

  useEffect(() => {
    try {
      if (expression.trim() !== '') {
        const res = math.evaluate(expression);
        if (typeof res === 'number') {
          setResult(math.format(res, { precision: 10 }));
        } else {
          setResult('');
        }
      } else {
        setResult('');
      }
    } catch {
      setResult(''); // invalid expression, keep result empty
    }
  }, [expression]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      const key = e.key;
      if (/[0-9]/.test(key)) {
        handleChar(key);
      } else if (key === '.') {
        handleChar('.');
      } else if (key === '+') {
        handleChar('+');
      } else if (key === '-') {
        handleChar('-');
      } else if (key === '*') {
        handleChar('*');
      } else if (key === '/') {
        handleChar('/');
      } else if (key === '^') {
        handleChar('^');
      } else if (key === '(') {
        handleChar('(');
      } else if (key === ')') {
        handleChar(')');
      } else if (key === '%') {
        handleChar('%');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape' || key === 'Delete') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  const handleChar = (char: string) => {
    setExpression(prev => prev + char);
  };

  const calculate = () => {
    try {
      const res = math.evaluate(expression);
      if (typeof res === 'number') {
        const formatted = math.format(res, { precision: 10 });
        setHistory(prev => [{ expr: expression, res: formatted }, ...prev].slice(0, 10));
        setExpression(formatted);
        setResult('');
      }
    } catch {
      setResult('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const backspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(expression || result || '0');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // User-friendly formatting helper for display rendering
  const formatExpressionForDisplay = (expr: string) => {
    if (!expr) return '';
    return expr
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ')
      .replace(/\+/g, ' + ')
      .replace(/-/g, ' − ')
      .replace(/pi/g, 'π')
      .replace(/sqrt\(/g, '√(')
      .replace(/floor\(/g, 'flr(')
      .replace(/ceil\(/g, 'ceil(')
      .replace(/abs\(/g, '|(')
      .replace(/log10\(/g, 'log(')
      .replace(/log\(/g, 'ln(');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[var(--theme-bg-panel)] rounded shadow-sm border border-[var(--theme-border)] p-6">
        <h1 className="text-3xl font-bold text-[var(--theme-primary)] mb-2">
          Scientific Calculator
        </h1>
        <p className="text-[var(--theme-text-muted)] mb-6">
          Use the advanced scientific calculator below for expressions, trigonometric operations, and general calculations.
        </p>

        <div className="w-full max-w-2xl mx-auto flex flex-col bg-[var(--theme-bg-panel)] rounded-xl shadow-lg border border-[var(--theme-border)] overflow-hidden">
          {/* LCD Screen Display */}
          <div className="p-6 bg-zinc-900 dark:bg-zinc-950 border-b border-zinc-800 text-right text-white">
            <div className="flex justify-between items-start mb-2">
               <button 
                 onClick={copyToClipboard} 
                 className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10" 
                 title="Copy expression/result"
               >
                 {copied ? (
                   <>
                     <Check size={16} className="text-green-400" />
                     <span className="text-xs text-green-400 font-semibold">Copied!</span>
                   </>
                 ) : (
                   <Copy size={16} />
                 )}
               </button>
               <div className="text-lg font-mono text-zinc-400 min-h-[30px] overflow-hidden break-all">
                 {formatExpressionForDisplay(expression)}
               </div>
            </div>
            <div className="text-4xl font-mono text-white min-h-[48px] overflow-hidden break-all font-bold">
              {formatExpressionForDisplay(result) || formatExpressionForDisplay(expression) || '0'}
            </div>
          </div>

          {/* Grid Layout of Keys (6-Column layout for absolute alignment) */}
          <div className="grid grid-cols-6 gap-[1.5px] bg-zinc-200 dark:bg-zinc-800 p-[1.5px]">
            {/* Row 1 */}
            <CalcBtn onClick={() => handleChar('sin(')}>sin</CalcBtn>
            <CalcBtn onClick={() => handleChar('asin(')}>asin</CalcBtn>
            <CalcBtn onClick={clear} className="text-red-600 dark:text-red-400 font-bold bg-[#f1f3f5] dark:bg-[#2A2A3E] hover:bg-red-50 dark:hover:bg-red-950/20">AC</CalcBtn>
            <CalcBtn onClick={backspace} className="text-orange-600 dark:text-orange-400 bg-[#f1f3f5] dark:bg-[#2A2A3E] hover:bg-orange-50 dark:hover:bg-orange-950/20">
              <Delete size={18} className="mx-auto"/>
            </CalcBtn>
            <CalcBtn onClick={() => handleChar('(')}>(</CalcBtn>
            <CalcBtn onClick={() => handleChar(')')}>)</CalcBtn>

            {/* Row 2 */}
            <CalcBtn onClick={() => handleChar('cos(')}>cos</CalcBtn>
            <CalcBtn onClick={() => handleChar('acos(')}>acos</CalcBtn>
            <CalcBtn onClick={() => handleChar('log10(')}>log</CalcBtn>
            <CalcBtn onClick={() => handleChar('log(')}>ln</CalcBtn>
            <CalcBtn onClick={() => handleChar('!')}>n!</CalcBtn>
            <CalcBtn onClick={() => handleChar('%')}>%</CalcBtn>

            {/* Row 3 */}
            <CalcBtn onClick={() => handleChar('tan(')}>tan</CalcBtn>
            <CalcBtn onClick={() => handleChar('atan(')}>atan</CalcBtn>
            <CalcBtn onClick={() => handleChar('7')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">7</CalcBtn>
            <CalcBtn onClick={() => handleChar('8')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">8</CalcBtn>
            <CalcBtn onClick={() => handleChar('9')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">9</CalcBtn>
            <CalcBtn onClick={() => handleChar('/')} className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold text-lg">÷</CalcBtn>

            {/* Row 4 */}
            <CalcBtn onClick={() => handleChar('^')}>x^y</CalcBtn>
            <CalcBtn onClick={() => handleChar('^2')}>x²</CalcBtn>
            <CalcBtn onClick={() => handleChar('4')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">4</CalcBtn>
            <CalcBtn onClick={() => handleChar('5')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">5</CalcBtn>
            <CalcBtn onClick={() => handleChar('6')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">6</CalcBtn>
            <CalcBtn onClick={() => handleChar('*')} className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold text-lg">×</CalcBtn>

            {/* Row 5 */}
            <CalcBtn onClick={() => handleChar('sqrt(')}>√</CalcBtn>
            <CalcBtn onClick={() => handleChar('pi')}>π</CalcBtn>
            <CalcBtn onClick={() => handleChar('1')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">1</CalcBtn>
            <CalcBtn onClick={() => handleChar('2')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">2</CalcBtn>
            <CalcBtn onClick={() => handleChar('3')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">3</CalcBtn>
            <CalcBtn onClick={() => handleChar('-')} className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold text-lg">−</CalcBtn>

            {/* Row 6 */}
            <CalcBtn onClick={() => handleChar('abs(')}>|x|</CalcBtn>
            <CalcBtn onClick={() => handleChar('e')}>e</CalcBtn>
            <CalcBtn onClick={() => handleChar('0')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800 !col-span-2">0</CalcBtn>
            <CalcBtn onClick={() => handleChar('.')} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg dark:bg-zinc-900 dark:hover:bg-zinc-800">.</CalcBtn>
            <CalcBtn onClick={() => handleChar('+')} className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold text-lg">+</CalcBtn>

            {/* Row 7 */}
            <CalcBtn onClick={() => handleChar('floor(')}>flr</CalcBtn>
            <CalcBtn onClick={() => handleChar('ceil(')}>ceil</CalcBtn>
            <CalcBtn onClick={calculate} className="!bg-[var(--theme-primary-dark)] text-white font-bold text-xl hover:opacity-90 transition-opacity !col-span-4">=</CalcBtn>
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-[var(--theme-bg-panel)] rounded shadow-sm border border-[var(--theme-border)] p-6">
          <h4 className="text-lg font-bold text-[var(--theme-text-base)] mb-3">Calculation History</h4>
          <ul className="divide-y divide-[var(--theme-border)] border border-[var(--theme-border)] rounded-md overflow-hidden bg-[var(--theme-bg-page)] text-sm">
            {history.map((h, i) => (
              <li 
                key={i} 
                className="flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setExpression(h.res)}
                title="Click to load result into calculator"
              >
                <span className="text-[var(--theme-text-muted)] font-mono">{formatExpressionForDisplay(h.expr)} =</span>
                <span className="font-mono font-bold text-[var(--theme-primary)]">{h.res}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CalcBtn({ children, onClick, className = '' }: { children?: React.ReactNode, onClick?: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-2 text-center bg-[#f8f9fa] dark:bg-[#1e1e2d] hover:brightness-95 dark:hover:brightness-110 active:brightness-90 transition-all text-sm font-medium ${className}`}
    >
      {children}
    </button>
  );
}
