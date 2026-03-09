const modes = [
  { id: 'humanize', label: 'Humanize', icon: '👤' },
  { id: 'professional', label: 'Professional', icon: '💼' },
  { id: 'academic', label: 'Academic', icon: '🎓' },
  { id: 'casual', label: 'Casual', icon: '☕' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'shorten', label: 'Shorten', icon: '✂️' },
];

export default function ModeSelector({ activeMode, setMode }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`px-5 py-2.5 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 font-medium ${
            activeMode === m.id 
            ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' 
            : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:bg-blue-50'
          }`}
        >
          <span>{m.icon}</span> {m.label}
        </button>
      ))}
    </div>
  );
}