const modes = [
  { id: 'humanize',     label: 'Humanize',     icon: '👤' },
  { id: 'professional', label: 'Professional', icon: '💼' },
  { id: 'academic',     label: 'Academic',     icon: '🎓' },
  { id: 'casual',       label: 'Casual',       icon: '☕' },
  { id: 'creative',     label: 'Creative',     icon: '🎨' },
  { id: 'shorten',      label: 'Shorten',      icon: '✂️' },
];

export default function ModeSelector({ activeMode, setMode }) {
  return (
    <div className="flex flex-wrap gap-2.5 mb-7">
      {modes.map((m, i) => {
        const isActive = activeMode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`
              animate-fade-in relative px-4 py-2 rounded-xl text-sm font-semibold
              flex items-center gap-2 transition-all duration-250 overflow-hidden
              ${isActive
                ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                : 'bg-white/4 text-slate-400 border border-white/[0.07] hover:bg-white/8 hover:text-white hover:border-white/20 hover:scale-105'
              }
            `}
          >
            {/* Active glow */}
            {isActive && (
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            )}
            <span className="text-base leading-none">{m.icon}</span>
            <span>{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}