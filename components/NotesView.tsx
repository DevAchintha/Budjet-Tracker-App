
import React, { useState } from 'react';
import { Note, ThemeColor } from '../types';
import { THEMES } from '../constants';

interface NotesViewProps {
  notes: Note[];
  onAdd: (title: string, content: string) => void;
  onDelete: (id: string) => void;
  theme: ThemeColor;
}

const NotesView: React.FC<NotesViewProps> = ({ notes, onAdd, onDelete, theme }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const currentTheme = THEMES[theme];

  const handleSave = () => {
    if (!newTitle.trim() && !newContent.trim()) return;
    onAdd(newTitle.trim() || 'Untitled Note', newContent.trim());
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Add Note Section */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className={`w-full p-6 bg-white rounded-3xl border-2 border-dashed border-slate-200 hover:border-slate-300 transition-all flex flex-col items-center justify-center gap-2 group`}
        >
          <div className={`w-12 h-12 rounded-full ${currentTheme.bg} ${currentTheme.text} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
            ✍️
          </div>
          <p className="text-slate-500 font-bold text-sm">Create a new note...</p>
        </button>
      ) : (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">New Note</h3>
            <button 
              onClick={() => setIsAdding(false)}
              className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <input
            autoFocus
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full mb-3 px-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-bold text-slate-800"
          />
          <textarea
            placeholder="Start typing..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 resize-none text-sm mb-4"
          />
          <button
            onClick={handleSave}
            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg ${currentTheme.primary} ${currentTheme.shadow} active:scale-[0.98] transition-all`}
          >
            Save Note
          </button>
        </div>
      )}

      {/* Notes List */}
      <div className="grid grid-cols-1 gap-4">
        {notes.length === 0 ? (
          <div className="text-center py-16 opacity-50">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-slate-400 font-medium">No notes yet.<br/>Keep track of your shopping lists or ideas here.</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group transition-all hover:border-slate-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-slate-900 leading-tight">
                  {note.title}
                </h4>
                <button
                  onClick={() => onDelete(note.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-slate-600 text-sm whitespace-pre-wrap mb-4 font-medium leading-relaxed">
                {note.content}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {formatDate(note.timestamp)}
                </span>
                <div className={`w-2 h-2 rounded-full ${currentTheme.primary} opacity-30`} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesView;
