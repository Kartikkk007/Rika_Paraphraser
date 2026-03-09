import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import ModeSelector from './components/ModeSelector';
import Editor from './components/Editor';
import Navbar from './components/Navbar';

function App() {
  const [inputText, setInputText] = useState("");
  const [outText, setOutText] = useState("");
  const [activeMode, setActiveMode] = useState("humanize");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText) return;
    setLoading(true);
    try {
      const { data } = await axios.post('/api/paraphrase', { 
     text: inputText,
     mode: activeMode
      });
      setOutText(data.output);
    } catch (err) {
      alert("Backend error. Is your server running?");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!outText) return;

    // Split the text at the separator '---' provided by your updated prompt
    // This ensures only the paraphrased text is copied, not the improvements list
    const textToCopy = outText.split('---')[0].trim();
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-hidden relative">

      {/* Background grid texture */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[48px_48px]" />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed -top-30 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-blue-600/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 -right-25 w-100 h-100 bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none fixed bottom-1/3 -left-20 w-75 h-75 bg-blue-800/10 rounded-full blur-[100px]" />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">

        {/* Header */}
        <header className="flex flex-col items-center mb-10 animate-fade-in-down">
          <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
              AI Powered Rewriting
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight text-center">
            Smart{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-blue-400 bg-size-[200%] animate-gradient">
                Paraphraser
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />
            </span>
          </h1>

          <p className="text-slate-500 mt-4 text-sm tracking-wide text-center max-w-md">
            Rewrite with intelligence — zero plagiarism, full clarity.
          </p>
        </header>

        {/* Mode Selector */}
        <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          <ModeSelector activeMode={activeMode} setMode={setActiveMode} />
        </div>

        {/* Editors Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start animate-fade-in"
          style={{ animationDelay: '250ms' }}
        >
          <Editor
            label="Original Text"
            value={inputText}
            onChange={setInputText}
            placeholder="Type or paste your content here..."
            onClear={() => setInputText("")}
          />
          <Editor
            label="Paraphrased Result"
            value={outText}
            isReadOnly={true}
            loading={loading}
            onCopy={copyToClipboard}
            copied={copied}
            placeholder="AI-optimized version will appear here..."
          />
        </div>

        {/* CTA Button */}
        <div
          className="mt-10 flex justify-center animate-fade-in"
          style={{ animationDelay: '350ms' }}
        >
          <button
            onClick={handleParaphrase}
            disabled={loading || !inputText}
            className={`
              relative flex items-center gap-3 px-12 py-4 rounded-full font-bold text-base
              transition-all duration-300 overflow-hidden group
              ${loading || !inputText
                ? 'bg-white/4 text-slate-600 border border-white/6 cursor-not-allowed'
                : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 border border-blue-500/30'
              }
            `}
          >
            {!loading && inputText && (
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            )}

            {!loading && inputText && (
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]" />
            )}

            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-slate-500">Paraphrasing...</span>
              </>
            ) : (
              <>
                <span>Paraphrase</span>
                <Sparkles
                  size={16}
                  className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
                />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;