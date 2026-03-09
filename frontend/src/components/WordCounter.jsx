export default function WordCounter({ text }) {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-slate-700" />
        <span className="text-xs font-semibold text-slate-600 tracking-widest uppercase">
          {words} words
        </span>
      </div>
      <div className="w-px h-3 bg-slate-800" />
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-slate-700" />
        <span className="text-xs font-semibold text-slate-600 tracking-widest uppercase">
          {chars} chars
        </span>
      </div>
    </div>
  );
}