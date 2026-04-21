"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, BadgeCheck, Layout, Code, Globe, Terminal, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* Hero Section: Editorial Asymmetry */}
      <section className="pt-32 pb-16 px-8 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">

          <h1 className="text-6xl md:text-[84px] font-extrabold tracking-tighter text-on-surface leading-[1.1]">
            Build, Share, and <span className="text-primary italic">Test</span> APIs
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            ScholarHub is the definitive workspace for students to host, document, and discover academic-focused APIs. Transition from local dev to global scale in minutes.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/explore" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-[900] text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Explore APIs
            </Link>
            <Link href="/submit" className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-[900] text-sm uppercase tracking-widest hover:bg-secondary-container/80 transition-all border border-black/5">
              Add Your API
            </Link>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-highest rounded-2xl p-6 shadow-2xl relative z-10 overflow-hidden border border-white/20"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-error/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-outline-variant/40"></div>
            </div>
            <div className="font-mono text-sm space-y-2 text-on-surface-variant">
              <p className="text-primary-dim">GET <span className="text-on-surface">/v1/academic/research-papers</span></p>
              <div className="pl-4 space-y-1">
                <p>{`{`}</p>
                <p className="pl-4">"status": <span className="text-primary">"success"</span>,</p>
                <p className="pl-4">"data": {`{`}</p>
                <p className="pl-8">"id": <span className="text-tertiary">"paper_001"</span>,</p>
                <p className="pl-8">"author": <span className="text-tertiary">"Sarah J. Mitchell"</span></p>
                <p className="pl-4">{`}`}</p>
                <p>{`}`}</p>
              </div>
            </div>
          </motion.div>
          {/* Glass Decorative Elements */}
          <div className="absolute -top-12 -right-8 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-12 -left-8 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Feature Card */}
          <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-10 flex flex-col justify-between group overflow-hidden min-h-[400px] border border-black/5 hover:shadow-xl transition-all">
            <div className="max-w-md">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Centralized Knowledge</span>
              <h3 className="text-4xl font-bold mb-6">API Marketplace</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Discover a curated ecosystem of APIs built by students, for students. From campus maps to grade parsers, integrate powerful data into your next project instantly.
              </p>
            </div>
            <div className="relative mt-8 flex gap-4">
              <span className="bg-primary-container px-4 py-2 rounded-full text-on-primary-container text-xs font-bold uppercase tracking-tighter">GET</span>
              <span className="bg-tertiary-container px-4 py-2 rounded-full text-on-tertiary-container text-xs font-bold uppercase tracking-tighter">POST</span>
              <span className="bg-surface-container-highest px-4 py-2 rounded-full text-on-surface-variant text-xs font-bold uppercase tracking-tighter">DELETE</span>
            </div>
          </div>

          {/* Secondary Feature Card */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-8 flex flex-col gap-6 shadow-sm border border-black/5 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-tertiary-container flex items-center justify-center rounded-xl">
              <Play className="w-6 h-6 text-tertiary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">API Playground</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Test any API directly in the browser. Zero setup, real responses, and auto-generated code snippets.
              </p>
            </div>
            <div className="mt-auto pt-6 overflow-hidden rounded-xl">
              <div className="bg-black/5 h-32 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                 <Code className="w-10 h-10 text-tertiary/20" />
              </div>
            </div>
          </div>

          {/* Third Feature Card */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-8 flex flex-col gap-6 border border-black/5 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded-xl">
              <BadgeCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Developer Portfolio</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Turn your APIs into a resume. Showcase your uptime, documentation quality, and usage stats to future employers.
              </p>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="md:col-span-8 bg-on-surface rounded-2xl p-10 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative border border-black/5 hover:shadow-2xl transition-all">
            <div className="relative z-10 flex-1">
              <h3 className="text-surface text-4xl font-bold mb-4">Scale with Academic Plan</h3>
              <p className="text-surface-dim text-lg mb-8">
                Every student gets 10,000 free requests per month. Upgrade to our Academic Pro for higher limits and custom domains.
              </p>
              <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-xl font-bold">Learn More</button>
            </div>
            <div className="flex-1 relative">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform rotate-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="h-2 w-24 bg-white/20 rounded"></div>
                    <div className="h-2 w-16 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded"></div>
                  <div className="h-2 w-full bg-white/5 rounded"></div>
                  <div className="h-2 w-3/4 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div className="space-y-2">
            <div className="text-5xl font-extrabold text-primary tracking-tighter">500+</div>
            <div className="text-on-surface-variant font-medium">Student APIs</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-extrabold text-primary tracking-tighter">1.2M</div>
            <div className="text-on-surface-variant font-medium">Monthly Requests</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-extrabold text-primary tracking-tighter">150+</div>
            <div className="text-on-surface-variant font-medium">Universities</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-extrabold text-primary tracking-tighter">99.9%</div>
            <div className="text-on-surface-variant font-medium">Avg Uptime</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 max-w-screen-xl mx-auto">
        <div className="bg-primary rounded-[40px] p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-5xl font-extrabold text-on-primary leading-tight">Ready to ship your first academic API?</h2>
            <p className="text-primary-container text-xl font-medium opacity-80">Join thousands of students building the future of educational technology.</p>
            <div className="flex justify-center gap-4">
              <Link href="/register" className="bg-white text-primary px-10 py-5 rounded-2xl font-[900] text-sm uppercase tracking-widest hover:bg-surface-container-high transition-all shadow-2xl">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start border-t border-surface-container">
        <div className="space-y-6 max-w-xs">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20"><Layout className="w-6 h-6 text-white" /></div>
             <span className="text-2xl font-black text-on-surface tracking-tighter">ScholarHub</span>
          </div>
          <p className="text-on-surface-variant leading-relaxed font-medium">
            The open platform for student innovation. Built by researchers, for the next generation of engineers.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 mt-12 md:mt-0">
          <div className="space-y-6">
            <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-3 text-on-surface-variant font-bold text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/explore">Explorer</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Pricing</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Uptime</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-3 text-on-surface-variant font-bold text-sm">
              <li><Link className="hover:text-primary transition-colors" href="#">Documentation</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Tutorials</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">API Keys</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3 text-on-surface-variant font-bold text-sm">
              <li><Link className="hover:text-primary transition-colors" href="#">About</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
