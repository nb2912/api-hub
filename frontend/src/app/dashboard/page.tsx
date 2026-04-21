"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Layout, Box, Activity, CreditCard, Settings, Plus, HelpCircle, ChevronRight, Copy, ShieldCheck, TrendingUp, Key, Terminal, Microscope, Calculator, Verified, Search, Bell, LogOut, Menu, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/services/api';
import { cn } from '@/lib/utils';
import { getCategoryStyles } from '@/lib/api-styles';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [myApis, setMyApis] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, statsRes, apisRes, keysRes] = await Promise.all([
          api.get('/auth/me'),
          api.get('/analytics/stats'),
          api.get('/apis/my-apis'),
          api.get('/keys/')
        ]);
        setUser(userRes.data);
        setStats(statsRes.data);
        setMyApis(apisRes.data);
        setApiKeys(keysRes.data);
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const rotateKey = async () => {
    try {
      await api.post('/keys/', { name: "Default Key" });
      const res = await api.get('/keys/');
      setApiKeys(res.data);
    } catch (err) {
      alert("Failed to rotate key");
    }
  };

  const LATENCY_DATA = [40, 60, 45, 85, 55, 50, 65, 75, 30, 90, 50, 40];
  const activeKey = apiKeys.length > 0 ? apiKeys[apiKeys.length - 1].key_value : "sk_live_****************";

  return (
    <main className="min-h-screen bg-background text-on-background font-sans tracking-tight flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-20 max-w-screen-2xl mx-auto w-full">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-80px)] w-64 sticky top-20 py-8 gap-2 bg-slate-50/30 border-r border-surface-container">
          <div className="px-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-primary font-[900] text-lg shadow-lg shadow-primary/10">JD</div>
              <div>
                <div className="text-base font-[900] text-on-surface leading-none mb-1">DevStudio</div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-60">Academic Plan</div>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 px-3">
            {[
              { name: "Overview", icon: Layout },
              { name: "My APIs", icon: Box },
              { name: "Analytics", icon: Activity },
              { name: "Billing", icon: CreditCard },
              { name: "Settings", icon: Settings },
            ].map(item => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-black transition-all",
                  activeTab === item.name 
                    ? "bg-white text-primary shadow-xl shadow-primary/5 ring-1 ring-black/5" 
                    : "text-on-surface-variant hover:text-primary hover:bg-primary-container/20"
                )}
              >
                <item.icon className="w-5 h-5" /> {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto px-5 space-y-4">
            <Link href="/submit" className="w-full py-4 bg-primary text-on-primary font-[900] rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-xl shadow-primary/20">
              <Plus className="w-5 h-5" /> Submit API
            </Link>
            <button className="w-full flex items-center gap-4 px-4 py-3 text-on-surface-variant font-[900] text-[11px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
              <HelpCircle className="w-5 h-5" /> Help Center
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 p-8 lg:p-12 overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
            <div className="max-w-2xl">
              <h1 className="text-[44px] font-[900] tracking-tighter text-on-surface mb-4 leading-none">Welcome back, {user?.full_name?.split(' ')[0] || 'Researcher'}.</h1>
              <p className="text-on-surface-variant text-lg leading-relaxed font-medium">Your Academic Plan is active. You have published {myApis.length} APIs with a high reliability score across all nodes.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-surface-container-low p-8 rounded-[32px] flex flex-col gap-3 border border-black/5 min-w-[200px]">
                <span className="text-on-surface-variant text-[11px] font-[900] uppercase tracking-widest opacity-60">Total Requests</span>
                <span className="text-4xl font-[900] text-primary tracking-tighter">
                  {stats?.total_calls > 1000000 ? (stats.total_calls/1000000).toFixed(1) + 'M' : stats?.total_calls || 0}
                </span>
                <span className="text-emerald-600 text-[11px] font-black flex items-center gap-1 uppercase">
                  <TrendingUp className="w-4 h-4" /> Live Uptime
                </span>
              </div>
              <div className="bg-surface-container-low p-8 rounded-[32px] flex flex-col gap-3 border border-black/5 min-w-[200px]">
                <span className="text-on-surface-variant text-[11px] font-[900] uppercase tracking-widest opacity-60">Active APIs</span>
                <span className="text-4xl font-[900] text-on-surface tracking-tighter">{myApis.length}</span>
                <span className="text-on-surface-variant text-[11px] font-black uppercase tracking-widest opacity-50">Verified status</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            {/* API List Card */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-[40px] p-10 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] border border-black/5">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-[900] tracking-tight">My Published APIs</h2>
                <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {myApis.map((api_item, idx) => {
                  const styles = getCategoryStyles(api_item.category);
                  const Icon = styles.icon;
                  const primaryEp = api_item.endpoints?.[0] || { method: 'GET' };
                  
                  return (
                    <div key={idx} className="group p-5 bg-surface hover:bg-surface-container-low rounded-[24px] border border-transparent hover:border-black/5 transition-all flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", styles.color)}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="font-[900] text-on-surface text-lg leading-none mb-2 tracking-tight">{api_item.name}</h3>
                          <div className="flex items-center gap-3">
                            <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", styles.color.split(' ')[0])}>{primaryEp.method}</span>
                            <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest opacity-50">v1.0.0 • {api_item.category}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-outline-variant group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>
                  );
                })}
                {myApis.length === 0 && (
                  <div className="py-20 text-center">
                    <p className="text-on-surface-variant font-medium opacity-50">You haven't published any APIs yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Security Module */}
            <div className="bg-surface-container-low rounded-[40px] p-10 flex flex-col border border-black/5">
              <h2 className="text-xl font-[900] mb-8 tracking-tight">Security & Auth</h2>
              <div className="mb-10">
                <label className="text-[11px] font-[900] text-on-surface-variant uppercase tracking-widest mb-4 block opacity-60 ml-1">Production API Key</label>
                <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between shadow-sm border border-black/5">
                  <code className="text-primary font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap mr-4 font-bold">
                    {activeKey}
                  </code>
                  <button onClick={() => navigator.clipboard.writeText(activeKey)} className="p-2 hover:bg-primary-container/20 rounded-lg transition-colors"><Copy className="w-5 h-5 text-primary" /></button>
                </div>
              </div>
              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-black/5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-[900] leading-none mb-1">2FA Enabled</p>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-50">Identity Verified</p>
                  </div>
                </div>
                <button onClick={rotateKey} className="w-full py-5 bg-white text-on-surface border border-black/10 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-primary-container/10 transition-all shadow-sm">Rotate API Keys</button>
              </div>
            </div>
          </div>

          {/* Latency Trends Card */}
          <div className="bg-surface-container-lowest rounded-[40px] p-12 shadow-[0px_12px_32px_rgba(5,52,92,0.04)] relative overflow-hidden border border-black/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h2 className="text-2xl font-[900] tracking-tight mb-1">Latency Trends</h2>
                <p className="text-[13px] text-on-surface-variant font-medium">Global performance across edge nodes</p>
              </div>
              <div className="flex gap-2 bg-surface-container-low p-1.5 rounded-2xl border border-black/5">
                <button className="px-6 py-2 bg-white shadow-xl shadow-black/5 rounded-xl text-[11px] font-[900] uppercase tracking-widest">Last 24h</button>
                <button className="px-6 py-2 text-on-surface-variant text-[11px] font-[900] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">7 Days</button>
              </div>
            </div>
            
            <div className="h-56 flex items-end gap-3 md:gap-5 px-4 relative">
              {LATENCY_DATA.map((val, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${val}%` }} 
                  transition={{ duration: 1, delay: idx * 0.05 }}
                  className={cn(
                    "flex-1 rounded-t-2xl transition-all duration-300 relative group",
                    idx === 3 || idx === 9 ? "bg-primary/50" : "bg-primary/15 hover:bg-primary/30"
                  )}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold whitespace-nowrap">
                    {val}ms
                  </div>
                </motion.div>
              ))}
              <div className="absolute -bottom-10 left-0 w-full flex justify-between text-[11px] font-[900] text-on-surface-variant uppercase tracking-[0.2em] px-8 opacity-40">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-surface-container flex justify-around py-5 z-50 shadow-2xl">
        {[
          { icon: Layout, label: "Overview", active: true },
          { icon: Box, label: "APIs" },
          { icon: Activity, label: "Stats" },
          { icon: Settings, label: "Settings" },
        ].map(item => (
          <button key={item.label} className={cn("flex flex-col items-center gap-1.5", item.active ? "text-primary" : "text-on-surface-variant opacity-50")}>
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[5%] -left-[5%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
