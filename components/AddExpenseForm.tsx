
import React, { useState } from 'react';
import { Category, Expense, ThemeColor } from '../types';
import { CATEGORY_ICONS, THEMES } from '../constants';

interface AddExpenseFormProps {
  onAdd: (expense: Omit<Expense, 'id' | 'timestamp'>) => void;
  onClose: () => void;
  theme: ThemeColor;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAdd, onClose, theme }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const currentTheme = THEMES[theme];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    onAdd({
      amount: parseFloat(amount),
      category
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Add Spending</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (LKR)</label>
            <input
              autoFocus
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-opacity-50 outline-none transition-all text-lg font-medium ${
                theme === 'blue' ? 'focus:ring-blue-500' :
                theme === 'emerald' ? 'focus:ring-emerald-500' :
                theme === 'rose' ? 'focus:ring-rose-500' :
                theme === 'violet' ? 'focus:ring-violet-500' :
                'focus:ring-amber-500'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.values(Category) as Category[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                    category === cat 
                      ? `${currentTheme.primary} border-transparent text-white shadow-md` 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xl">{CATEGORY_ICONS[cat]}</span>
                  <span className="text-[11px] font-bold leading-tight text-center">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full ${currentTheme.primary} hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg ${currentTheme.shadow} active:scale-[0.98]`}
          >
            Save Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
