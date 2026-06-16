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
  const [precision, setPrecision] = useState<number | 'auto'>('auto');
  const [calcMode, setCalcMode] = useState<'doc' | 'sheets' | 'kids'>('doc');
  const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
  const [steps, setSteps] = useState<string[]>([]);

  const renderStepsByMode = () => {
    if (!fromUnit || !toUnit) return [];
    const val = parseFloat(fromVal) || 0;
    
    // For Document mode (standard steps)
    if (calcMode === 'doc') {
      return steps;
    }
    
    // For Sheets mode (spreadsheet formulas)
    if (calcMode === 'sheets') {
      const localSteps = [];
      localSteps.push(`Spreadsheet Formula (assumes input value is in cell A1):`);
      
      if (cat?.id === 'temperature') {
        if (fromUnit.id === 'fahrenheit' && toUnit.id === 'celsius') {
          localSteps.push(`=(A1 - 32) * 5/9`);
        } else if (fromUnit.id === 'celsius' && toUnit.id === 'fahrenheit') {
          localSteps.push(`=(A1 * 9/5) + 32`);
        } else if (fromUnit.id === 'celsius' && toUnit.id === 'kelvin') {
          localSteps.push(`=A1 + 273.15`);
        } else if (fromUnit.id === 'kelvin' && toUnit.id === 'celsius') {
          localSteps.push(`=A1 - 273.15`);
        } else if (fromUnit.id === 'fahrenheit' && toUnit.id === 'kelvin') {
          localSteps.push(`=(A1 - 32) * 5/9 + 273.15`);
        } else if (fromUnit.id === 'kelvin' && toUnit.id === 'fahrenheit') {
          localSteps.push(`=(A1 - 273.15) * 9/5 + 32`);
        } else {
          localSteps.push(`=CONVERT(A1, "${fromUnit.symbol}", "${toUnit.symbol}")`);
        }
      } else {
        if (fromUnit.ratioToBase && toUnit.ratioToBase) {
          const ratio = fromUnit.ratioToBase / toUnit.ratioToBase;
          const ratioStr = ratio >= 1 || ratio < 0.0001 ? ratio.toString() : ratio.toFixed(6).replace(/\.?0+$/, '');
          localSteps.push(`=A1 * ${ratioStr}`);
        } else {
          localSteps.push(`=CONVERT(A1, "${fromUnit.symbol}", "${toUnit.symbol}")`);
        }
      }
      return localSteps;
    }
    
    // For Kids mode (fun, emoji-rich explanation)
    if (calcMode === 'kids') {
      const localSteps = [];
      localSteps.push(`Let's solve it together! 🌟`);
      
      if (fromUnit.id === toUnit.id) {
        localSteps.push(`Look! Both units are ${fromUnit.name}. No math needed! 🎈`);
        return localSteps;
      }
      
      if (cat?.id === 'temperature') {
        localSteps.push(`Thermometer Fun! 🌡️`);
        if (fromUnit.id === 'fahrenheit' && toUnit.id === 'celsius') {
          localSteps.push(`1. Take our Fahrenheit value: ${val}°F`);
          localSteps.push(`2. Subtract 32 first: ${val} - 32 = ${val - 32}`);
          localSteps.push(`3. Multiply by 5 and divide by 9: (${val - 32}) × 5 ÷ 9 = ${formatForStep((val - 32) * 5/9)}°C`);
          localSteps.push(`Ta-da! That is ${formatForStep((val - 32) * 5/9)}°C! ❄️`);
        } else if (fromUnit.id === 'celsius' && toUnit.id === 'fahrenheit') {
          localSteps.push(`1. Take our Celsius value: ${val}°C`);
          localSteps.push(`2. Multiply by 9 and divide by 5: ${val} × 9 ÷ 5 = ${val * 1.8}`);
          localSteps.push(`3. Add 32: ${val * 1.8} + 32 = ${formatForStep((val * 1.8) + 32)}°F`);
          localSteps.push(`Ta-da! That is ${formatForStep((val * 1.8) + 32)}°F! 🔥`);
        } else {
          const res = convert(val, fromUnit, toUnit);
          localSteps.push(`We convert ${val} ${fromUnit.symbol} to get ${formatForStep(res)} ${toUnit.symbol}! ✨`);
        }
      } else {
        if (fromUnit.ratioToBase && toUnit.ratioToBase) {
          const ratio = fromUnit.ratioToBase / toUnit.ratioToBase;
          const res = val * ratio;
          if (ratio > 1) {
            localSteps.push(`1. One ${fromUnit.name} is bigger! It fits ${ratio >= 1 || ratio < 0.0001 ? ratio.toString() : ratio.toFixed(6).replace(/\.?0+$/, '')} ${toUnit.name}s inside! 📦`);
            localSteps.push(`2. So we multiply: ${val} × ${ratio >= 1 || ratio < 0.0001 ? ratio.toString() : ratio.toFixed(6).replace(/\.?0+$/, '')} = ${formatForStep(res)}`);
            localSteps.push(`Wow! That gives us ${formatForStep(res)} ${toUnit.name}s! 🌈`);
          } else {
            const invRatio = 1 / ratio;
            localSteps.push(`1. One ${toUnit.name} is bigger! It fits ${invRatio >= 1 || invRatio < 0.0001 ? invRatio.toString() : invRatio.toFixed(6).replace(/\.?0+$/, '')} ${fromUnit.name}s inside! 📦`);
            localSteps.push(`2. So we divide: ${val} ÷ ${invRatio >= 1 || invRatio < 0.0001 ? invRatio.toString() : invRatio.toFixed(6).replace(/\.?0+$/, '')} = ${formatForStep(res)}`);
            localSteps.push(`Wow! That gives us ${formatForStep(res)} ${toUnit.name}s! 🌈`);
          }
        } else {
          const res = convert(val, fromUnit, toUnit);
          localSteps.push(`We do magic math to get ${formatForStep(res)} ${toUnit.symbol}! ⚡`);
        }
      }
      return localSteps;
    }
    
    return [];
  };

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

  const formatForStep = (numVal: number) => {
    const precVal = precision === 'auto' ? 10 : precision;
    return numVal.toFixed(precVal).replace(/\.?0+$/, '');
  };

  const generateSteps = (val: number, from: typeof fromUnit, to: typeof toUnit, finalRes: number) => {
    if (!from || !to) return [];
    if (from.id === to.id) return ['Step 1: Units are identical. No calculation needed.'];

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
        formulaStr = `Calculate ${from.symbol} to base, then base to ${to.symbol}`;
        substituteStr = `Result: ${finalRes.toFixed(4)}`;
      }

      localSteps.push(`Step 1: Formula \u2192 ${formulaStr}`);
      localSteps.push(`Step 2: Substitute \u2192 ${substituteStr}`);
      localSteps.push(`Step 3: Result \u2192 ${val}${from.symbol} = ${formatForStep(finalRes)}${to.symbol}`);
      return localSteps;
    }

    // Step 1: formula or factor
    if (from.ratioToBase && to.ratioToBase) {
      const compositeRatio = from.ratioToBase / to.ratioToBase;
      
      // Keep it cleanly readable depending on if it's > 1 or < 1
      const factorFormat = compositeRatio >= 1 || compositeRatio < 0.0001 
          ? compositeRatio.toString() 
          : compositeRatio.toFixed(6).replace(/\.?0+$/, '');

      localSteps.push(`Step 1: Identify calculation factor \u2192 1 ${from.name} = ${factorFormat} ${to.symbol}`);
      localSteps.push(`Step 2: Multiply \u2192 ${val} \u00d7 ${factorFormat} = ${(val * compositeRatio).toFixed(4).replace(/\.?0+$/, '')}`);
      localSteps.push(`Step 3: Result \u2192 ${val} ${from.symbol} = ${formatForStep(finalRes)} ${to.symbol}`);
    } else {
      localSteps.push(`Step 1: Calculate ${val} ${from.symbol} to base unit (${cat?.baseUnit})`);
      let baseVal = val;
      if (from.toBase) baseVal = from.toBase(val);
      else if (from.ratioToBase) baseVal = val * from.ratioToBase;
      localSteps.push(`  \u2192 Result: ${baseVal.toPrecision(6)}`);

      localSteps.push(`Step 2: Calculate base unit to ${to.name}`);
      localSteps.push(`Step 3: Result \u2192 ${val} ${from.symbol} = ${formatForStep(finalRes)} ${to.symbol}`);
    }
    
    return localSteps;
  };

  useEffect(() => {
    if (!fromUnit || !toUnit) return;
    
    const precVal = precision === 'auto' ? 10 : precision;

    if (activeInput === 'from') {
      const num = parseFloat(fromVal);
      if (!isNaN(num)) {
        const res = convert(num, fromUnit, toUnit);
        setToVal(res.toFixed(precVal).replace(/\.?0+$/, ''));
        setSteps(generateSteps(num, fromUnit, toUnit, res));
      } else {
        setToVal('');
        setSteps([]);
      }
    } else {
      const num = parseFloat(toVal);
      if (!isNaN(num)) {
        const res = convert(num, toUnit, fromUnit);
        setFromVal(res.toFixed(precVal).replace(/\.?0+$/, ''));
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
    return <div className="p-8 text-center text-[var(--theme-text-muted)]">Please select a valid calculator from the menu.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[var(--theme-bg-panel)] rounded shadow-sm border border-[var(--theme-border)] p-6">
        <h1 className="text-3xl font-bold text-[var(--theme-primary)] mb-2">
          Calculate {fromUnit?.name} to {toUnit?.name}
        </h1>
        <p className="text-[var(--theme-text-muted)] mb-8">
          Please provide values below to calculate {fromUnit?.name} to {toUnit?.name}, or vice versa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
          <div className="flex flex-col gap-2 min-w-0">
            <label className="text-sm font-semibold text-[var(--theme-text-base)]">Input:</label>
            <div className="flex bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded overflow-hidden focus-within:ring-2 focus-within:ring-[var(--theme-primary)]">
              <input 
                type="number"
                value={fromVal}
                onChange={(e) => { setActiveInput('from'); setFromVal(e.target.value); }}
                className="flex-1 bg-transparent px-3 py-2 outline-none text-lg min-w-0"
                placeholder="Enter value"
              />
              <select 
                title="converter selection"
                value={fromUnit.id}
                onChange={(e) => navigate(`/convert/${catId}-${e.target.value}-to-${toUnit.id}`)}
                className="w-[140px] flex-shrink-0 bg-[var(--theme-bg-panel)] border-l border-[var(--theme-border)] px-3 py-2 outline-none text-[var(--theme-text-muted)] text-sm"
              >
                {units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={handleSwap}
            className="p-3 rounded-full hover:bg-[var(--theme-border)] text-[var(--theme-primary)] transition-colors mb-[2px] mx-auto md:mx-0 flex items-center justify-center"
            title="Swap units"
          >
            <ArrowLeftRight size={24} className="rotate-90 md:rotate-0" />
          </button>

          <div className="flex flex-col gap-2 min-w-0">
            <label className="text-sm font-semibold text-[var(--theme-text-base)]">Output:</label>
            <div className="flex bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded overflow-hidden focus-within:ring-2 focus-within:ring-[var(--theme-primary)]">
              <input 
                type="number"
                value={toVal}
                onChange={(e) => { setActiveInput('to'); setToVal(e.target.value); }}
                className="flex-1 bg-transparent px-3 py-2 outline-none text-lg font-bold text-[var(--theme-primary)] min-w-0"
                placeholder="Result"
              />
              <select 
                title="converter selection to"
                value={toUnit.id}
                onChange={(e) => navigate(`/convert/${catId}-${fromUnit.id}-to-${e.target.value}`)}
                className="w-[140px] flex-shrink-0 bg-[var(--theme-bg-panel)] border-l border-[var(--theme-border)] px-3 py-2 outline-none text-[var(--theme-text-muted)] text-sm"
              >
                {units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Explanation Panel */}
        {steps.length > 0 && (typeof fromVal !== 'undefined' || typeof toVal !== 'undefined') && (fromVal !== '' || toVal !== '') && (
          <div className="border border-[var(--theme-border)] rounded overflow-hidden mb-6">
            <div className="bg-[var(--theme-text-muted)] dark:bg-[#222233] px-4 py-2 flex flex-col sm:flex-row justify-between sm:items-center text-white gap-3">
              <h3 className="font-bold text-sm">Calculation</h3>
              <div className="flex gap-1.5 text-xs">
                {(['doc', 'sheets', 'kids'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setCalcMode(mode)}
                    className={`px-2.5 py-1 rounded transition-colors font-semibold ${
                      calcMode === mode 
                        ? 'bg-[var(--theme-primary)] text-white' 
                        : 'bg-black/20 text-white/85 hover:bg-black/30'
                    }`}
                  >
                    {mode === 'doc' ? 'For Document' : mode === 'sheets' ? 'For Sheets' : 'For Kids'}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#fcfcfc] dark:bg-[var(--theme-bg-panel)] p-4 relative" aria-live="polite">
              <div className="space-y-2 font-mono text-sm text-[var(--theme-text-base)] pr-10">
                {renderStepsByMode().map((step, idx) => (
                  <div key={idx}>{step}</div>
                ))}
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(renderStepsByMode().join('\n'))}
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
            Calculate
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
              onChange={(e) => setPrecision(e.target.value === 'auto' ? 'auto' : Number(e.target.value))}
              className="bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded px-2 py-1 outline-none text-sm"
            >
              <option value="auto">Auto</option>
              {[2,4,6,8,10].map(p => <option key={p} value={p}>{p} decimals</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
