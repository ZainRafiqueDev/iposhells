export interface RoiInput {
  fte: number;
  hoursPerWeek: number;
  annualCostPerFte: number;
  coveragePct: number;
}

export interface RoiResult {
  annualHoursSaved: number;
  fteEquivalent: number;
  annualSavings: number;
}

const FULL_TIME_HOURS_PER_WEEK = 40;
const WEEKS_PER_YEAR = 52;

const clean = (n: number, max = Infinity) =>
  Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0;


export function calculateRoi(input: RoiInput): RoiResult {
  const fte = clean(input.fte);
  const hours = clean(input.hoursPerWeek, 168);
  const cost = clean(input.annualCostPerFte);
  const coverage = clean(input.coveragePct, 100) / 100;

  const annualHoursSaved = fte * hours * coverage * WEEKS_PER_YEAR;
  const fteEquivalent = annualHoursSaved / (FULL_TIME_HOURS_PER_WEEK * WEEKS_PER_YEAR);
  const annualSavings = fteEquivalent * cost;

  return { annualHoursSaved, fteEquivalent, annualSavings };
}
