
import React from 'react';
import { Expense, Category } from '../types';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';

interface CategoryPieChartProps {
  expenses: Expense[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ expenses }) => {
  const totals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<Category, number>);

  // Fix: Explicitly cast Object.values to number[] to resolve 'unknown' type errors in reduce and comparisons
  const grandTotal = (Object.values(totals) as number[]).reduce((sum, val) => sum + val, 0);

  const categories = Object.values(Category) as Category[];
  
  // Calculate segments for the donut chart
  let cumulativePercent = 0;
  const segments = categories.map((cat) => {
    const amount = totals[cat] || 0;
    // Fix: grandTotal is now confirmed as a number, resolving 'unknown' comparison error
    const percent = grandTotal > 0 ? (amount / grandTotal) : 0;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    return { category: cat, percent, startPercent };
  });

  // SVG Helper to calculate coordinates
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  if (grandTotal === 0) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Spending Breakdown</h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* SVG Donut Chart */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
            {segments.map((segment, i) => {
              if (segment.percent === 0) return null;
              
              // If it's 100%, we need a full circle
              if (segment.percent === 1) {
                return (
                  <circle
                    key={i}
                    cx="0"
                    cy="0"
                    r="0.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    className={CATEGORY_COLORS[segment.category].split(' ')[1].replace('text-', 'text-opacity-100 text-')}
                  />
                );
              }

              const [startX, startY] = getCoordinatesForPercent(segment.startPercent);
              const [endX, endY] = getCoordinatesForPercent(segment.startPercent + segment.percent);
              const largeArcFlag = segment.percent > 0.5 ? 1 : 0;
              const pathData = [
                `M ${startX * 0.8} ${startY * 0.8}`,
                `A 0.8 0.8 0 0 1 ${endX * 0.8} ${endY * 0.8}`
              ].join(' ');

              // Get color class and extract the actual hex or color name
              const colorClass = CATEGORY_COLORS[segment.category].split(' ')[1];

              return (
                <path
                  key={i}
                  d={pathData}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.4"
                  className={colorClass}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Total</span>
            <span className="text-xs font-black text-slate-900">100%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-3">
          {categories.map((cat) => {
            const amount = totals[cat] || 0;
            const percent = grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;
            if (amount === 0) return null;

            return (
              <div key={cat} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${CATEGORY_COLORS[cat]}`}>
                    {CATEGORY_ICONS[cat]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{cat}</p>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">LKR {amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
