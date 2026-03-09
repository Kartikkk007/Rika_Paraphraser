export default function WordCounter({ text }) {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  return (
    <div className="text-xs font-semibold text-gray-400 mt-2 flex justify-between px-1">
      <span>{words} WORDS</span>
      <span>{text.length} CHARS</span>
    </div>
  );
}