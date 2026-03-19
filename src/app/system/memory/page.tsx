"use client";

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { HeartPulse, ShieldAlert, Database } from 'lucide-react';

type MemoryData = {
  status: 'healthy' | 'degraded' | 'down';
  providerName: string;
  lastSuccess: string;
  lastFailureMessage: string | null;
  indexSize: number;
  rebuildTimestamp: string;
  backendType: string;
};

export default function MemoryHealthPage() {
  const [data, setData] = useState<MemoryData | null>(null);

  useEffect(() => {
    fetch('/api/memory/health', {
       headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISSION_CONTROL_TOKEN || 'MISSION_CONTROL_TOKEN'}` }
    })
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div className="p-10 text-center font-mono opacity-50 uppercase tracking-widest">Probing Memory Node...</div>;

  const renderStatusIcon = () => {
     if (data.status === 'healthy') return <HeartPulse className="w-8 h-8 text-emerald-500 glow-green animate-pulse" />;
     if (data.status === 'degraded') return <ShieldAlert className="w-8 h-8 text-amber-500 glow-yellow animate-pulse" />;
     return <ShieldAlert className="w-8 h-8 text-red-500 glow-red animate-pulse" />;
  };

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold tracking-tight mb-1 font-mono uppercase">Memory & Index Health</h1>
           <p className="text-zinc-400 font-mono text-sm tracking-wide">RAG Status & Vector Diagnostics</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 shadow-xl relative overflow-hidden flex items-center justify-between">
             <div className="space-y-4">
                 <p className="text-xs uppercase font-mono tracking-widest text-zinc-500">Retrieval Subsystem</p>
                 <div className="flex items-center gap-3">
                    {renderStatusIcon()}
                    <div>
                       <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-widest">{data.status}</h2>
                       <p className="text-sm text-zinc-400 font-mono mt-1 w-64 text-balance">
                           {data.status === 'healthy' ? 'Vector store responding optimally.' : data.lastFailureMessage}
                       </p>
                    </div>
                 </div>
             </div>
             
             <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/20 rotate-45 translate-x-12 -translate-y-12 rounded-[40px] border border-zinc-700/50 backdrop-blur pointer-events-none" />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-xl relative overflow-hidden">
             <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                 <Database className="w-4 h-4 text-sky-500" /> Vector Database details
             </p>
             <div className="space-y-4 font-mono text-sm">
                 <div className="flex justify-between border-b border-zinc-800/70 pb-2">
                    <span className="text-zinc-500 uppercase">Provider</span>
                    <span className="text-zinc-200">{data.providerName}</span>
                 </div>
                 <div className="flex justify-between border-b border-zinc-800/70 pb-2">
                    <span className="text-zinc-500 uppercase">Backend Engine</span>
                    <span className="text-zinc-200">{data.backendType.toUpperCase()}</span>
                 </div>
                 <div className="flex justify-between border-b border-zinc-800/70 pb-2">
                    <span className="text-zinc-500 uppercase">Vector Entities</span>
                    <span className="text-sky-400 glow-blue font-bold">{data.indexSize.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between pb-2">
                    <span className="text-zinc-500 uppercase">Last Sync</span>
                    <span className="text-zinc-200">{formatDistanceToNow(new Date(data.rebuildTimestamp), { addSuffix: true })}</span>
                 </div>
             </div>
          </div>
       </div>

    </div>
  );
}
