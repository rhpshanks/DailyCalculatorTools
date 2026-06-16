import { UnitGroup } from '../types';

export const unitGroups: UnitGroup[] = [
  {
    name: 'Common Calculators',
    categories: [
      {
        id: 'length', name: 'Length', baseUnit: 'm',
        units: [
          { id: 'm', name: 'Meter', symbol: 'm', ratioToBase: 1 },
          { id: 'cm', name: 'Centimeter', symbol: 'cm', ratioToBase: 0.01 },
          { id: 'mm', name: 'Millimeter', symbol: 'mm', ratioToBase: 0.001 },
          { id: 'km', name: 'Kilometer', symbol: 'km', ratioToBase: 1000 },
          { id: 'in', name: 'Inch', symbol: 'in', ratioToBase: 0.0254 },
          { id: 'ft', name: 'Foot', symbol: 'ft', ratioToBase: 0.3048 },
          { id: 'yd', name: 'Yard', symbol: 'yd', ratioToBase: 0.9144 },
          { id: 'mi', name: 'Mile', symbol: 'mi', ratioToBase: 1609.344 },
          { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', ratioToBase: 1852 },
          { id: 'ly', name: 'Light Year', symbol: 'ly', ratioToBase: 9.4607e15 },
          { id: 'pc', name: 'Parsec', symbol: 'pc', ratioToBase: 3.085677581e16 }
        ]
      },
      {
        id: 'weight', name: 'Weight / Mass', baseUnit: 'kg',
        units: [
          { id: 'kg', name: 'Kilogram', symbol: 'kg', ratioToBase: 1 },
          { id: 'g', name: 'Gram', symbol: 'g', ratioToBase: 0.001 },
          { id: 'mg', name: 'Milligram', symbol: 'mg', ratioToBase: 1e-6 },
          { id: 't', name: 'Tonne (Metric)', symbol: 't', ratioToBase: 1000 },
          { id: 'lb', name: 'Pound', symbol: 'lb', ratioToBase: 0.45359237 },
          { id: 'oz', name: 'Ounce', symbol: 'oz', ratioToBase: 0.028349523125 },
          { id: 'st', name: 'Stone', symbol: 'st', ratioToBase: 6.35029318 },
          { id: 'carat', name: 'Carat', symbol: 'ct', ratioToBase: 0.0002 },
          { id: 'grain', name: 'Grain', symbol: 'gr', ratioToBase: 0.00006479891 },
        ]
      },
      {
        id: 'temperature', name: 'Temperature', baseUnit: 'c',
        units: [
          { id: 'celsius', name: 'Celsius', symbol: '°C', toBase: v => v, fromBase: v => v },
          { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', toBase: v => (v - 32) * 5/9, fromBase: v => (v * 9/5) + 32 },
          { id: 'kelvin', name: 'Kelvin', symbol: 'K', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
          { id: 'rankine', name: 'Rankine', symbol: '°R', toBase: v => (v - 491.67) * 5/9, fromBase: v => (v + 273.15) * 9/5 },
        ]
      },
      {
        id: 'volume', name: 'Volume', baseUnit: 'l',
        units: [
          { id: 'l', name: 'Liter', symbol: 'L', ratioToBase: 1 },
          { id: 'ml', name: 'Milliliter', symbol: 'mL', ratioToBase: 0.001 },
          { id: 'm3', name: 'Cubic Meter', symbol: 'm³', ratioToBase: 1000 },
          { id: 'cm3', name: 'Cubic Centimeter', symbol: 'cm³', ratioToBase: 0.001 },
          { id: 'in3', name: 'Cubic Inch', symbol: 'in³', ratioToBase: 0.016387064 },
          { id: 'ft3', name: 'Cubic Foot', symbol: 'ft³', ratioToBase: 28.316846592 },
          { id: 'gal-us', name: 'US Gallon', symbol: 'gal (US)', ratioToBase: 3.785411784 },
          { id: 'gal-uk', name: 'UK Gallon', symbol: 'gal (UK)', ratioToBase: 4.54609 },
          { id: 'floz-us', name: 'US Fluid Ounce', symbol: 'fl oz (US)', ratioToBase: 0.0295735295625 },
        ]
      },
      {
        id: 'area', name: 'Area', baseUnit: 'm2',
        units: [
          { id: 'm2', name: 'Square Meter', symbol: 'm²', ratioToBase: 1 },
          { id: 'km2', name: 'Square Kilometer', symbol: 'km²', ratioToBase: 1e6 },
          { id: 'cm2', name: 'Square Centimeter', symbol: 'cm²', ratioToBase: 1e-4 },
          { id: 'ha', name: 'Hectare', symbol: 'ha', ratioToBase: 10000 },
          { id: 'acre', name: 'Acre', symbol: 'ac', ratioToBase: 4046.8564224 },
          { id: 'sqft', name: 'Square Foot', symbol: 'ft²', ratioToBase: 0.09290304 },
          { id: 'sqmi', name: 'Square Mile', symbol: 'mi²', ratioToBase: 2589988.110336 },
        ]
      },
      {
        id: 'speed', name: 'Speed', baseUnit: 'm/s',
        units: [
          { id: 'mps', name: 'Meter per second', symbol: 'm/s', ratioToBase: 1 },
          { id: 'kmh', name: 'Kilometer per hour', symbol: 'km/h', ratioToBase: 1 / 3.6 },
          { id: 'mph', name: 'Mile per hour', symbol: 'mph', ratioToBase: 0.44704 },
          { id: 'knot', name: 'Knot', symbol: 'kn', ratioToBase: 0.514444444 },
          { id: 'mach', name: 'Mach', symbol: 'M', ratioToBase: 340.3 },
          { id: 'c', name: 'Speed of Light', symbol: 'c', ratioToBase: 299792458 },
        ]
      }
    ]
  },
  {
    name: 'Engineering Calculators',
    categories: [
      {
        id: 'pressure', name: 'Pressure', baseUnit: 'pa',
        units: [
          { id: 'pa', name: 'Pascal', symbol: 'Pa', ratioToBase: 1 },
          { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', ratioToBase: 1000 },
          { id: 'mpa', name: 'Megapascal', symbol: 'MPa', ratioToBase: 1e6 },
          { id: 'bar', name: 'Bar', symbol: 'bar', ratioToBase: 100000 },
          { id: 'psi', name: 'Pound-force per sq inch', symbol: 'psi', ratioToBase: 6894.757293168 },
          { id: 'atm', name: 'Standard atmosphere', symbol: 'atm', ratioToBase: 101325 },
          { id: 'mmhg', name: 'Millimeter of mercury', symbol: 'mmHg', ratioToBase: 133.322387415 },
          { id: 'torr', name: 'Torr', symbol: 'Torr', ratioToBase: 133.322368421 },
        ]
      },
      {
        id: 'energy', name: 'Energy', baseUnit: 'j',
        units: [
          { id: 'j', name: 'Joule', symbol: 'J', ratioToBase: 1 },
          { id: 'kj', name: 'Kilojoule', symbol: 'kJ', ratioToBase: 1000 },
          { id: 'mj', name: 'Megajoule', symbol: 'MJ', ratioToBase: 1e6 },
          { id: 'cal', name: 'Gram calorie', symbol: 'cal', ratioToBase: 4.184 },
          { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', ratioToBase: 4184 },
          { id: 'wh', name: 'Watt hour', symbol: 'Wh', ratioToBase: 3600 },
          { id: 'kwh', name: 'Kilowatt hour', symbol: 'kWh', ratioToBase: 3.6e6 },
          { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', ratioToBase: 1055.05585262 },
          { id: 'ev', name: 'Electronvolt', symbol: 'eV', ratioToBase: 1.602176634e-19 },
        ]
      },
      {
        id: 'power', name: 'Power', baseUnit: 'w',
        units: [
          { id: 'w', name: 'Watt', symbol: 'W', ratioToBase: 1 },
          { id: 'kw', name: 'Kilowatt', symbol: 'kW', ratioToBase: 1000 },
          { id: 'mw', name: 'Megawatt', symbol: 'MW', ratioToBase: 1e6 },
          { id: 'hp', name: 'Horsepower (mechanical)', symbol: 'hp', ratioToBase: 745.69987158227022 },
          { id: 'hp-metric', name: 'Horsepower (metric)', symbol: 'hp(M)', ratioToBase: 735.49875 },
          { id: 'btu-hr', name: 'BTU per hour', symbol: 'BTU/hr', ratioToBase: 0.293071 },
        ]
      },
      {
        id: 'force', name: 'Force', baseUnit: 'n',
        units: [
          { id: 'n', name: 'Newton', symbol: 'N', ratioToBase: 1 },
          { id: 'kn', name: 'Kilonewton', symbol: 'kN', ratioToBase: 1000 },
          { id: 'dyne', name: 'Dyne', symbol: 'dyn', ratioToBase: 1e-5 },
          { id: 'lbf', name: 'Pound-force', symbol: 'lbf', ratioToBase: 4.4482216152605 },
          { id: 'kgf', name: 'Kilogram-force', symbol: 'kgf', ratioToBase: 9.80665 },
        ]
      },
      {
        id: 'time', name: 'Time', baseUnit: 's',
        units: [
          { id: 'ns', name: 'Nanosecond', symbol: 'ns', ratioToBase: 1e-9 },
          { id: 'us', name: 'Microsecond', symbol: 'μs', ratioToBase: 1e-6 },
          { id: 'ms', name: 'Millisecond', symbol: 'ms', ratioToBase: 1e-3 },
          { id: 's', name: 'Second', symbol: 's', ratioToBase: 1 },
          { id: 'min', name: 'Minute', symbol: 'min', ratioToBase: 60 },
          { id: 'h', name: 'Hour', symbol: 'h', ratioToBase: 3600 },
          { id: 'd', name: 'Day', symbol: 'd', ratioToBase: 86400 },
          { id: 'wk', name: 'Week', symbol: 'wk', ratioToBase: 604800 },
          { id: 'mo', name: 'Month (30.44 days)', symbol: 'mo', ratioToBase: 2629800 },
          { id: 'yr', name: 'Year (365.24 days)', symbol: 'yr', ratioToBase: 31556952 },
        ]
      },
      {
        id: 'angle', name: 'Angle', baseUnit: 'deg',
        units: [
          { id: 'deg', name: 'Degree', symbol: '°', ratioToBase: 1 },
          { id: 'rad', name: 'Radian', symbol: 'rad', ratioToBase: 180 / Math.PI },
          { id: 'grad', name: 'Gradian', symbol: 'grad', ratioToBase: 0.9 },
          { id: 'arcmin', name: 'Arcminute', symbol: '\'', ratioToBase: 1 / 60 },
          { id: 'arcsec', name: 'Arcsecond', symbol: '\"', ratioToBase: 1 / 3600 },
        ]
      },
      {
        id: 'data-storage', name: 'Data Storage', baseUnit: 'byte',
        units: [
          { id: 'bit', name: 'Bit', symbol: 'b', ratioToBase: 0.125 },
          { id: 'byte', name: 'Byte', symbol: 'B', ratioToBase: 1 },
          { id: 'kb', name: 'Kilobyte', symbol: 'KB', ratioToBase: 1000 },
          { id: 'mb', name: 'Megabyte', symbol: 'MB', ratioToBase: 1e6 },
          { id: 'gb', name: 'Gigabyte', symbol: 'GB', ratioToBase: 1e9 },
          { id: 'tb', name: 'Terabyte', symbol: 'TB', ratioToBase: 1e12 },
          { id: 'kib', name: 'Kibibyte', symbol: 'KiB', ratioToBase: 1024 },
          { id: 'mib', name: 'Mebibyte', symbol: 'MiB', ratioToBase: Math.pow(1024, 2) },
          { id: 'gib', name: 'Gibibyte', symbol: 'GiB', ratioToBase: Math.pow(1024, 3) },
          { id: 'tib', name: 'Tebibyte', symbol: 'TiB', ratioToBase: Math.pow(1024, 4) },
        ]
      },
      {
        id: 'density', name: 'Density', baseUnit: 'kgm3',
        units: [
          { id: 'kgm3', name: 'Kilogram/cubic meter', symbol: 'kg/m³', ratioToBase: 1 },
          { id: 'gcm3', name: 'Gram/cubic centimeter', symbol: 'g/cm³', ratioToBase: 1000 },
          { id: 'kgl', name: 'Kilogram/liter', symbol: 'kg/L', ratioToBase: 1000 },
          { id: 'gl', name: 'Gram/liter', symbol: 'g/L', ratioToBase: 1 },
          { id: 'lbft3', name: 'Pound/cubic foot', symbol: 'lb/ft³', ratioToBase: 16.018463 },
        ]
      },
      {
        id: 'torque', name: 'Torque', baseUnit: 'nm',
        units: [
          { id: 'nm', name: 'Newton meter', symbol: 'N·m', ratioToBase: 1 },
          { id: 'lbfft', name: 'Pound-force foot', symbol: 'lbf·ft', ratioToBase: 1.3558179483314 },
          { id: 'lbfin', name: 'Pound-force inch', symbol: 'lbf·in', ratioToBase: 0.1129848290276167 },
          { id: 'kgfm', name: 'Kilogram-force meter', symbol: 'kgf·m', ratioToBase: 9.80665 },
        ]
      }
    ]
  },
  {
    name: 'Heat Calculators',
    categories: [
      {
        id: 'heat', name: 'Thermal Energy', baseUnit: 'j',
        units: [
          { id: 'j', name: 'Joule', symbol: 'J', ratioToBase: 1 },
          { id: 'kj', name: 'Kilojoule', symbol: 'kJ', ratioToBase: 1000 },
          { id: 'cal', name: 'Gram calorie', symbol: 'cal', ratioToBase: 4.184 },
          { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', ratioToBase: 4184 },
          { id: 'btu', name: 'BTU (IT)', symbol: 'BTU', ratioToBase: 1055.05585262 },
          { id: 'therm', name: 'Therm (US)', symbol: 'thm', ratioToBase: 105480400 },
        ]
      },
      {
        id: 'specific-heat', name: 'Specific Heat Capacity', baseUnit: 'jkgk',
        units: [
          { id: 'jkgk', name: 'Joule/(kg·K)', symbol: 'J/(kg·K)', ratioToBase: 1 },
          { id: 'kjkgk', name: 'Kilojoule/(kg·K)', symbol: 'kJ/(kg·K)', ratioToBase: 1000 },
          { id: 'btulbf', name: 'BTU/(lb·°F)', symbol: 'BTU/(lb·°F)', ratioToBase: 4186.8 },
          { id: 'kcal-kgc', name: 'Kilocalorie/(kg·°C)', symbol: 'kcal/(kg·°C)', ratioToBase: 4184 },
        ]
      }
    ]
  },
  {
    name: 'Fluids Calculators',
    categories: [
      {
        id: 'flow-vol', name: 'Flow Rate (Volume)', baseUnit: 'm3s',
        units: [
          { id: 'm3s', name: 'Cubic meter/second', symbol: 'm³/s', ratioToBase: 1 },
          { id: 'ls', name: 'Liter/second', symbol: 'L/s', ratioToBase: 0.001 },
          { id: 'lmin', name: 'Liter/minute', symbol: 'L/min', ratioToBase: 1.666666667e-5 },
          { id: 'gpm', name: 'Gallon/minute (US)', symbol: 'gpm', ratioToBase: 6.30901964e-5 },
        ]
      },
      {
        id: 'flow-mass', name: 'Flow Rate (Mass)', baseUnit: 'kgs',
        units: [
          { id: 'kgs', name: 'Kilogram/second', symbol: 'kg/s', ratioToBase: 1 },
          { id: 'kgmin', name: 'Kilogram/minute', symbol: 'kg/min', ratioToBase: 0.01666666667 },
          { id: 'lbs', name: 'Pound/second', symbol: 'lb/s', ratioToBase: 0.45359237 },
          { id: 'lbmin', name: 'Pound/minute', symbol: 'lb/min', ratioToBase: 0.0075598728333 },
        ]
      }
    ]
  },
  {
    name: 'Light Calculators',
    categories: [
      {
        id: 'illuminance', name: 'Illuminance', baseUnit: 'lx',
        units: [
          { id: 'lx', name: 'Lux', symbol: 'lx', ratioToBase: 1 },
          { id: 'fc', name: 'Foot-candle', symbol: 'fc', ratioToBase: 10.7639104167 },
          { id: 'ph', name: 'Phot', symbol: 'ph', ratioToBase: 10000 },
        ]
      },
      {
        id: 'luminance', name: 'Luminance', baseUnit: 'cdm2',
        units: [
          { id: 'cdm2', name: 'Candela/square meter (Nit)', symbol: 'cd/m²', ratioToBase: 1 },
          { id: 'lambert', name: 'Lambert', symbol: 'L', ratioToBase: 3183.09886183 },
          { id: 'footlambert', name: 'Foot-lambert', symbol: 'fL', ratioToBase: 3.4262590996 },
        ]
      }
    ]
  },
  {
    name: 'Electricity Calculators',
    categories: [
      {
        id: 'charge', name: 'Electric Charge', baseUnit: 'c',
        units: [
          { id: 'c', name: 'Coulomb', symbol: 'C', ratioToBase: 1 },
          { id: 'mc', name: 'Millicoulomb', symbol: 'mC', ratioToBase: 0.001 },
          { id: 'ah', name: 'Ampere-hour', symbol: 'Ah', ratioToBase: 3600 },
          { id: 'mah', name: 'Milliampere-hour', symbol: 'mAh', ratioToBase: 3.6 },
        ]
      },
      {
        id: 'current', name: 'Electric Current', baseUnit: 'a',
        units: [
          { id: 'a', name: 'Ampere', symbol: 'A', ratioToBase: 1 },
          { id: 'ma', name: 'Milliampere', symbol: 'mA', ratioToBase: 0.001 },
        ]
      },
      {
        id: 'voltage', name: 'Voltage', baseUnit: 'v',
        units: [
          { id: 'v', name: 'Volt', symbol: 'V', ratioToBase: 1 },
          { id: 'mv', name: 'Millivolt', symbol: 'mV', ratioToBase: 0.001 },
          { id: 'kv', name: 'Kilovolt', symbol: 'kV', ratioToBase: 1000 },
        ]
      },
      {
        id: 'resistance', name: 'Resistance', baseUnit: 'ohm',
        units: [
          { id: 'ohm', name: 'Ohm', symbol: 'Ω', ratioToBase: 1 },
          { id: 'kohm', name: 'Kiloohm', symbol: 'kΩ', ratioToBase: 1000 },
          { id: 'mohm', name: 'Megaohm', symbol: 'MΩ', ratioToBase: 1e6 },
        ]
      }
    ]
  },
  {
    name: 'Magnetism Calculators',
    categories: [
      {
        id: 'mag-flux', name: 'Magnetic Flux', baseUnit: 'wb',
        units: [
          { id: 'wb', name: 'Weber', symbol: 'Wb', ratioToBase: 1 },
          { id: 'mwb', name: 'Milliweber', symbol: 'mWb', ratioToBase: 0.001 },
          { id: 'mx', name: 'Maxwell', symbol: 'Mx', ratioToBase: 1e-8 },
        ]
      },
      {
        id: 'mag-density', name: 'Magnetic Flux Density', baseUnit: 't',
        units: [
          { id: 't', name: 'Tesla', symbol: 'T', ratioToBase: 1 },
          { id: 'mt', name: 'Millitesla', symbol: 'mT', ratioToBase: 0.001 },
          { id: 'g', name: 'Gauss', symbol: 'G', ratioToBase: 1e-4 },
        ]
      }
    ]
  },
  {
    name: 'Radiology Calculators',
    categories: [
      {
        id: 'rad-activity', name: 'Radiation - Activity', baseUnit: 'bq',
        units: [
          { id: 'bq', name: 'Becquerel', symbol: 'Bq', ratioToBase: 1 },
          { id: 'ci', name: 'Curie', symbol: 'Ci', ratioToBase: 3.7e10 },
          { id: 'mci', name: 'Millicurie', symbol: 'mCi', ratioToBase: 3.7e7 },
        ]
      },
      {
        id: 'rad-dose', name: 'Radiation - Absorbed Dose', baseUnit: 'gy',
        units: [
          { id: 'gy', name: 'Gray', symbol: 'Gy', ratioToBase: 1 },
          { id: 'rad', name: 'Rad', symbol: 'rad', ratioToBase: 0.01 },
          { id: 'mrad', name: 'Millirad', symbol: 'mrad', ratioToBase: 1e-5 },
        ]
      },
      {
        id: 'rad-equiv', name: 'Radiation - Equivalent Dose', baseUnit: 'sv',
        units: [
          { id: 'sv', name: 'Sievert', symbol: 'Sv', ratioToBase: 1 },
          { id: 'msv', name: 'Millisievert', symbol: 'mSv', ratioToBase: 0.001 },
          { id: 'rem', name: 'Rem', symbol: 'rem', ratioToBase: 0.01 },
        ]
      }
    ]
  },
  {
    name: 'Common Unit Systems',
    categories: [
      {
        id: 'prefixes', name: 'Metric Prefixes', baseUnit: 'one',
        units: [
          { id: 'yotta', name: 'Yotta', symbol: 'Y', ratioToBase: 1e24 },
          { id: 'zetta', name: 'Zetta', symbol: 'Z', ratioToBase: 1e21 },
          { id: 'exa', name: 'Exa', symbol: 'E', ratioToBase: 1e18 },
          { id: 'peta', name: 'Peta', symbol: 'P', ratioToBase: 1e15 },
          { id: 'tera', name: 'Tera', symbol: 'T', ratioToBase: 1e12 },
          { id: 'giga', name: 'Giga', symbol: 'G', ratioToBase: 1e9 },
          { id: 'mega', name: 'Mega', symbol: 'M', ratioToBase: 1e6 },
          { id: 'kilo', name: 'Kilo', symbol: 'k', ratioToBase: 1000 },
          { id: 'hecto', name: 'Hecto', symbol: 'h', ratioToBase: 100 },
          { id: 'deca', name: 'Deca', symbol: 'da', ratioToBase: 10 },
          { id: 'one', name: 'Base Unit', symbol: '1', ratioToBase: 1 },
          { id: 'deci', name: 'Deci', symbol: 'd', ratioToBase: 0.1 },
          { id: 'centi', name: 'Centi', symbol: 'c', ratioToBase: 0.01 },
          { id: 'milli', name: 'Milli', symbol: 'm', ratioToBase: 0.001 },
          { id: 'micro', name: 'Micro', symbol: 'μ', ratioToBase: 1e-6 },
          { id: 'nano', name: 'Nano', symbol: 'n', ratioToBase: 1e-9 },
          { id: 'pico', name: 'Pico', symbol: 'p', ratioToBase: 1e-12 },
          { id: 'femto', name: 'Femto', symbol: 'f', ratioToBase: 1e-15 },
          { id: 'atto', name: 'Atto', symbol: 'a', ratioToBase: 1e-18 },
          { id: 'zepto', name: 'Zepto', symbol: 'z', ratioToBase: 1e-21 },
          { id: 'yocto', name: 'Yocto', symbol: 'y', ratioToBase: 1e-24 },
        ]
      }
    ]
  },
  {
    name: 'Mathematics & Science',
    categories: [
      {
        id: 'cycles', name: 'Cycles', baseUnit: 'hz',
        units: [
          { id: 'hz', name: 'Hertz', symbol: 'Hz', ratioToBase: 1 },
          { id: 'khz', name: 'Kilohertz', symbol: 'kHz', ratioToBase: 1000 },
          { id: 'mhz', name: 'Megahertz', symbol: 'MHz', ratioToBase: 1e6 },
          { id: 'ghz', name: 'Gigahertz', symbol: 'GHz', ratioToBase: 1e9 },
          { id: 'rpm', name: 'Revolutions per minute', symbol: 'rpm', ratioToBase: 1/60 },
        ]
      },
      {
        id: 'cooking', name: 'Cooking', baseUnit: 'ml',
        units: [
          { id: 'ml', name: 'Milliliter', symbol: 'mL', ratioToBase: 1 },
          { id: 'tsp', name: 'Teaspoon (US)', symbol: 'tsp', ratioToBase: 4.92892 },
          { id: 'tbsp', name: 'Tablespoon (US)', symbol: 'tbsp', ratioToBase: 14.7868 },
          { id: 'cup-us', name: 'Cup (US)', symbol: 'cup', ratioToBase: 236.588 },
          { id: 'pt-us', name: 'Pint (US fluid)', symbol: 'pt', ratioToBase: 473.176 },
          { id: 'qt-us', name: 'Quart (US fluid)', symbol: 'qt', ratioToBase: 946.353 },
          { id: 'gal-us', name: 'Gallon (US fluid)', symbol: 'gal', ratioToBase: 3785.41 },
        ]
      }
    ]
  }
];

export const getAllCategories = () => unitGroups.flatMap(g => g.categories);
