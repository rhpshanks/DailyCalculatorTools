import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Copy, RotateCcw, Check } from 'lucide-react';
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

const UNIT_DEFINITIONS: Record<string, string> = {
  m: "The fundamental unit of length in the International System of Units (SI), defined by the distance light travels in a vacuum in 1/299,792,458 of a second.",
  cm: "A metric unit of length, equal to one-hundredth of a meter (10^-2 m). Commonly used for measuring everyday items.",
  mm: "A metric unit of length, equal to one-thousandth of a meter (10^-3 m). Used for precise measurements of small hardware or components.",
  km: "A metric unit of length, equal to one thousand meters (10^3 m). Primarily used to express travel distances between geographical places.",
  in: "An imperial and US customary unit of length, defined as exactly 25.4 millimeters. Historically based on the width of a human thumb.",
  ft: "An imperial and US customary unit of length, equal to 12 inches or 0.3048 meters. Originally modeled after the length of an average human foot.",
  yd: "An imperial unit of length, equal to 3 feet or 36 inches (exactly 0.9144 meters). Commonly used in athletic fields and textiles.",
  mi: "A US customary and imperial unit of length, equal to 5,280 feet or 1,760 yards (exactly 1.609344 kilometers). Used for land distances.",
  nmi: "A nautical mile, a unit of length used in navigation, defined as exactly 1,852 meters. It corresponds to one minute of arc of latitude.",
  ly: "A light-year, the astronomical unit of length defined as the distance that light travels in a vacuum in one Julian year (approx. 9.46 trillion kilometers).",
  pc: "A parsec, an astronomical unit of length used to measure large distances outside the Solar System, equal to about 3.26 light-years.",
  kg: "The base unit of mass in the International System of Units (SI), defined by taking the fixed numerical value of the Planck constant h to be 6.62607015×10^-34 J s.",
  g: "A metric unit of mass, equal to one-thousandth of a kilogram (10^-3 kg). Commonly used to weigh foods and light items.",
  mg: "A metric unit of mass, equal to one-millionth of a kilogram (10^-6 kg). Primarily used for pharmaceutical ingredients and scientific research.",
  t: "A metric ton (tonne), equal to 1,000 kilograms. Used to weigh extremely heavy loads like vehicles, steel, and agricultural harvests.",
  lb: "An imperial and US customary unit of weight (mass), defined as exactly 0.45359237 kilograms. Widely used in the US.",
  oz: "An imperial and US customary unit of weight, equal to 1/16 of a pound (approx. 28.35 grams). Commonly used for packaging.",
  st: "A stone, an imperial unit of mass equal to 14 pounds (exactly 6.35029318 kilograms). Used to express human body weight.",
  celsius: "A scale and unit of measurement for temperature, where water freezes at 0°C and boils at 100°C under standard atmospheric conditions.",
  fahrenheit: "A temperature scale widely used in the US, where water freezes at 32°F and boils at 212°F.",
  kelvin: "The primary thermodynamic unit of temperature, starting at absolute zero (0 K, where molecular motion stops).",
  rankine: "An absolute temperature scale named after William Rankine, using Fahrenheit increments, where absolute zero is 0°R.",
  l: "A metric unit of volume, equal to 1 cubic decimeter (dm³), 1,000 cubic centimeters, or 0.264 US gallons.",
  ml: "A metric unit of volume, equal to one-thousandth of a liter (10^-3 L) or 1 cubic centimeter.",
  m3: "A cubic meter, the SI derived unit of volume, equal to the volume of a cube with edges of one meter.",
  "gal-us": "A US gallon, a customary unit of fluid volume equal to 231 cubic inches or exactly 3.785411784 liters.",
  "floz-us": "A US fluid ounce, a customary unit of volume equal to 1/128 of a US gallon (approx. 29.57 milliliters)."
};

