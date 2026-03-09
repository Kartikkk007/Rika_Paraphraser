import WordCounter from './WordCounter';
import { RefreshCw, Copy, Check, FileText } from 'lucide-react';

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
    <div className={`
      group relative rounded-2xl overflow-hidden flex flex-col
      border transition-all duration-300
      bg-white/3 backdrop-blur-sm
      ${isReadOnly
        ? 'border-white/[0.07] hover:border-indigo-500/40'
        : 'border-white/[0.07] hover:border-blue-500/40 focus-within:border-blue-500/60 focus-within:shadow-[0_0_0_1px_rgba(59,130,246,0.15)]'
      }
    `}>

      {/* Subtle top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r 
        ${isReadOnly 
          ? 'from-transparent via-indigo-500/40 to-transparent' 
          : 'from-transparent via-blue-500/40 to-transparent'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
      />

      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/6 bg-white/2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText size={13} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {label}
          </span>
        </div>

        {/* Copy button for output */}
        {isReadOnly && value && !loading && (
          <button
            onClick={onCopy}
            className={`
              text-xs flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg
              transition-all duration-200
              ${copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-blue-400 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 hover:scale-105 active:scale-95'
              }
            `}
          >
            {copied
              ? <><Check size={12} /> Copied!</>
              : <><Copy size={12} /> Copy</>
            }
          </button>
        )}

        {/* Clear button for input */}
        {!isReadOnly && value && (
          <button
            onClick={onClear}
            title="Clear text"
            className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 hover:rotate-180"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>

      {/* Text Area */}
      <div className="relative h-80">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            {/* Animated loader */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <div className="absolute inset-1 rounded-full border border-indigo-400/30 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
            </div>
            <p className="text-sm text-slate-500 animate-pulse tracking-wide">Refining your ideas...</p>
          </div>
        ) : (
          <textarea
            readOnly={isReadOnly}
            className={`
              w-full h-full px-5 py-5 focus:outline-none resize-none text-sm leading-relaxed
              placeholder:text-slate-700 text-slate-200 bg-transparent
              ${isReadOnly ? 'cursor-default' : 'cursor-text'}
              ${value && isReadOnly ? 'animate-fade-in' : ''}
            `}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/5 bg-white/1 flex items-center justify-between">
        <WordCounter text={value} />
        {isReadOnly && !value && !loading && (
          <span className="text-xs text-slate-700 italic">Waiting for input...</span>
        )}
      </div>
    </div>
  );
}