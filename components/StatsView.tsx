
import React from 'react';
import { Expense, ThemeColor } from '../types';
import { THEMES } from '../constants';

interface StatsViewProps {
  expenses: Expense[];
  theme: ThemeColor;
}

const StatsView: React.FC<StatsViewProps> = ({ expenses, theme }) => {
  const currentTheme = THEMES[theme];

  // --- Daily Spending Logic ---
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const dailyData = last7Days.map(date => {
    const dayStart = date.getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const total = expenses
      .filter(e => e.timestamp >= dayStart && e.timestamp < dayEnd)
      .reduce((sum, e) => sum + e.amount, 0);
    
    return {
      label: date.toLocaleDateString('en-LK', { weekday: 'short' }),
      amount: total,
      isToday: date.toDateString() === new Date().toDateString()
    };
  });

  const maxDaily = Math.max(...dailyData.map(d => d.amount), 500);
  const totalThisWeek = dailyData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Daily Spending Bar Chart */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <header className="mb-8">
          <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Daily Spending</h3>
          <p className="text-2xl font-bold text-slate-900">Weekly Activity</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xs text-slate-500">Total:</span>
            <span className={`text-sm font-bold ${currentTheme.text}`}>LKR {totalThisWeek.toLocaleString()}</span>
          </div>
        </header>
        
        <div className="relative h-56 flex items-end justify-between gap-3 px-1">
          {dailyData.map((day, idx) => {
            const height = (day.amount / maxDaily) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Amount Label on top of bar */}
                <div className={`mb-2 text-[9px] font-bold transition-all duration-300 ${day.amount > 0 ? 'opacity-100' : 'opacity-0'} ${day.isToday ? currentTheme.text : 'text-slate-400'}`}>
                  {day.amount > 0 ? day.amount.toLocaleString() : ''}
                </div>
                
                {/* The Bar */}
                <div 
                  className={`w-full rounded-t-xl transition-all duration-1000 ease-out min-h-[4px] ${
                    day.isToday 
                      ? `${currentTheme.primary} shadow-lg ${currentTheme.shadow}` 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
                
                {/* Day Label */}
                <span className={`text-[10px] mt-4 font-black uppercase tracking-tighter ${day.isToday ? currentTheme.text : 'text-slate-400'}`}>
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Summary Insights */}
      <div className={`${currentTheme.primary} p-6 rounded-3xl text-white shadow-xl ${currentTheme.shadow}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/70 text-[10px] font-bold uppercase mb-1">Highest Spend</p>
            <p className="text-xl font-bold">LKR {maxDaily.toLocaleString()}</p>
          </div>
          <div className="bg-black/10 p-2 rounded-xl">
             <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
             </svg>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-[11px] text-white/80 italic">
            Visualizing your daily cash flow helps you identify which days of the week you tend to spend the most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