const getUnitDefinition = (unit: any, categoryName: string, baseUnit: any) => {
  if (UNIT_DEFINITIONS[unit.id]) {
    return UNIT_DEFINITIONS[unit.id];
  }
  if (unit.ratioToBase === 1 || unit.id === baseUnit?.id) {
    return `The <strong>${unit.name} (${unit.symbol})</strong> is the base unit used for measuring ${categoryName.toLowerCase()} in this converter.`;
  }
  if (unit.ratioToBase) {
    return `The <strong>${unit.name} (${unit.symbol})</strong> is a unit of ${categoryName.toLowerCase()} equal to ${unit.ratioToBase} ${baseUnit?.name || 'base units'}.`;
  }
  return `The <strong>${unit.name} (${unit.symbol})</strong> is a standardized unit of measurement in the ${categoryName.toLowerCase()} category.`;
};

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
  const [copiedVal, setCopiedVal] = useState(false);
  const [copiedSteps, setCopiedSteps] = useState(false);
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
    setCopiedVal(true);
    setTimeout(() => setCopiedVal(false), 2000);
  };

  const handleCopySteps = () => {
    navigator.clipboard.writeText(renderStepsByMode().join('\n'));
    setCopiedSteps(true);
    setTimeout(() => setCopiedSteps(false), 2000);
  };

  const renderElaborativeContent = () => {
    if (!fromUnit || !toUnit) return null;
    
    if (calcMode === 'doc') {
      return (
        <div className="space-y-3 text-sm text-[var(--theme-text-muted)] leading-relaxed">
          <p>
            <strong>How this Conversion Works (Dimensional Analysis):</strong>
          </p>
          <p>
            In professional documentation, academic research, and homework sheets, unit conversions are performed using <em>dimensional analysis</em> (also known as the factor-label method). 
            This method multiplies the starting quantity by a conversion fraction equal to 1. Since the numerator and denominator represent the same physical quantity in different units, the value remains unchanged while the labels convert.
          </p>
          <p>
            For example, to convert from <strong>{fromUnit.name} ({fromUnit.symbol})</strong> to <strong>{toUnit.name} ({toUnit.symbol})</strong>, we identify the exact mathematical relation between them:
          </p>
          <div className="bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded p-3 font-mono text-center text-[var(--theme-text-base)] text-sm">
            {fromUnit.ratioToBase && toUnit.ratioToBase ? (
              <>
                1 {fromUnit.symbol} = {(fromUnit.ratioToBase / toUnit.ratioToBase).toFixed(6).replace(/\.?0+$/, '')} {toUnit.symbol}
              </>
            ) : (
              <>
                Refer to formula: {fromUnit.name} → {toUnit.name}
              </>
            )}
          </div>
          <p>
            When writing these steps in reports or worksheets, always round the final result to the appropriate number of significant figures (precision) relevant to your measured source values to preserve precision integrity.
          </p>
        </div>
      );
    }
    
    if (calcMode === 'sheets') {
      return (
        <div className="space-y-3 text-sm text-[var(--theme-text-muted)] leading-relaxed">
          <p>
            <strong>How to use this formula in Microsoft Excel or Google Sheets:</strong>
          </p>
          <p>
            Spreadsheets make converting a large list of values incredibly quick and automated. Follow these simple steps:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>
              Enter the source value in cell <strong>A1</strong> (or any column, e.g., cell <code>B2</code>).
            </li>
            <li>
              Select the adjacent cell (e.g., cell <code>B1</code>) and paste the formula provided in the box above.
            </li>
            <li>
              Press <code>Enter</code> to see the computed conversion.
            </li>
            <li>
              <strong>Drag to Apply:</strong> Click and hover over the bottom-right corner of the cell containing your formula until the cursor changes to a small black plus sign (<code>+</code>). Click and drag the corner down to copy the formula to other rows (e.g., <code>A2</code>, <code>A3</code>, etc.) automatically.
            </li>
          </ol>
          <p>
            <em>Pro Tip:</em> If you are using standard units, you can also use Google Sheets' and Excel's built-in <code>CONVERT</code> function. For example: <code>=CONVERT(A1, "{fromUnit.symbol}", "{toUnit.symbol}")</code>.
          </p>
        </div>
      );
    }
    
    if (calcMode === 'kids') {
      return (
        <div className="space-y-3 text-sm text-[var(--theme-text-muted)] leading-relaxed">
          <p>
            <strong>✨ Fun Learning Corner! 🌈</strong>
          </p>
          <p>
            Have you ever wondered how big or heavy these units really are? Let's look at some super fun everyday clues:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            {catId === 'length' && (
              <>
                <li>📏 <strong>Millimeters (mm)</strong> are tiny! The thickness of a plastic library card is about 1 mm.</li>
                <li>🐜 <strong>Centimeters (cm)</strong> are small. A ladybug is about 1 cm long, and a standard paperclip is about 3 cm!</li>
                <li>🚶 <strong>Meters (m)</strong> are about the size of a big step you take while walking. A standard doorway is about 2 meters tall!</li>
                <li>🚗 <strong>Kilometers (km)</strong> are for long trips. Walking 1 kilometer takes about 10 to 12 minutes.</li>
              </>
            )}
            {catId === 'weight' && (
              <>
                <li>🧂 <strong>Milligrams (mg)</strong> are super light. A single grain of table salt is about 1 mg!</li>
                <li>📎 <strong>Grams (g)</strong> are light. A single metal paperclip weighs exactly 1 gram!</li>
                <li>🎒 <strong>Kilograms (kg)</strong> are for things you carry. A big bottle of soda or a heavy schoolbook weighs about 1 kg.</li>
                <li>🐘 <strong>Tonnes (t)</strong> are massive! A small elephant weighs about 2 to 3 tonnes!</li>
              </>
            )}
            {catId === 'temperature' && (
              <>
                <li>🥶 <strong>0°C (32°F)</strong> is the temperature where water freezes into ice. Time for a warm jacket!</li>
                <li>🌡️ <strong>20°C (68°F)</strong> is a comfortable indoor room temperature—perfect for playing games!</li>
                <li>🔥 <strong>37°C (98.6°F)</strong> is the normal temperature of the human body.</li>
                <li>🍵 <strong>100°C (212°F)</strong> is super hot! Water boils at this temperature, making lots of steam.</li>
              </>
            )}
            {!['length', 'weight', 'temperature'].includes(catId || '') && (
              <li>💡 Units help us compare things around the world! Just like counting toys, converting units helps us speak the same math language so we can build buildings, bake cookies, and fly spaceships safely together! 🚀</li>
            )}
          </ul>
          <p>
            Remember, unit conversions are like translating languages—but instead of translating words, we are translating size and numbers! 🧠🎒
          </p>
        </div>
      );
    }
    return null;
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
                onClick={handleCopySteps}
                className="absolute bottom-4 right-4 text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] mb-0"
                title="Copy Steps"
              >
                {copiedSteps ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        )}

        {/* Definition and Elaboration Blocks */}
        {steps.length > 0 && (fromVal !== '' || toVal !== '') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[var(--theme-border)]">
             {/* Definitions Column */}
             <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-[var(--theme-primary)]">Unit Definitions</h3>
                <div className="space-y-4">
                   <div className="p-4 bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded">
                      <h4 className="font-semibold text-sm text-[var(--theme-text-base)] mb-1.5">{fromUnit.name} ({fromUnit.symbol})</h4>
                      <p className="text-sm text-[var(--theme-text-muted)]" dangerouslySetInnerHTML={{ __html: getUnitDefinition(fromUnit, cat?.name || '', units.find(u => u.ratioToBase === 1 || u.id === cat?.baseUnit)) }}></p>
                   </div>
                   <div className="p-4 bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded">
                      <h4 className="font-semibold text-sm text-[var(--theme-text-base)] mb-1.5">{toUnit.name} ({toUnit.symbol})</h4>
                      <p className="text-sm text-[var(--theme-text-muted)]" dangerouslySetInnerHTML={{ __html: getUnitDefinition(toUnit, cat?.name || '', units.find(u => u.ratioToBase === 1 || u.id === cat?.baseUnit)) }}></p>
                   </div>
                </div>
             </div>

             {/* Elaborative Context Column */}
             <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-[var(--theme-primary)]">
                   {calcMode === 'doc' ? 'Document Elaboration' : calcMode === 'sheets' ? 'Spreadsheet Elaboration' : 'Kid-Friendly Explanation'}
                </h3>
                <div className="p-5 bg-[var(--theme-bg-page)] border border-[var(--theme-border)] rounded h-full">
                   {renderElaborativeContent()}
                </div>
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
            className="px-6 py-2 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-bold rounded transition-colors flex items-center gap-2"
          >
            {copiedVal ? <Check size={16} /> : <Copy size={16} />}
            {copiedVal ? 'Copied!' : 'Copy'}
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
