"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Terminal, ChevronRight, Copy, Check, Send, Star, BadgeCheck, Rocket, Layout, Code, Globe, Shield, Activity, Clock, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('Introduction');
  const [copied, setCopied] = useState(false);

  const sections = [
    { title: 'Introduction', method: 'DOC', path: '/docs/overview' },
    { title: 'Authentication', method: 'SEC', path: '/docs/auth' },
    { title: 'Rate Limiting', method: 'SYS', path: '/docs/limits' },
  ];

  const copySnippet = () => {
    navigator.clipboard.writeText('npm install @scholarhub/sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background text-on-surface font-sans tracking-tight">
      <Navbar />
      
      <div className="max-w-screen-2xl mx-auto px-8 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Docs Content & Reference (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Documentation Overview Section */}
          <section className="bg-surface-container-lowest rounded-2xl p-10 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shadow-lg shadow-primary/10">
                    <Layout className="w-6 h-6 text-primary" />
                  </div>
                  <span className="bg-primary-container text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Platform Docs
                  </span>
                </div>
                <h1 className="text-[44px] font-[900] tracking-tighter text-on-surface mb-6 leading-none">ScholarHub Documentation</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl font-medium">
                  Everything you need to integrate with our global academic ecosystem. Map institutional connections, track citation velocity, and analyze the evolution of scientific breakthroughs across 150 million journals.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-10">
              {["REST API", "GraphQL", "Webhooks", "SDKs"].map(tag => (
                <span key={tag} className="px-5 py-2 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-black uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </section>

          {/* Documentation Sections */}
          <section className="bg-surface-container-low rounded-2xl p-10 border border-black/5">
            <h3 className="text-xl font-black mb-8 text-on-surface tracking-tight uppercase tracking-widest text-xs opacity-50">Section Explorer</h3>
            <div className="space-y-4">
              {sections.map((sec, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveSection(sec.title)}
                  className={cn(
                    "p-5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border-2 group",
                    activeSection === sec.title 
                      ? "bg-white border-primary/20 ring-4 ring-primary/5 shadow-xl" 
                      : "bg-surface-container-lowest border-transparent hover:border-surface-container-highest"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black tracking-widest",
                      sec.method === 'DOC' ? "bg-primary-container text-primary" : "bg-tertiary-container text-tertiary"
                    )}>
                      {sec.method}
                    </span>
                    <code className="text-on-surface font-black text-sm">{sec.path}</code>
                  </div>
                  <ChevronRight className={cn("w-5 h-5 text-outline-variant transition-transform", activeSection === sec.title ? "rotate-90 text-primary" : "group-hover:translate-x-1")} />
                </div>
              ))}
            </div>
          </section>

          {/* Quick Start Playground Section */}
          <section className="bg-surface-container-lowest rounded-2xl p-10 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-on-surface tracking-tight">Quick Reference</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Docs
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-[11px] font-black text-on-surface-variant uppercase tracking-widest mb-3 ml-1">Installation Command</label>
                <div className="flex overflow-hidden rounded-2xl bg-surface-container-low border border-black/5">
                  <div className="px-6 py-4 bg-surface-container-high text-on-surface font-black text-[11px] flex items-center uppercase tracking-widest border-r border-black/5">
                    NPM
                  </div>
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-mono text-on-surface font-bold px-6 py-4" 
                    readOnly 
                    type="text" 
                    value="npm install @scholarhub/sdk"
                  />
                </div>
              </div>

              <div className="border-b border-surface-container-high flex gap-8">
                <button className="pb-4 border-b-2 border-primary text-primary font-black text-xs uppercase tracking-widest">Client Setup</button>
                <button className="pb-4 text-on-surface-variant font-black text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Server-Side</button>
                <button className="pb-4 text-on-surface-variant font-black text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Env Config</button>
              </div>

              <div className="bg-surface-container-highest rounded-2xl p-8 relative border border-black/5">
                <div className="absolute top-4 right-4">
                  <button onClick={copySnippet} className="p-2 bg-white/50 rounded-lg hover:bg-white transition-all shadow-sm">
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-outline" />}
                  </button>
                </div>
                <pre className="text-sm text-on-tertiary-container overflow-x-auto font-mono leading-relaxed">
                  {`import { ScholarClient } from '@scholarhub/sdk';

const client = new ScholarClient({
  apiKey: process.env.SCHOLAR_KEY,
  environment: 'production'
});

const research = await client.research.get('doi:10.1038/s41586-020');`}
                </pre>
              </div>

              <div className="flex justify-end">
                <button className="px-10 py-4 bg-primary text-on-primary rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                   <Send className="w-5 h-5" /> Run Code Snippet
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest">Example Output</label>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                    200 Success
                  </span>
                </div>
                <div className="bg-[#1A1A2E] rounded-[32px] p-10 text-indigo-100 font-mono text-[14px] leading-relaxed max-h-[500px] overflow-y-auto shadow-2xl border border-white/5">
                  <pre>{`{
  "status": "connected",
  "data": {
    "node_id": "doi:10.1038/s41586-020",
    "connections": 14209,
    "growth_rate": "12.4%"
  }
}`}</pre>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Metadata & Trust (4 Columns) */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Trust Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-10 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
            <h4 className="text-lg font-[900] mb-8 text-on-surface tracking-tight uppercase tracking-widest text-[11px] opacity-50">Community Trust</h4>
            <div className="flex items-center gap-6 mb-10">
              <div className="text-[56px] font-[900] text-primary tracking-tighter">4.9</div>
              <div>
                <div className="flex text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-[11px] text-on-surface-variant font-black uppercase tracking-widest opacity-60">Based on 1.2k ratings</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                  <span>Reliability</span>
                  <span className="text-primary">99.9%</span>
                </div>
                <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden border border-black/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '99.9%' }} className="bg-primary h-full rounded-full" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                  <span>Latency (Avg)</span>
                  <span className="text-primary">140ms</span>
                </div>
                <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden border border-black/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="bg-primary h-full rounded-full" />
                </div>
              </div>
            </div>
            <button className="w-full mt-12 py-4 rounded-2xl border-2 border-outline-variant text-on-surface-variant font-black text-xs uppercase tracking-widest hover:bg-surface-container-low transition-all">
                Write a Review
            </button>
          </div>

          {/* Maintainer Card */}
          <div className="bg-surface-container-high rounded-[40px] p-10 border border-black/5">
            <h4 className="text-lg font-[900] mb-8 text-on-surface tracking-tight uppercase tracking-widest text-[11px] opacity-50">Maintained By</h4>
            <div className="flex items-center gap-5 mb-8">
              <img className="w-14 h-14 rounded-2xl object-cover shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo66edlJJWA7DJDzBGIN5L19utVgICAPR95DnSym86b5i5WjC_Ug-gT4MS2C8dLO2Y1MINUKnuI4MVm5Zoi0Q1B4Mg0B70pjAWl7bhhf7viAtvHnmZp-n_Q_mi1nJylVFKN6XWMPMOyN9rFFQPDR9eJDV0lA-q7AhZHQRBXXuP5WlCVR3EDS3t7Dw2rgcXkZpG1k7Xz_j4rrWokU8lb2tkRMUiKCcCti73r_WZDeIIljS5q2mcp6nWNYoBEQ1Qt_X6lQyil3IJUJM" alt="Publisher" />
              <div>
                <p className="font-[900] text-on-surface text-lg leading-none mb-1">Academic Data Team</p>
                <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Verified Publisher</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm p-5 rounded-3xl border border-white/50">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-2">Updated</p>
                <p className="text-sm font-[900] text-on-surface">2 days ago</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-5 rounded-3xl border border-white/50">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-2">Version</p>
                <p className="text-sm font-[900] text-on-surface">v2.4.1</p>
              </div>
            </div>
          </div>

          {/* Scale Promotion Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/40">
            <div className="relative z-10">
              <h4 className="text-2xl font-[900] mb-3 tracking-tight">Need Higher Limits?</h4>
              <p className="text-indigo-100 text-sm mb-10 leading-relaxed font-medium">Upgrade to the Researcher Plan for unlimited requests and priority support.</p>
              <button className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center">
                Upgrade Now
              </button>
            </div>
            <Rocket className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12" />
          </div>
        </aside>
      </div>

      {/* Visual Anchor Decorations */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none"></div>
    </main>
  );
}
