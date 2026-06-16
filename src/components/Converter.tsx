import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Copy, RotateCcw } from 'lucide-react';
import { unitGroups, getAllCategories } from '../utils/conversions';

function parseConvertParams(slug: string) {
  if (!slug) return { catId: '', fromId: '', toId: '' };
  
  const parts = slug.split('-to-');
  if (parts.length !== 2) return { catId: '', fromId: '', toId: '' };
  
  const part1 = parts[0];
  const toId = parts[1];
  
  const categories = getAllCategories();
  const matchedCat = categories.find(c => part1.startsWith(c.id + '-'));
  
  if (matchedCat) {
    const catId = matchedCat.id;
    const fromId = part1.substring(catId.length + 1);
    return { catId, fromId, toId };
  }
  
  return { catId: '', fromId: '', toId: '' };
}

export default function Converter() {
  const { slug } = useParams();
  const { catId, fromId, toId } = parseConvertParams(slug || '');
  const navigate = useNavigate();

  const categories = getAllCategories();
  const cat = categories.find(c => c.id === catId);
  const units = cat?.units || [];
  
  const fromUnit = units.find(u => u.id === fromId) || units[0];
  const toUnit = units.find(u => u.id === toId) || units[1] || units[0];

  const [fromVal, setFromVal] = useState('1');
  const [toVal, setToVal] = useState('');
  const [precision, setPrecision] = useState(6);
  const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
  const [steps, setSteps] = useState<string[]>([]);

  // The actual conversion math
  const convert = (val: number, from: typeof fromUnit, to: typeof toUnit) => {
    if (!from || !to) return 0;
    
    // First convert to base
    let baseVal = 0;
    if (from.toBase) {
      baseVal = from.toBase(val);
    } else if (from.ratioToBase) {
      baseVal = val * from.ratioToBase;
    }

    // Then convert to target
    let result = 0;
    if (to.fromBase) {
      result = to.fromBase(baseVal);
    } else if (to.ratioToBase) {
      result = baseVal / to.ratioToBase;
    }

    return result;
  };

  const generateSteps = (val: number, from: typeof fromUnit, to: typeof toUnit, finalRes: number) => {
    if (!from || !to) return [];
    if (from.id === to.id) return ['Step 1: Units are identical. No conversion needed.'];

    const localSteps = [];
    
    // Temperature specific (hardcoded formulas for demonstration)
    if (cat?.id === 'temperature') {
      let formulaStr = '';
      let substituteStr = '';
      if (from.id === 'fahrenheit' && to.id === 'celsius') {
        formulaStr = '°C = (°F − 32) × 5/9';
        substituteStr = `(${val} − 32) × 5/9 = ${(val - 32).toFixed(4)} × 0.5556 = ${finalRes.toFixed(4)}`;
      } else if (from.id === 'celsius' && to.id === 'fahrenheit') {
        formulaStr = '°F = (°C × 9/5) + 32';
        substituteStr = `(${val} × 9/5) + 32 = ${(val * 1.8).toFixed(4)} + 32 = ${finalRes.toFixed(4)}`;
      } else if (from.id === 'celsius' && to.id === 'kelvin') {
        formulaStr = 'K = °C + 273.15';
        substituteStr = `${val} + 273.15 = ${finalRes.toFixed(4)}`;
      } else if (from.id === 'kelvin' && to.id === 'celsius') {
        formulaStr = '°C = K − 273.15';
        substituteStr = `${val} − 273.15 = ${finalRes.toFixed(4)}`;
      } else if (from.id === 'fahrenheit' && to.id === 'kelvin') {
        formulaStr = 'K = (°F − 32) × 5/9 + 273.15';
        substituteStr = `(${val} − 32) × 5/9 + 273.15 = ${(val - 32).toFixed(4)} × 0.5556 + 273.15 = ${finalRes.toFixed(4)}`;
      } else if (from.id === 'kelvin' && to.id === 'fahrenheit') {
        formulaStr = '°F = (K − 273.15) × 9/5 + 32';
        substituteStr = `(${val} − 273.15) × 9/5 + 32 = ${(val - 273.15).toFixed(4)} × 1.8 + 32 = ${finalRes.toFixed(4)}`;
      } else {
        formulaStr = `Convert ${from.symbol} to base, then base to ${to.symbol}`;
        substituteStr = `Result: ${finalRes.toFixed(4)}`;
      }

      localSteps.push(`Step 1: Formula \u2192 ${formulaStr}`);
      localSteps.push(`Step 2: Substitute \u2192 ${substituteStr}`);
      localSteps.push(`Step 3: Result \u2192 ${val}${from.symbol} = ${finalRes.toFixed(precision)}${to.symbol}`);
      return localSteps;
    }

    // Step 1: formula or factor
    if (from.ratioToBase && to.ratioToBase) {
      const compositeRatio = from.ratioToBase / to.ratioToBase;
      
      // Keep it cleanly readable depending on if it's > 1 or < 1
      const factorFormat = compositeRatio >= 1 || compositeRatio < 0.0001 
          ? compositeRatio.toString() 
          : compositeRatio.toFixed(6).replace(/\.?0+$/, '');

      localSteps.push(`Step 1: Identify conversion factor \u2192 1 ${from.name} = ${factorFormat} ${to.symbol}`);
      localSteps.push(`Step 2: Multiply \u2192 ${val} \u00d7 ${factorFormat} = ${(val * compositeRatio).toFixed(4).replace(/\.?0+$/, '')}`);
      localSteps.push(`Step 3: Result \u2192 ${val} ${from.symbol} = ${finalRes.toFixed(precision)} ${to.symbol}`);
    } else {
      localSteps.push(`Step 1: Convert ${val} ${from.symbol} to base unit (${cat?.baseUnit})`);
      let baseVal = val;
      if (from.toBase) baseVal = from.toBase(val);
      else if (from.ratioToBase) baseVal = val * from.ratioToBase;
      localSteps.push(`  \u2192 Result: ${baseVal.toPrecision(6)}`);

      localSteps.push(`Step 2: Convert base unit to ${to.name}`);
      localSteps.push(`Step 3: Result \u2192 ${val} ${from.symbol} = ${finalRes.toFixed(precision)} ${to.symbol}`);
    }
    
    return localSteps;
  };

  useEffect(() => {
    if (!fromUnit || !toUnit) return;
    
    if (activeInput === 'from') {
      const num = parseFloat(fromVal);
      if (!isNaN(num)) {
        const res = convert(num, fromUnit, toUnit);
        setToVal(res.toFixed(precision).replace(/\\.?0+$/, ''));
        setSteps(generateSteps(num, fromUnit, toUnit, res));
      } else {
        setToVal('');
        setSteps([]);
      }
    } else {
      const num = parseFloat(toVal);
      if (!isNaN(num)) {
        const res = convert(num, toUnit, fromUnit);
        setFromVal(res.toFixed(precision).replace(/\\.?0+$/, ''));
        setSteps(generateSteps(num, toUnit, fromUnit, res));
      } else {
        setFromVal('');
        setSteps([]);
      }
    }
  }, [fromVal, toVal, fromUnit, toUnit, activeInput, precision]);

  const handleSwap = () => {
    if (catId && fromUnit && toUnit) {
      navigate(`/convert/${catId}-${toUnit.id}-to-${fromUnit.id}`);
      setActiveInput('from');
      setFromVal(toVal);
    }
  };

  const handleClear = () => {
    setFromVal('');
    setToVal('');
    setSteps([]);
    setActiveInput('from');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(toVal);
  };

  if (!cat) {
    return <div className="p-8 text-center text-[var(--theme-text-muted)]">Please select a valid converter from the menu.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[var(--theme-bg-panel)] rounded shadow-sm border border-[var(--theme-border)] p-6">
        <h1 className="text-3xl font-bold text-[var(--theme-primary)] mb-2">
          Convert {fromUnit?.name} to {toUnit?.name}
        </h1>
        <p className="text-[var(--theme-text-muted)] mb-8">
          Please provide values below to convert {fromUnit?.name} to {toUnit?.name}, or vice versa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--theme-text-base)]">From:</label>
            <div className="flex bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded overflow-hidden focus-within:ring-2 focus-within:ring-[var(--theme-primary)]">
              <input 
                type="number"
                value={fromVal}
                onChange={(e) => { setActiveInput('from'); setFromVal(e.target.value); }}
                className="flex-1 bg-transparent px-3 py-2 outline-none text-lg"
                placeholder="Enter value"
              />
              <select 
                title="converter selection"
                value={fromUnit.id}
                onChange={(e) => navigate(`/convert/${catId}-${e.target.value}-to-${toUnit.id}`)}
                className="bg-[var(--theme-bg-panel)] border-l border-[var(--theme-border)] px-3 py-2 outline-none text-[var(--theme-text-muted)]"
              >
                {units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={handleSwap}
            className="hidden md:flex p-3 rounded-full hover:bg-[var(--theme-border)] text-[var(--theme-primary)] transition-colors mb-[2px]"
            title="Swap units"
          >
            <ArrowLeftRight size={24} />
          </button>
          
          <button 
            onClick={handleSwap}
            className="md:hidden p-2 mx-auto rounded hover:bg-[var(--theme-border)] text-[var(--theme-primary)] transition-colors"
          >
            <ArrowLeftRight size={20} className="rotate-90" />
          </button>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--theme-text-base)]">To:</label>
            <div className="flex bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded overflow-hidden focus-within:ring-2 focus-within:ring-[var(--theme-primary)]">
              <input 
                type="number"
                value={toVal}
                onChange={(e) => { setActiveInput('to'); setToVal(e.target.value); }}
                className="flex-1 bg-transparent px-3 py-2 outline-none text-lg font-bold text-[var(--theme-primary)]"
                placeholder="Result"
              />
              <select 
                title="converter selection to"
                value={toUnit.id}
                onChange={(e) => navigate(`/convert/${catId}-${fromUnit.id}-to-${e.target.value}`)}
                className="bg-[var(--theme-bg-panel)] border-l border-[var(--theme-border)] px-3 py-2 outline-none text-[var(--theme-text-muted)]"
              >
                {units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Explanation Panel */}
        {steps.length > 0 && (typeof fromVal !== 'undefined' || typeof toVal !== 'undefined') && (fromVal !== '' || toVal !== '') && (
          <div className="border border-[var(--theme-border)] rounded overflow-hidden mb-6">
            <div className="bg-[var(--theme-text-muted)] dark:bg-[#222233] px-4 py-2 flex justify-between items-center text-white">
              <h3 className="font-bold text-sm">Calculation</h3>
            </div>
            <div className="bg-[#fcfcfc] dark:bg-[var(--theme-bg-panel)] p-4 relative" aria-live="polite">
              <div className="space-y-2 font-mono text-sm text-[var(--theme-text-base)]">
                {steps.map((step, idx) => (
                  <div key={idx}>{step}</div>
                ))}
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(steps.join('\n'))}
                className="absolute bottom-4 right-4 text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] mb-0"
                title="Copy Steps"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 items-center">
          <button 
            onClick={() => { setActiveInput('from'); setFromVal(fromVal); }}
            className="px-6 py-2 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold rounded transition-colors"
          >
            Convert
          </button>
          <button 
            onClick={handleClear}
            className="px-6 py-2 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold rounded transition-colors flex items-center gap-2"
          >
            <RotateCcw size={16} /> Clear
          </button>
          <button 
            onClick={handleCopy}
            className="px-6 py-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] dark:bg-[#2A2A3E] dark:hover:bg-[#3A3A4E] text-[var(--theme-text-base)] font-bold rounded transition-colors flex items-center gap-2"
          >
            <Copy size={16} /> Copy
          </button>
          
          <div className="ml-auto flex items-center gap-2">
            <label className="text-sm text-[var(--theme-text-muted)]">Precision:</label>
            <select 
              title="select precision"
              value={precision}
              onChange={(e) => setPrecision(Number(e.target.value))}
              className="bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded px-2 py-1 outline-none text-sm"
            >
              {[2,4,6,8,10].map(p => <option key={p} value={p}>{p} decimals</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
