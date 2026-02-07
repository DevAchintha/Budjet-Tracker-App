import React, { useState, useEffect, useMemo } from 'react';
import BalanceBar from './components/BalanceBar';
import AddExpenseForm from './components/AddExpenseForm';
import StatsView from './components/StatsView';
import ThemesView from './components/ThemesView';
import NotesView from './components/NotesView';
import { Expense, Category, ThemeColor, Note } from './types';
import { CATEGORY_ICONS, CATEGORY_COLORS, THEMES, WEEKLY_LIMIT_LKR } from './constants';

type ViewType = 'tracker' | 'stats' | 'notes' | 'themes';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('uni_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('uni_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('uni_theme');
    return (saved as ThemeColor) || 'blue';
  });
  const [weeklyLimit, setWeeklyLimit] = useState<number>(() => {
    const saved = localStorage.getItem('uni_weekly_limit');
    return saved ? parseInt(saved, 10) : WEEKLY_LIMIT_LKR;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('tracker');

  useEffect(() => {
    localStorage.setItem('uni_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('uni_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('uni_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('uni_weekly_limit', weeklyLimit.toString());
  }, [weeklyLimit]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const currentTheme = THEMES[theme];

  const addExpense = (newExpense: Omit<Expense, 'id' | 'timestamp'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const addNote = (title: string, content: string) => {
    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      timestamp: Date.now()
    };
    setNotes([note, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const resetBalance = () => {
    if(confirm('Are you sure you want to reset your balance? This will permanently clear your spending history.')) {
      setExpenses([]);
    }
  };

  const updateWeeklyLimit = (newLimit: number) => {
    if (newLimit > 0) {
      setWeeklyLimit(newLimit);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-LK', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(timestamp);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'stats':
        return <StatsView expenses={expenses} theme={theme} />;
      case 'notes':
        return <NotesView notes={notes} onAdd={addNote} onDelete={deleteNote} theme={theme} />;
      case 'themes':
        return <ThemesView currentTheme={theme} onSelect={setTheme} />;
      case 'tracker':
      default:
        return (
          <>
            <BalanceBar 
              totalSpent={totalSpent} 
              onResetBalance={resetBalance} 
              theme={theme} 
              weeklyLimit={weeklyLimit}
              onUpdateLimit={updateWeeklyLimit}
            />
            
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">History</h2>
              </div>
              
              <div className="space-y-3">
                {expenses.length === 0 ? (
                  <div className="text-center py-12 px-6 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="mb-3 text-3xl">☕</div>
                    <p className="text-slate-400 text-sm font-medium">Your history is clear.<br/>Add your first expense!</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div 
                      key={expense.id} 
                      className={`bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group transition-all hover:border-slate-300`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${CATEGORY_COLORS[expense.category]}`}>
                        {CATEGORY_ICONS[expense.category]}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800">{expense.category}</h4>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wide">
                          {formatDate(expense.timestamp)}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-sm font-bold text-slate-900">
                          -LKR {expense.amount.toLocaleString()}
                        </p>
                        <button 
                          onClick={() => deleteExpense(expense.id)}
                          className="opacity-0 group-hover:opacity-100 text-[10px] text-red-400 hover:text-red-600 transition-all font-bold"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-32">
      <header className="p-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {activeView === 'tracker' ? 'UniBudget' : 
             activeView === 'stats' ? 'Spending Stats' : 
             activeView === 'notes' ? 'My Notepad' : 'App Themes'}
          </h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            {activeView === 'tracker' ? 'Balance Tracker' : 
             activeView === 'stats' ? 'Analytics' : 
             activeView === 'notes' ? 'Quick Notes' : 'Customization'}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold ${currentTheme.bg} ${currentTheme.text} border-current/20`}>
          UB
        </div>
      </header>

      <main className="p-6 space-y-6">
        {renderContent()}
      </main>

      {activeView === 'tracker' && (
        <div className="fixed bottom-24 left-0 right-0 p-6 pointer-events-none z-30">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={totalSpent >= weeklyLimit}
            className={`pointer-events-auto w-full max-w-md mx-auto font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
              totalSpent >= weeklyLimit 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : `${currentTheme.primary} hover:opacity-95 text-white ${currentTheme.shadow}`
            }`}
          >
            {totalSpent >= weeklyLimit ? (
               <span>Limit Reached</span>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                Add Spending
              </>
            )}
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-around items-center z-50 shadow-2xl">
        <button 
          onClick={() => setActiveView('tracker')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'tracker' ? currentTheme.text : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Tracker</span>
        </button>
        
        <button 
          onClick={() => setActiveView('stats')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'stats' ? currentTheme.text : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Stats</span>
        </button>

        <button 
          onClick={() => setActiveView('notes')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'notes' ? currentTheme.text : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Notepad</span>
        </button>

        <button 
          onClick={() => setActiveView('themes')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'themes' ? currentTheme.text : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Themes</span>
        </button>
      </nav>

      {isModalOpen && (
        <AddExpenseForm 
          onAdd={addExpense} 
          onClose={() => setIsModalOpen(false)} 
          theme={theme}
        />
      )}
    </div>
  );
};

export default App;