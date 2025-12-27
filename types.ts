
export enum StrategyLevel {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  INTENSIVE = 'INTENSIVE'
}

export interface FoodAdditive {
  name: string;
  function: string;
  products: string;
  impact: 'High' | 'Likely High';
}

export interface DietaryStrategy {
  title: string;
  description: string;
  rationale: string;
  tips: string[];
}
