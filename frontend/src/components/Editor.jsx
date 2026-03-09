import WordCounter from './WordCounter';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function Editor({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  isReadOnly = false, 
  loading = false,
  onClear,
  onCopy,
  copied 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
      
      {/* Header of the Editor Box */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        
        {/* Actions for Output Box (Copy) */}
        {isReadOnly && value && !loading && (
          <button 
            onClick={onCopy}
            className="text-xs flex items-center gap-1.5 text-blue-600 font-bold hover:bg-blue-50 px-2 py-1 rounded transition-colors"
          >
            {copied ? <><Check size={14}/> COPIED</> : <><Copy size={14}/> COPY</>}
          </button>
        )}

        {/* Actions for Input Box (Clear) */}
        {!isReadOnly && value && (
          <button 
            onClick={onClear}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Clear text"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </div>

      {/* Main Text Area */}
      <div className="relative h-80">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 bg-white">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium animate-pulse">Refining your ideas...</p>
          </div>
        ) : (
          <textarea
            readOnly={isReadOnly}
            className={`w-full h-full p-6 focus:outline-none text-slate-700 leading-relaxed resize-none ${
              isReadOnly ? 'bg-slate-50/10' : 'bg-white'
            }`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        )}
      </div>

      {/* Footer with Word Counter */}
      <div className="p-4 bg-slate-50/30 border-t border-slate-100">
        <WordCounter text={value} />
      </div>
    </div>
  );
}