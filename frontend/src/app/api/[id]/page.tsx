"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Play, Send, Terminal, Globe, Code, ArrowLeft, Copy, Check, Star, Rocket, ChevronRight, ChevronDown, BookOpen, Shield, Info, Activity, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/services/api';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function APIDetails({ params }: { params: { id: string } }) {
  const [apiData, setApiData] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reqLoading, setReqLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get(`/apis/${params.id}`).then(res => {
      setApiData(res.data);
      if (res.data.endpoints?.length > 0) setSelectedEndpoint(res.data.endpoints[0]);
    }).finally(() => setLoading(false));
  }, [params.id]);

  const handleTest = async () => {
    setReqLoading(true);
    try {
      const res = await api.post('/playground/proxy', {
        method: selectedEndpoint.method,
        url: apiData.base_url + selectedEndpoint.path,
        headers: { "Content-Type": "application/json" }
      });
      setResponse(res.data);
    } catch (err: any) {
      setResponse({ status_code: 500, content: err.message });
    } finally {
      setReqLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center font-black text-primary text-2xl tracking-tighter">Connecting to ScholarHub...</div>;

  return (
    <main className="min-h-screen bg-background text-on-surface font-sans tracking-tight">
      <Navbar />
      
      <div className="max-w-screen-2xl mx-auto px-8 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: API Overview & Playground (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* API Overview Section */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", styles.color)}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <span className={cn("text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", styles.color)}>
                    {apiData.category}
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4 font-headline">{apiData.name}</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl font-medium">
                  {apiData.description || "Access the world's most comprehensive academic relationship dataset. Map institutional connections, track citation velocity, and analyze the evolution of scientific breakthroughs across 150 million journals."}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {["Big Data", "Machine Learning", "Education", "Graph DB"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-full text-sm font-medium">{tag}</span>
              ))}
            </div>
          </section>

          {/* Endpoint List Section */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-black/5">
            <h3 className="text-xl font-bold mb-6 text-on-surface font-headline">Available Endpoints</h3>
            <div className="space-y-4">
              {apiData.endpoints?.map((ep, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedEndpoint(ep)}
                  className={cn(
                    "p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer",
                    selectedEndpoint === ep 
                      ? "bg-surface-container-lowest ring-2 ring-primary/20 shadow-sm" 
                      : "bg-surface-container-lowest hover:bg-white border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-bold tracking-tight",
                      ep.method === 'GET' ? "bg-primary-container text-primary" : "bg-tertiary-container text-tertiary"
                    )}>
                      {ep.method}
                    </span>
                    <code className="text-on-surface-variant font-medium font-mono text-sm">{ep.path}</code>
                  </div>
                  {selectedEndpoint === ep ? <ChevronDown className="w-5 h-5 text-primary" /> : <ChevronRight className="w-5 h-5 text-outline-variant" />}
                </div>
              ))}
            </div>
          </section>

          {/* API Playground Section */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-on-surface font-headline">API Playground</h3>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Status
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Request URL</label>
                <div className="flex overflow-hidden rounded-lg bg-surface-container-low border border-black/5">
                  <div className="px-4 py-3 bg-surface-container-high text-on-surface font-bold text-xs flex items-center uppercase tracking-widest">
                    {selectedEndpoint?.method}
                  </div>
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-mono text-on-surface font-medium px-4 py-3" 
                    readOnly 
                    type="text" 
                    value={apiData.base_url + (selectedEndpoint?.path || '')}
                  />
                </div>
              </div>

              <div className="border-b border-surface-container-high flex gap-6">
                <button className="pb-3 border-b-2 border-primary text-primary font-bold text-sm">Request Body</button>
                <button className="pb-3 text-on-surface-variant font-medium text-sm opacity-60">Headers (3)</button>
                <button className="pb-3 text-on-surface-variant font-medium text-sm opacity-60">Authentication</button>
              </div>

              <div className="bg-surface-container-highest rounded-xl p-6 relative border border-black/5">
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => copyToClipboard(`{ "target_node": "doi:10.1038/s41586-020", "depth": 3 }`)}
                    className="p-2 bg-white/50 rounded-md hover:bg-white transition-colors shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-outline" />}
                  </button>
                </div>
                <pre className="text-sm text-on-tertiary-container overflow-x-auto font-mono leading-relaxed">
                  {`{
  "target_node": "doi:10.1038/s41586-020",
  "depth": 3,
  "filters": {
    "min_citations": 500,
    "field": "Quantum Computing"
  }
}`}
                </pre>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleTest}
                  disabled={reqLoading}
                  className="px-8 py-3 bg-primary text-on-primary rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {reqLoading ? "Sending..." : <><Send className="w-4 h-4" /> Send Request</>}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-on-surface-variant">Response</label>
                  {response && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                      200 OK — 124ms
                    </span>
                  )}
                </div>
                <div className="bg-[#1A1A2E] rounded-xl p-6 text-indigo-100 font-mono text-sm leading-relaxed max-h-64 overflow-y-auto shadow-2xl border border-white/5">
                  <pre>{response ? JSON.stringify(response.content, null, 2) : "// Awaiting your request..."}</pre>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Metadata & Trust (4 Columns) */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Trust Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
            <h4 className="text-lg font-bold mb-6 text-on-surface font-headline">Community Trust</h4>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-extrabold text-primary tracking-tighter">4.9</div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-sm text-on-surface-variant font-medium">Based on 1.2k ratings</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>Reliability</span>
                  <span>99.9%</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '99.9%' }} className="bg-primary h-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>Latency (Avg)</span>
                  <span>140ms</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="bg-primary h-full" />
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-3 rounded-lg border-2 border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container-low transition-all">
                Write a Review
            </button>
          </div>

          {/* Developer Card */}
          <div className="bg-surface-container-high rounded-xl p-8 border border-black/5">
            <h4 className="text-lg font-bold mb-6 text-on-surface font-headline">Maintained By</h4>
            <div className="flex items-center gap-4 mb-6">
              <img className="w-12 h-12 rounded-full object-cover shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo66edlJJWA7DJDzBGIN5L19utVgICAPR95DnSym86b5i5WjC_Ug-gT4MS2C8dLO2Y1MINUKnuI4MVm5Zoi0Q1B4Mg0B70pjAWl7bhhf7viAtvHnmZp-n_Q_mi1nJylVFKN6XWMPMOyN9rFFQPDR9eJDV0lA-q7AhZHQRBXXuP5WlCVR3EDS3t7Dw2rgcXkZpG1k7Xz_j4rrWokU8lb2tkRMUiKCcCti73r_WZDeIIljS5q2mcp6nWNYoBEQ1Qt_X6lQyil3IJUJM" alt="Team" />
              <div>
                <p className="font-bold text-on-surface">Academic Data Team</p>
                <p className="text-xs text-on-surface-variant">Verified Publisher</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/40 p-4 rounded-xl border border-white/50">
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Updated</p>
                <p className="text-sm font-bold text-on-surface">2 days ago</p>
              </div>
              <div className="bg-white/40 p-4 rounded-xl border border-white/50">
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Version</p>
                <p className="text-sm font-bold text-on-surface">v2.4.1</p>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40">
            <div className="relative z-10">
              <h4 className="text-xl font-extrabold mb-2 font-headline">Need Higher Limits?</h4>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Upgrade to the Researcher Plan for unlimited requests and priority support.</p>
              <button className="w-full py-3 bg-white text-indigo-700 rounded-lg font-bold shadow-xl shadow-indigo-900/40 hover:scale-105 active:scale-95 transition-all">
                Upgrade Now
              </button>
            </div>
            <Rocket className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
          </div>
        </aside>
      </div>

      {/* Visual Anchor Decorations */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-tertiary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
    </main>
  );
}
