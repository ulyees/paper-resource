import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, AlertTriangle, ExternalLink, Activity, Info, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Types ---

interface TimeState {
  current: Date;
  uptime: string;
  isFuture: boolean;
}

// --- Components ---

/**
 * Animated Background Component
 * Adds a subtle luxury feel with a gradient and noise
 */
const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-noble-black" />
      
      {/* Subtle spotlight effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[60%] bg-noble-gold/5 blur-[120px] rounded-full" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

/**
 * Ornamental Divider
 * A decorative gold line separator
 */
const Divider: React.FC = () => (
  <div className="flex items-center justify-center py-6 opacity-60">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-noble-gold" />
    <div className="w-2 h-2 rotate-45 border border-noble-gold mx-2" />
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-noble-gold" />
  </div>
);

/**
 * Info Card Component
 * Displays crucial information in a styled box
 */
const InfoCard: React.FC<{ icon: React.ReactNode; label: string; text: string; subtext?: string; highlight?: boolean }> = ({ icon, label, text, subtext, highlight }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`
      relative p-4 rounded-lg border backdrop-blur-sm
      ${highlight 
        ? 'border-noble-gold/40 bg-noble-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
        : 'border-white/5 bg-noble-surface/80'}
    `}
  >
    <div className="flex items-start gap-4">
      <div className={`p-2 rounded-full ${highlight ? 'bg-noble-gold/20 text-noble-gold' : 'bg-white/5 text-gray-400'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xs font-serif uppercase tracking-widest text-gray-500 mb-1">{label}</h3>
        <p className={`font-serif text-lg leading-tight ${highlight ? 'text-noble-gold font-medium' : 'text-gray-200'}`}>
          {text}
        </p>
        {subtext && <p className="text-xs text-gray-500 mt-1 italic">{subtext}</p>}
      </div>
    </div>
  </motion.div>
);

/**
 * Main Application
 */
const App: React.FC = () => {
  const [timeState, setTimeState] = useState<TimeState>({
    current: new Date(),
    uptime: '',
    isFuture: false,
  });

  // Calculate time and uptime
  useEffect(() => {
    const targetDate = new Date('2025-11-25T00:00:00');

    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - targetDate.getTime();
      const isFuture = diff < 0;
      const absDiff = Math.abs(diff);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

      setTimeState({
        current: now,
        isFuture,
        uptime: `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyUrl = () => {
    // Mock copy function
    alert("永久导航网址已复制到剪贴板");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-10 px-5 text-gray-200 selection:bg-noble-gold selection:text-black">
      <Background />

      {/* Main Content Container - Mobile Optimized Width */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-auto space-y-8"
      >
        
        {/* Header / Title Section */}
        <header className="text-center space-y-4 pt-4">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block relative"
          >
            {/* Decorative border around logo/title */}
            <div className="absolute -inset-4 border border-noble-gold/20 rotate-1 rounded-sm opacity-50"></div>
            <div className="absolute -inset-4 border border-noble-gold/20 -rotate-1 rounded-sm opacity-50"></div>
            
            <h1 className="relative text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gold-gradient drop-shadow-sm px-4 py-2">
              晨风科技
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm font-serif tracking-[0.2em] text-noble-gold/70 uppercase"
          >
            Premium Navigation System
          </motion.p>
        </header>

        <Divider />

        {/* Notices Section */}
        <section className="space-y-4">
          <div className="bg-noble-red/20 border border-noble-red/30 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="text-red-400 shrink-0 w-5 h-5" />
            <p className="text-sm text-red-100/80 font-serif">
              重要提示：网站地址可能会因技术调整而变更。
            </p>
          </div>

          <button 
            onClick={handleCopyUrl}
            className="w-full group relative overflow-hidden bg-noble-gold/10 hover:bg-noble-gold/20 border border-noble-gold/30 transition-all duration-300 rounded-lg p-4 flex items-center justify-between"
          >
             <div className="flex items-center gap-3">
                <Info className="text-noble-gold w-5 h-5" />
                <span className="text-sm text-noble-gold font-serif">请保存此永久导航网址</span>
             </div>
             <Copy className="w-4 h-4 text-noble-gold/50 group-active:scale-90 transition-transform" />
          </button>
        </section>

        {/* Primary Action */}
        <motion.div
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
        >
          <a 
            href="https://chenfengtechweb.dpdns.org/" // Replace with actual link
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center relative group"
          >
             <div className="absolute inset-0 bg-gold-gradient blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-xl"></div>
             <div className="relative bg-gradient-to-b from-noble-surface to-black border border-noble-gold/60 rounded-xl p-6 shadow-xl shadow-black/50">
                <div className="flex flex-col items-center gap-2">
                   <h2 className="text-2xl font-display text-noble-gold group-hover:text-white transition-colors duration-300">
                      进入官方网站
                   </h2>
                   <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 group-hover:text-noble-gold/80 transition-colors">
                      <span>Enter Official Site</span>
                      <ExternalLink className="w-3 h-3" />
                   </div>
                </div>
             </div>
          </a>
        </motion.div>

        {/* Dashboard / Stats Grid */}
        <section className="grid grid-cols-1 gap-4">
          <InfoCard 
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Server Status"
            text="系统运行正常"
            subtext="Available & Secure"
            highlight={true}
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-noble-surface/60 border border-white/5 rounded-lg p-4 flex flex-col justify-between h-32">
                <div className="flex items-center gap-2 text-noble-gold/60 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider">Local Time</span>
                </div>
                <div>
                   <div className="text-2xl font-serif text-gray-200">
                    {timeState.current.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                   </div>
                   <div className="text-xs text-gray-500 mt-1">
                    {timeState.current.toLocaleDateString('zh-CN')}
                   </div>
                </div>
             </div>

             <div className="bg-noble-surface/60 border border-white/5 rounded-lg p-4 flex flex-col justify-between h-32">
                <div className="flex items-center gap-2 text-noble-gold/60 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-wider">
                    {timeState.isFuture ? 'Countdown' : 'Uptime'}
                  </span>
                </div>
                <div className="text-xs font-serif text-gray-300 break-words leading-relaxed">
                   {timeState.isFuture ? '距离启动:' : '已稳定运行:'} <br/>
                   <span className="text-noble-gold font-mono text-sm block mt-1">
                     {timeState.uptime.split(' ')[0]} {/* Show Days prominent */}
                   </span>
                   <span className="text-[10px] text-gray-500">
                     {timeState.uptime.split(' ').slice(1).join(' ')}
                   </span>
                </div>
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-noble-gold/20 to-transparent mb-4"></div>
            <p className="text-[10px] text-gray-600 font-serif tracking-widest uppercase">
              © 2024 Chenfeng Technology. All Rights Reserved.
            </p>
            <p className="text-[9px] text-gray-700 mt-1">
              Est. MMXXV
            </p>
        </footer>

      </motion.main>
    </div>
  );
};

export default App;
