import { Sparkles, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-white/6 bg-[#0a0a0f]/80 backdrop-blur-xl py-4 px-6 mb-8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative bg-linear-to-br from-blue-500 to-indigo-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={18} />
            </div>
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Rika<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">AI</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-1 text-sm font-medium">
            {['Paraphraser', 'Medical Bot', 'History'].map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="h-5 w-px bg-white/10 hidden md:block" />

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/6 transition-all duration-200"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}