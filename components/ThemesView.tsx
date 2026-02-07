
import React from 'react';
import { THEMES } from '../constants';
import { ThemeColor } from '../types';

interface ThemesViewProps {
  currentTheme: ThemeColor;
  onSelect: (theme: ThemeColor) => void;
}

const ThemesView: React.FC<ThemesViewProps> = ({ currentTheme, onSelect }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Personalize</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Choose a color palette that matches your style. Your preference will be saved automatically.
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {(Object.keys(THEMES) as ThemeColor[]).map((themeKey) => {
            const theme = THEMES[themeKey];
            const isActive = currentTheme === themeKey;
            
            return (
              <button
                key={themeKey}
                onClick={() => onSelect(themeKey)}
                className={`group w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 ${
                  isActive 
                    ? `border-slate-800 bg-slate-50 shadow-md` 
                    : 'border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className={`relative w-12 h-12 rounded-2xl ${theme.primary} flex items-center justify-center shadow-inner overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isActive && (
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                <div className="text-left flex-1">
                  <span className={`block text-sm font-black ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                    {theme.name}
                  </span>
                  <div className="flex gap-1 mt-1">
                    <div className={`h-1.5 w-8 rounded-full ${theme.primary} opacity-100`} />
                    <div className={`h-1.5 w-4 rounded-full ${theme.primary} opacity-60`} />
                    <div className={`h-1.5 w-2 rounded-full ${theme.primary} opacity-30`} />
                  </div>
                </div>

                {!isActive && (
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-slate-400 group-hover:border-slate-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
            ✨
          </div>
          <div>
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Pro Tip</p>
            <p className="text-sm font-medium text-white/90">Switching themes can help keep your budget tracking feeling fresh and engaging!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesView;
