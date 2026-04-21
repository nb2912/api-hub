"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Mail, Lock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '@/services/api';
import { motion } from 'framer-motion';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      
      const res = await api.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#f8f9ff]">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,_hsla(241,36%,86%,0.4)_0,_transparent_50%),_radial-gradient(at_100%_100%,_hsla(296,57%,91%,0.4)_0,_transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235b5a8b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="z-10 w-full max-w-[480px] px-6 py-12">
        {/* Brand Anchor */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/40"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="font-headline font-[900] text-4xl tracking-tighter text-on-surface">ScholarHub</h1>
          <p className="text-on-surface-variant mt-3 font-bold tracking-[0.1em] uppercase text-[10px] opacity-60">The Digital Scholar Network</p>
        </div>

        {/* Auth Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(5,52,92,0.1)] border border-white/40 backdrop-blur-sm"
        >
          <header className="mb-10 text-center sm:text-left">
            <h2 className="font-headline text-3xl font-[900] tracking-tight text-on-surface">Welcome back</h2>
            <p className="text-on-surface-variant text-sm mt-2 font-medium opacity-70 leading-relaxed">Please enter your credentials to access the hub.</p>
          </header>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 py-4 bg-on-surface text-white rounded-2xl font-[900] text-xs uppercase tracking-widest hover:bg-on-surface/90 transition-all active:scale-[0.98] shadow-xl shadow-on-surface/10">
              <GithubIcon className="w-5 h-5" /> Continue with GitHub
            </button>
          </div>

          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-black/5"></div>
            <span className="flex-shrink mx-4 text-outline/40 text-[10px] font-black tracking-[0.2em] uppercase">or email address</span>
            <div className="flex-grow border-t border-black/5"></div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container/10 border border-error/10 rounded-2xl flex items-center gap-3 text-error text-sm font-bold">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-2 opacity-60">Username</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-outline/30" />
                <input 
                  type="text" 
                  required
                  className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm placeholder:text-outline/30"
                  placeholder="athorne"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-60">Password</label>
                <Link href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-outline/30" />
                <input 
                  type="password" 
                  required
                  className="w-full pl-14 pr-6 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold text-sm placeholder:text-outline/30"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-2 py-2">
              <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-primary/20 text-primary focus:ring-primary/20" />
              <label htmlFor="remember" className="text-xs font-bold text-on-surface-variant opacity-60 cursor-pointer select-none">Stay logged in for 30 days</label>
            </div>

            <button type="submit" className="w-full py-5 bg-primary text-white font-[900] text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Sign In
            </button>
          </form>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-on-surface-variant text-sm font-bold opacity-60">
            Don't have an account yet? 
            <Link href="/register" className="text-primary ml-2 hover:underline">Create an account</Link>
          </p>
        </div>

        {/* Institutional Trust */}
        <div className="mt-20 opacity-30 flex flex-col items-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-on-surface/20 to-transparent mb-8" />
          <div className="flex justify-center gap-10 grayscale opacity-70">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Academy</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Research</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Innovation</div>
          </div>
        </div>
      </div>

      {/* Floating Support Nav */}
      <footer className="fixed bottom-8 left-0 right-0 flex justify-center z-20 px-6">
        <div className="flex items-center gap-6 py-3 px-8 bg-white/40 backdrop-blur-2xl border border-white/50 rounded-full text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
          <Link className="hover:text-primary transition-colors" href="#">Privacy</Link>
          <div className="w-1 h-1 bg-on-surface/20 rounded-full"></div>
          <Link className="hover:text-primary transition-colors" href="#">Terms</Link>
          <div className="w-1 h-1 bg-on-surface/20 rounded-full"></div>
          <Link className="hover:text-primary transition-colors" href="#">Help</Link>
        </div>
      </footer>
    </main>
  );
}
