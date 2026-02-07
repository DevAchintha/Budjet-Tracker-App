
export enum Category {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  LOAN = 'Loan to other',
  OTHER = 'Other'
}

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  timestamp: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export interface WeeklyData {
  totalSpent: number;
  limit: number;
  expenses: Expense[];
}

export type ThemeColor = 'blue' | 'emerald' | 'rose' | 'violet' | 'amber';

export interface Theme {
  id: ThemeColor;
  name: string;
  primary: string;
  bg: string;
  text: string;
  shadow: string;
}
