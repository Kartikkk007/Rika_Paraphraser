import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import ModeSelector from './components/ModeSelector';
import Editor from './components/Editor';

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
      const { data } = await axios.post('http://localhost:5000/api/paraphrase', {
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
    navigator.clipboard.writeText(outText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            AI <span className="text-blue-600">Paraphraser</span>
          </h1>
          <p className="text-slate-500 mt-2">Personalized text rewriting with zero plagiarism.</p>
        </header>

        <ModeSelector activeMode={activeMode} setMode={setActiveMode} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Editor 
            label="Your Original Idea"
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
            placeholder="AI optimized version will appear here..."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleParaphrase}
            disabled={loading || !inputText}
            className="flex items-center gap-3 bg-blue-600 text-white px-14 py-4 rounded-full font-bold text-lg hover:bg-blue-700 disabled:bg-slate-200 transition-all shadow-xl active:scale-95"
          >
            Paraphrase <Sparkles size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;