
import React, { useState, useRef, useEffect } from 'react';
import { THEMES } from '../constants';
import { ThemeColor } from '../types';

interface BalanceBarProps {
  totalSpent: number;
  onResetBalance: () => void;
  theme: ThemeColor;
  weeklyLimit: number;
  onUpdateLimit: (limit: number) => void;
}

const BalanceBar: React.FC<BalanceBarProps> = ({ totalSpent, onResetBalance, theme, weeklyLimit, onUpdateLimit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLimit, setTempLimit] = useState(weeklyLimit.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  
  const percentage = Math.min((totalSpent / weeklyLimit) * 100, 100);
  const remaining = Math.max(weeklyLimit - totalSpent, 0);
  const isOverBudget = totalSpent >= weeklyLimit;
  const currentTheme = THEMES[theme];

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const parsed = parseInt(tempLimit, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateLimit(parsed);
      setIsEditing(false);
    } else {
      setTempLimit(weeklyLimit.toString());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTempLimit(weeklyLimit.toString());
      setIsEditing(false);
    }
  };

  return (
    <div className={`${currentTheme.bg} p-6 rounded-3xl shadow-sm border-2 border-current/10 transition-colors duration-500`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 opacity-70">Remaining Balance</h2>
          <p className={`text-3xl font-black ${isOverBudget ? 'text-red-600' : 'text-slate-900'}`}>
            LKR {remaining.toLocaleString()}
          </p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onResetBalance();
          }}
          className={`px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm bg-white border border-slate-100 hover:border-slate-300`}
        >
          <svg className={`w-4 h-4 text-slate-400 transition-transform group-hover:rotate-180 duration-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-800">Reset</span>
        </button>
      </div>
      
      <div className="w-full bg-white/50 h-4 rounded-full overflow-hidden border border-current/5">
        <div 
          className={`h-full transition-all duration-700 ease-out rounded-full ${isOverBudget ? 'bg-red-500' : currentTheme.primary}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-3 items-center min-h-[32px]">
        {isEditing ? (
          <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Limit:</span>
            <input
              ref={inputRef}
              type="number"
              value={tempLimit}
              onChange={(e) => setTempLimit(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={`w-24 px-2 py-0.5 text-[10px] font-bold bg-white border border-slate-200 rounded focus:ring-1 focus:outline-none ${currentTheme.text}`}
            />
            <button onClick={handleSave} className="text-emerald-500 hover:text-emerald-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 group cursor-pointer" onClick={() => setIsEditing(true)}>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Limit: LKR {weeklyLimit.toLocaleString()}</p>
            <svg className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        )}
        <p className={`text-[10px] font-black uppercase tracking-widest ${isOverBudget ? 'text-red-500' : currentTheme.text}`}>
          {percentage.toFixed(0)}% Utilized
        </p>
      </div>
      
      {isOverBudget && (
        <div className="mt-4 p-3 bg-red-50/80 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
          <p className="text-[10px] text-red-600 font-bold flex items-center gap-2 uppercase tracking-wide">
            <span>🚨</span> Budget exceeded! Please use the reset option to clear history.
          </p>
        </div>
      )}
    </div>
  );
};

export default BalanceBar;
