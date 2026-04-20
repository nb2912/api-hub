"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { CheckCircle, PlusCircle, Trash2, Link as LinkIcon, Globe, Mail, Lock, Info, AlertCircle, Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function SubmitAPI() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_url: '',
    github_url: '',
    category: 'General',
  });
  
  const [endpoints, setEndpoints] = useState([{ method: 'GET', path: '/v1/example' }]);
  const [tags, setTags] = useState(['Biology', 'Open-Source']);
  const [tagInput, setTagInput] = useState('');

  const addEndpoint = () => setEndpoints([...endpoints, { method: 'GET', path: '/v1/new-path' }]);
  const removeEndpoint = (idx: number) => setEndpoints(endpoints.filter((_, i) => i !== idx));
  
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/apis/', {
        ...formData,
        base_url: `https://${formData.base_url}`,
        endpoints: endpoints.map(e => ({ ...e, description: 'API Endpoint' }))
      });
      router.push(`/api/${res.data.id}`);
    } catch (err) {
      alert("Submission failed. Please check your inputs.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-on-background font-sans tracking-tight">
      <Navbar />
      
      <div className="max-w-screen-xl mx-auto px-6 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <h1 className="text-[52px] font-[900] tracking-tighter text-on-surface mb-6 leading-none">
                Contribute to the <span className="text-primary italic">Digital Library</span>
              </h1>
              <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-md opacity-80">
                Share your research APIs, data endpoints, and academic tools with a global community of scholars and developers.
              </p>
            </div>

            <div className="relative group rounded-3xl overflow-hidden aspect-video shadow-2xl border border-black/5">
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              <div className="bg-primary/40 absolute inset-0 flex items-center justify-center">
                 <Terminal className="w-20 h-20 text-white/50" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl">
                  <p className="text-xs font-black text-on-surface uppercase tracking-widest">Trusted by 2,000+ Academic Institutions</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-10 rounded-[40px] flex flex-col gap-8 border border-black/5">
              <h3 className="text-xl font-[900] tracking-tight">Submission Guidelines</h3>
              <ul className="space-y-6">
                {[
                  "Ensure your Base URL is reachable and uses HTTPS protocol.",
                  "Provide clear documentation links in your GitHub repository.",
                  "Categorize your API accurately using relevant scholar tags."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-[14px] font-medium text-on-surface-variant">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="opacity-80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: The Form Canvas */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container-lowest p-10 lg:p-14 rounded-[48px] shadow-[0px_40px_100px_-20px_rgba(0,0,0,0.04)] border border-surface-container-high"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Basic Info */}
                <div className="space-y-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black text-on-surface uppercase tracking-widest opacity-60 ml-1">API Name</label>
                    <input 
                      required
                      className="bg-surface-container-low border-none rounded-2xl px-6 py-4 text-on-surface font-bold text-sm focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/30" 
                      placeholder="e.g. BioCore Genetics API" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black text-on-surface uppercase tracking-widest opacity-60 ml-1">Description</label>
                    <textarea 
                      required
                      rows={3}
                      className="bg-surface-container-low border-none rounded-2xl px-6 py-4 text-on-surface font-medium text-sm focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/30 resize-none" 
                      placeholder="Provide a brief summary of the scientific data or utility..." 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                    <span className="text-[10px] font-black text-on-surface-variant opacity-40 italic ml-1 uppercase tracking-widest">Max 300 characters</span>
                  </div>
                </div>

                {/* Connection Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black text-on-surface uppercase tracking-widest opacity-60 ml-1">Base URL</label>
                    <div className="flex items-center bg-surface-container-low rounded-2xl px-6 py-4 border border-transparent focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                      <span className="text-primary font-black text-xs mr-2 opacity-50">https://</span>
                      <input 
                        required
                        className="bg-transparent border-none p-0 text-on-surface focus:ring-0 w-full placeholder:text-outline/30 font-bold text-sm" 
                        placeholder="api.example.edu/v1"
                        value={formData.base_url}
                        onChange={e => setFormData({...formData, base_url: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-black text-on-surface uppercase tracking-widest opacity-60 ml-1">GitHub Link</label>
                    <div className="flex items-center bg-surface-container-low rounded-2xl px-6 py-4 border border-transparent focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                      <GithubIcon className="w-4 h-4 text-primary mr-3 opacity-50" />
                      <input 
                        className="bg-transparent border-none p-0 text-on-surface focus:ring-0 w-full placeholder:text-outline/30 font-bold text-sm" 
                        placeholder="github.com/org/repo"
                        value={formData.github_url}
                        onChange={e => setFormData({...formData, github_url: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Endpoints */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-on-surface uppercase tracking-widest opacity-60 ml-1">Primary Endpoints</label>
                  <div className="flex flex-col gap-4">
                    {endpoints.map((ep, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-surface-container-low rounded-2xl items-center border border-black/5">
                        <span className="px-3 py-1 bg-primary-container text-primary rounded-lg text-[10px] font-black tracking-widest uppercase">GET</span>
                        <input 
                          className="text-xs font-mono font-bold text-on-surface-variant flex-1 bg-transparent border-none focus:ring-0" 
                          value={ep.path}
                          onChange={e => {
                            const newEps = [...endpoints];
                            newEps[i].path = e.target.value;
                            setEndpoints(newEps);
                          }}
                        />
                        <button type="button" onClick={() => removeEndpoint(i)} className="text-outline hover:text-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={addEndpoint}
                      className="flex items-center justify-center gap-3 py-4 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all"
                    >
                      <PlusCircle className="w-4 h-4" /> Add Endpoint
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-4">
                  <label className="text-[11px] font-black text-on-surface uppercase tracking-widest opacity-60 ml-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span key={tag} className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border border-black/5">
                        {tag} <X className="w-3.5 h-3.5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setTags(tags.filter(t => t !== tag))} />
                      </span>
                    ))}
                  </div>
                  <input 
                    className="bg-surface-container-low border-none rounded-2xl px-6 py-4 text-on-surface font-bold text-sm focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/30" 
                    placeholder="Press enter to add tags..." 
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-10 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <input required className="w-5 h-5 rounded-lg border-primary/20 text-primary focus:ring-primary/20" id="terms" type="checkbox"/>
                    <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest opacity-60" htmlFor="terms">
                      I agree to the <a className="text-primary underline" href="#">Developer Terms</a>
                    </label>
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-12 py-5 bg-primary text-on-primary font-[900] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-95 transition-all text-sm uppercase tracking-widest">
                    Submit API
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
