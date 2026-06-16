export interface Unit {
  id: string;
  name: string;
  symbol: string;
  ratioToBase?: number;
  toBase?: (val: number) => number;
  fromBase?: (val: number) => number;
}

export interface UnitCategory {
  id: string;
  name: string;
  baseUnit: string;
  units: Unit[];
}

export interface UnitGroup {
  name: string;
  categories: UnitCategory[];
}
