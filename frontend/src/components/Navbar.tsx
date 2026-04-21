"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, LogOut, Globe, Code, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem('token')); }, []);

  const handleLogout = () => { localStorage.removeItem('token'); window.location.href = '/'; };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-surface-container shadow-sm shadow-indigo-100/20">
      <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-primary rounded-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black text-on-surface tracking-tighter">ScholarHub</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 font-['Manrope'] font-bold tracking-tight">
            <Link href="/explore" className={cn(
              "transition-colors pb-1 border-b-2 font-[900] uppercase tracking-widest text-[11px]",
              pathname === '/explore' ? "text-primary border-primary" : "text-on-surface-variant border-transparent hover:text-primary"
            )}>Explore</Link>
            <Link href="/docs" className={cn(
              "transition-colors pb-1 border-b-2 font-[900] uppercase tracking-widest text-[11px]",
              pathname === '/docs' ? "text-primary border-primary" : "text-on-surface-variant border-transparent hover:text-primary"
            )}>Documentation</Link>
            <Link href="/community" className={cn(
              "transition-colors pb-1 border-b-2 font-[900] uppercase tracking-widest text-[11px]",
              pathname === '/community' ? "text-primary border-primary" : "text-on-surface-variant border-transparent hover:text-primary"
            )}>Community</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-sm font-black text-on-surface tracking-tight">Dashboard</Link>
              <button onClick={handleLogout} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-[11px] font-[900] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors pb-1 border-b-2 border-transparent">Login</Link>
              <Link href="/register" className="bg-primary text-on-primary px-7 py-3 rounded-2xl text-[11px] font-[900] uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
