"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Search, Filter, CheckCircle, TrendingUp, Star, ChevronDown, Layout, Code, Globe, Terminal, ArrowRight, MessageSquareQuote, BadgeCheck, Sparkles, Database, Fingerprint, Microscope, Languages, Map, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/services/api';
import { cn } from '@/lib/utils';

const CATEGORIES = ["Machine Learning", "Data Visualization", "Authentication", "Natural Language", "Storage", "Geospatial", "Health Stats"];

const APIS_MOCK = [
  { id: 1, name: "NeuroGraph Engine", desc: "High-performance neural network visualization and structural analysis for academic datasets.", rating: "4.9", tags: ["AI", "GRAPH"], method: "GET", path: "/analysis", color: "bg-primary-container text-primary", icon: Terminal },
  { id: 2, name: "ScholarVault DB", desc: "Decentralized peer-reviewed citation storage with ultra-low latency retrieval.", rating: "4.7", tags: ["DATABASE", "STORAGE"], method: "POST", path: "/query", color: "bg-tertiary-container text-tertiary", icon: Database },
  { id: 3, name: "EduAuth Identity", desc: "The standard for institutional single sign-on integration for student portals.", rating: "5.0", tags: ["AUTH", "SECURITY"], method: "GET", path: "/authorize", color: "bg-surface-container-highest text-primary", icon: Fingerprint },
  { id: 4, name: "GenomeMapper", desc: "Real-time gene sequence alignment and comparative genomics processing.", rating: "4.8", tags: ["BIOTECH", "COMPUTE"], method: "PATCH", path: "/sequence", color: "bg-error/10 text-error", icon: Microscope },
  { id: 5, name: "Polyglot Doc AI", desc: "Accurate translation of technical manuscripts across 45 academic languages.", rating: "4.6", tags: ["NLP", "LANGUAGE"], method: "POST", path: "/translate", color: "bg-secondary-container text-secondary", icon: Languages },
  { id: 6, name: "GeoSpat Scholar", desc: "Historical mapping and territorial change analysis for social science research.", rating: "4.9", tags: ["MAPS", "HISTORY"], method: "GET", path: "/coordinates", color: "bg-primary-container/20 text-primary", icon: Map },
  { id: 7, name: "ThesisWriter Pro", desc: "Advanced generative assistant for structuring and formatting doctoral dissertations.", rating: "5.0", tags: ["LLM", "EDITOR"], method: "POST", path: "/compose", color: "bg-on-surface text-white", icon: Sparkles, featured: true },
  { id: 8, name: "MetricMind", desc: "Real-time impact factor and citation trend analytics for publishers.", rating: "4.5", tags: ["STATS", "PUBLISHING"], method: "GET", path: "/impact", color: "bg-surface-container-high text-on-surface-variant", icon: BarChart3 },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  
  return (
    <main className="min-h-screen bg-background text-on-background font-sans tracking-tight">
      <Navbar />
      
      <div className="max-w-screen-2xl mx-auto px-8 pt-32 pb-24">
        {/* Hero Search Section */}
        <header className="mb-16">
          <div className="max-w-3xl mb-12">
            <h1 className="text-[56px] font-[900] text-on-surface tracking-tighter mb-4 leading-none">Discover Academic APIs</h1>
            <p className="text-xl text-on-surface-variant leading-relaxed font-medium">Access the world's most comprehensive collection of research data, citation tools, and educational microservices.</p>
          </div>
          
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center p-4 bg-surface-container-low rounded-2xl border border-black/5">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-xl text-on-surface focus:ring-2 focus:ring-primary/40 placeholder:text-outline-variant font-medium" 
                placeholder="Search APIs, tools, or providers..." 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
            <div className="flex gap-2 items-center overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              <button className="flex items-center gap-2 px-6 py-4 bg-primary text-on-primary rounded-xl font-black text-sm uppercase tracking-widest whitespace-nowrap shadow-lg shadow-primary/20">
                <Filter className="w-4 h-4" /> All Categories
              </button>
              <button className="flex items-center gap-2 px-6 py-4 bg-surface-container-lowest text-on-surface-variant rounded-xl font-black text-sm uppercase tracking-widest hover:bg-surface-container-high transition-colors whitespace-nowrap border border-black/5">
                <CheckCircle className="w-4 h-4 text-primary" /> Verified
              </button>
              <button className="flex items-center gap-2 px-6 py-4 bg-surface-container-lowest text-on-surface-variant rounded-xl font-black text-sm uppercase tracking-widest hover:bg-surface-container-high transition-colors whitespace-nowrap border border-black/5">
                <TrendingUp className="w-4 h-4 text-indigo-400" /> Trending
              </button>
            </div>
          </div>
        </header>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map(cat => (
            <span key={cat} className="px-5 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-primary-container hover:text-primary transition-all">
              {cat}
            </span>
          ))}
        </div>

        {/* API Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {APIS_MOCK.map(api => (
            <Link key={api.id} href={`/api/${api.id}`} className={cn(
              "p-8 rounded-2xl group hover:shadow-2xl transition-all border border-black/5 flex flex-col",
              api.featured ? "bg-white ring-2 ring-primary/10" : "bg-surface-container-lowest"
            )}>
              <div className="flex justify-between items-start mb-8">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg", api.color)}>
                  <api.icon className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-xl border border-black/5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="text-xs font-black text-on-surface">{api.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[22px] font-[900] text-on-surface tracking-tight leading-none">{api.name}</h3>
                {api.featured && <span className="bg-primary text-on-primary px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">Featured</span>}
              </div>
              <p className="text-on-surface-variant text-[14px] font-medium leading-relaxed mb-8 h-12 line-clamp-2">{api.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {api.tags.map(tag => (
                  <span key={tag} className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-black/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-surface-container-high/30 flex items-center justify-between">
                <span className="text-[10px] font-mono text-outline uppercase tracking-[0.2em] font-black">{api.method} {api.path}</span>
                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <section className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          <div className="lg:col-span-2 bg-gradient-to-br from-primary-dim to-indigo-900 rounded-[40px] p-16 text-on-primary relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <h2 className="text-[44px] font-[900] mb-6 tracking-tighter leading-none">Build the Future <br/> of Education</h2>
              <p className="text-lg text-primary-container font-medium max-w-xl mb-12 opacity-80 leading-relaxed">Join over 10,000 developers building academic tools on our infrastructure. Start for free today.</p>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-[900] text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">Get API Key</button>
                <button className="border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-[900] text-sm uppercase tracking-widest hover:bg-white/10 transition-all">Read Docs</button>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute right-20 top-0 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="bg-surface-container-low p-12 rounded-[40px] flex flex-col border border-black/5">
            <h4 className="text-on-surface font-[900] text-xl mb-8 flex items-center gap-3">
              <MessageSquareQuote className="w-6 h-6 text-primary" />
              Developer Spotlight
            </h4>
            <p className="text-on-surface-variant text-[15px] font-medium italic mb-10 leading-relaxed opacity-70">
              "ScholarHub's NeuroGraph API saved us 4 months of R&D time. The documentation is the best we've seen in the academic space."
            </p>
            <div className="mt-auto flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-primary font-black shadow-lg shadow-primary/10">MV</div>
              <div>
                <p className="text-on-surface font-[900] text-sm leading-none mb-1">Dr. Marcus Vane</p>
                <p className="text-outline text-[10px] font-black uppercase tracking-widest">Lead Researcher, BioTech Int.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-container-high py-24">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-5 gap-16">
          <div className="md:col-span-2">
            <div className="text-[28px] font-[900] text-primary tracking-tighter mb-8 leading-none">ScholarHub</div>
            <p className="text-on-surface-variant text-[15px] font-medium leading-relaxed max-w-sm">Building the connective tissue for the global research community through open API access and collaborative infrastructure.</p>
          </div>
          <div>
            <h5 className="font-[900] text-on-surface text-sm uppercase tracking-[0.2em] mb-10 opacity-50">Explore</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant font-bold">
              <li><Link className="hover:text-primary transition-colors" href="/explore">All APIs</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Categories</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-[900] text-on-surface text-sm uppercase tracking-[0.2em] mb-10 opacity-50">Resources</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant font-bold">
              <li><Link className="hover:text-primary transition-colors" href="#">Documentation</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">SDKs</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Status</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-[900] text-on-surface text-sm uppercase tracking-[0.2em] mb-10 opacity-50">Support</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant font-bold">
              <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Pricing</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
