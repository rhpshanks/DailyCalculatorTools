import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import { Copy, Delete } from 'lucide-react';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
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
    navigator.clipboard.writeText(expression || result);
  };

  return (
    <div className="flex flex-col bg-[var(--theme-bg-panel)] rounded shadow-sm border border-[var(--theme-border)] overflow-hidden">
      <div className="p-6 bg-[var(--theme-bg-page)] border-b border-[var(--theme-border)] text-right">
        <div className="flex justify-between items-start mb-2">
           <button onClick={copyToClipboard} className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors p-1 rounded hover:bg-black/5">
             <Copy size={20} />
           </button>
           <div className="text-xl text-[var(--theme-text-muted)] min-h-[30px] overflow-hidden break-all">{expression}</div>
        </div>
        <div className="text-4xl font-mono text-[var(--theme-text-base)] min-h-[48px] overflow-hidden break-all font-bold">
          {result || expression || '0'}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-[1px] bg-[var(--theme-border)] p-[1px]">
        {/* Row 1 */}
        <CalcBtn onClick={() => handleChar('sin(')}>sin</CalcBtn>
        <CalcBtn onClick={() => handleChar('cos(')}>cos</CalcBtn>
        <CalcBtn onClick={() => handleChar('tan(')}>tan</CalcBtn>
        <CalcBtn onClick={clear} className="text-red-500 font-bold bg-[#f1f3f5] dark:bg-[#2A2A3E]">AC</CalcBtn>
        <CalcBtn onClick={backspace} className="text-orange-500 bg-[#f1f3f5] dark:bg-[#2A2A3E]"><Delete size={20} className="mx-auto"/></CalcBtn>

        {/* Row 2 */}
        <CalcBtn onClick={() => handleChar('asin(')}>asin</CalcBtn>
        <CalcBtn onClick={() => handleChar('acos(')}>acos</CalcBtn>
        <CalcBtn onClick={() => handleChar('atan(')}>atan</CalcBtn>
        <CalcBtn onClick={() => handleChar('(')}>(</CalcBtn>
        <CalcBtn onClick={() => handleChar(')')}>)</CalcBtn>

        {/* Row 3 */}
        <CalcBtn onClick={() => handleChar('log10(')}>log</CalcBtn>
        <CalcBtn onClick={() => handleChar('log(')}>ln</CalcBtn>
        <CalcBtn onClick={() => handleChar('!')}>n!</CalcBtn>
        <CalcBtn onClick={() => handleChar('%')}>%</CalcBtn>
        <CalcBtn onClick={() => handleChar('/')} className="bg-[#e9ecef] dark:bg-[#2A2A3E] text-[var(--theme-primary)] font-bold">÷</CalcBtn>

        {/* Row 4 */}
        <CalcBtn onClick={() => handleChar('^')}>x^y</CalcBtn>
        <CalcBtn onClick={() => handleChar('^2')}>x²</CalcBtn>
        <CalcBtn onClick={() => handleChar('7')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">7</CalcBtn>
        <CalcBtn onClick={() => handleChar('8')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">8</CalcBtn>
        <CalcBtn onClick={() => handleChar('9')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">9</CalcBtn>
        <CalcBtn onClick={() => handleChar('*')} className="bg-[#e9ecef] dark:bg-[#2A2A3E] text-[var(--theme-primary)] font-bold">×</CalcBtn>

        {/* Row 5 */}
        <CalcBtn onClick={() => handleChar('sqrt(')}>√</CalcBtn>
        <CalcBtn onClick={() => handleChar('pi')}>π</CalcBtn>
        <CalcBtn onClick={() => handleChar('4')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">4</CalcBtn>
        <CalcBtn onClick={() => handleChar('5')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">5</CalcBtn>
        <CalcBtn onClick={() => handleChar('6')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">6</CalcBtn>
        <CalcBtn onClick={() => handleChar('-')} className="bg-[#e9ecef] dark:bg-[#2A2A3E] text-[var(--theme-primary)] font-bold">−</CalcBtn>

        {/* Row 6 */}
        <CalcBtn onClick={() => handleChar('abs(')}>|x|</CalcBtn>
        <CalcBtn onClick={() => handleChar('e')}>e</CalcBtn>
        <CalcBtn onClick={() => handleChar('1')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">1</CalcBtn>
        <CalcBtn onClick={() => handleChar('2')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">2</CalcBtn>
        <CalcBtn onClick={() => handleChar('3')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">3</CalcBtn>
        <CalcBtn onClick={() => handleChar('+')} className="bg-[#e9ecef] dark:bg-[#2A2A3E] text-[var(--theme-primary)] font-bold">+</CalcBtn>

        {/* Row 7 */}
        <CalcBtn onClick={() => handleChar('floor(')}>flr</CalcBtn>
        <CalcBtn onClick={() => handleChar('ceil(')}>ceil</CalcBtn>
        <CalcBtn className="bg-white dark:bg-[#1f2937] font-semibold text-lg hidden"> </CalcBtn>
        <CalcBtn onClick={() => handleChar('0')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg !col-span-2">0</CalcBtn>
        <CalcBtn onClick={() => handleChar('.')} className="bg-white dark:bg-[#1f2937] font-semibold text-lg">.</CalcBtn>
        <CalcBtn onClick={calculate} className="!bg-[var(--theme-primary)] text-white font-bold text-xl hover:!opacity-90">=</CalcBtn>
      </div>

      {history.length > 0 && (
        <div className="p-4 bg-[var(--theme-bg-page)] border-t border-[var(--theme-border)]">
          <h4 className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider mb-2">History</h4>
          <ul className="space-y-1 text-sm">
            {history.map((h, i) => (
              <li key={i} className="flex justify-between items-center py-1 border-b border-[var(--theme-border)] last:border-0 cursor-pointer hover:bg-black/5 px-2 rounded" onClick={() => setExpression(h.res)}>
                <span className="text-[var(--theme-text-muted)]">{h.expr} =</span>
                <span className="font-mono text-[var(--theme-text-base)]">{h.res}</span>
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
