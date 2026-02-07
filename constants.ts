
import { Category, Theme, ThemeColor } from './types';

export const WEEKLY_LIMIT_LKR = 3500;

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.BREAKFAST]: '🍳',
  [Category.LUNCH]: '🍱',
  [Category.DINNER]: '🍲',
  [Category.LOAN]: '💸',
  [Category.OTHER]: '🛍️'
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.BREAKFAST]: 'bg-amber-100 text-amber-600',
  [Category.LUNCH]: 'bg-emerald-100 text-emerald-600',
  [Category.DINNER]: 'bg-indigo-100 text-indigo-600',
  [Category.LOAN]: 'bg-violet-100 text-violet-600',
  [Category.OTHER]: 'bg-slate-100 text-slate-600'
};

export const THEMES: Record<ThemeColor, Theme> = {
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    primary: 'bg-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    shadow: 'shadow-blue-200'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Forest',
    primary: 'bg-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    shadow: 'shadow-emerald-200'
  },
  rose: {
    id: 'rose',
    name: 'Sunset Rose',
    primary: 'bg-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-500',
    shadow: 'shadow-rose-200'
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    primary: 'bg-violet-600',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    shadow: 'shadow-violet-200'
  },
  amber: {
    id: 'amber',
    name: 'Golden Amber',
    primary: 'bg-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-500',
    shadow: 'shadow-amber-200'
  }
};
