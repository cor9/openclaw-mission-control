import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Activity, LayoutGrid, DollarSign, Database, ShieldAlert, Zap, Bot, BookOpen, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'OpenClaw Mission Control',
  description: 'Read-only observer interface for the OpenClaw multi-agent AI framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex bg-zinc-950 text-zinc-50 relative overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col items-stretch p-4 space-y-8 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <ShieldAlert className="w-8 h-8 text-blue-500 glow-blue rounded-full bg-blue-500/10 p-1" />
            <div>
              <h1 className="font-bold text-lg tracking-tight uppercase">OpenClaw</h1>
              <span className="text-xs text-zinc-400 font-mono tracking-widest">MISSION CONTROL</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link href="/today" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50 text-sm text-zinc-300 hover:text-white transition-colors">
              <Activity className="w-4 h-4 text-emerald-400" />
              Today
            </Link>
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50 text-sm text-zinc-300 hover:text-white transition-colors">
              <LayoutGrid className="w-4 h-4 text-indigo-400" />
              Projects
            </Link>
            <Link href="/execution" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50 text-sm text-zinc-300 hover:text-white transition-colors">
              <Zap className="w-4 h-4 text-amber-500" />
              Execution
            </Link>
            <Link href="/revenue" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50 text-sm text-zinc-300 hover:text-white transition-colors">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Revenue
            </Link>
            <Link href="/fleet" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50 text-sm text-zinc-300 hover:text-white transition-colors">
              <Bot className="w-4 h-4 text-sky-400" />
              AI Fleet
            </Link>
            <Link href="/knowledge" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800/50 text-sm text-zinc-300 hover:text-white transition-colors">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Knowledge
            </Link>
            
            <div className="pt-6 pb-2">
              <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest px-3">Diagnostics</span>
            </div>
            
            <div className="flex flex-col gap-0.5">
               <Link href="/system/agents" className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-zinc-900 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                 Agent Status
               </Link>
               <Link href="/system/jobs" className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-zinc-900 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                 Live Feed
               </Link>
               <Link href="/system/cost" className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-zinc-900 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                 Cost Burn
               </Link>
               <Link href="/system/memory" className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-zinc-900 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                 Memory Health
               </Link>
            </div>
          </nav>

          <div className="mt-auto px-2">
             <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-blue-500 glow-blue animate-pulse"></div>
                 <span className="text-xs text-zinc-400 font-mono">NODE CONNECTED</span>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 p-6 lg:p-10">
          {children}
        </main>
        
        {/* Ambient background decoration */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen opacity-50" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] mix-blend-screen opacity-50" />
        </div>
      </body>
    </html>
  );
}
