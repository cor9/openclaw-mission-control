"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Bot, Cloud, HardDrive, Clock, Activity, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Agent = {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'waiting' | 'error';
  lastModel: string;
  location: 'local' | 'cloud';
  lastRun: string;
  lastError: string | null;
  pendingJobs: number;
  heartbeat: string;
};

export default function AgentGridPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch('/api/agents/status', {
           headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISSION_CONTROL_TOKEN || 'MISSION_CONTROL_TOKEN'}` }
        });
        if (!res.ok) throw new Error('Failed to fetch agents');
        const data = await res.json();
        setAgents(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchAgents();
    const interval = setInterval(fetchAgents, 5000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-950/20 border border-red-900/50 rounded-lg backdrop-blur glow-red">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-mono text-zinc-100 uppercase tracking-widest">Gateway Unreachable</h2>
        <p className="text-zinc-400 mt-2 font-mono">Last Known State Frozen</p>
      </div>
    );
  }

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'idle': return 'bg-zinc-700 text-zinc-300 ring-zinc-700/50';
      case 'running': return 'bg-blue-500 text-white ring-blue-500 glow-blue animate-pulse';
      case 'waiting': return 'bg-yellow-500 text-zinc-900 ring-yellow-500 glow-yellow';
      case 'error': return 'bg-red-500 text-white ring-red-500 glow-red';
      default: return 'bg-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
         <h1 className="text-3xl font-bold tracking-tight mb-1 font-mono uppercase">System State Overview</h1>
         <p className="text-zinc-400 font-mono text-sm tracking-wide">Mission Control Read-Only Ops Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 backdrop-blur shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
            {/* Status indicator banner */}
            <div className={cn("absolute top-0 left-0 w-1 h-full", getStatusColor(agent.status).replace(/text-[^\s]+|ring-[^\s]+|animate-pulse/g, ''))} />
            
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-md">
                     <Bot className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 font-mono">{agent.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn("text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ring-1 ring-inset", getStatusColor(agent.status))}>
                        {agent.status}
                      </span>
                      {agent.location === 'local' ? (
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono uppercase bg-zinc-800 px-2 py-0.5 rounded-sm">
                           <HardDrive className="w-3 h-3" /> Local Node
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono uppercase bg-zinc-800 px-2 py-0.5 rounded-sm">
                           <Cloud className="w-3 h-3 text-sky-400" /> Cloud
                        </div>
                      )}
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
               <div className="space-y-1">
                 <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Current Model</p>
                 <p className="text-sm font-medium text-zinc-300 font-mono">{agent.lastModel}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Pending Jobs</p>
                 <p className="text-sm font-medium text-zinc-300 font-mono">{agent.pendingJobs}</p>
               </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/50 flex flex-col gap-2">
               {agent.lastError && (
                 <div className="flex items-start gap-2 text-xs text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50">
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span className="font-mono">{agent.lastError}</span>
                 </div>
               )}
               <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last Run: {formatDistanceToNow(new Date(agent.lastRun), { addSuffix: true })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    HB: {agent.heartbeat}
                  </span>
               </div>
            </div>
          </div>
        ))}
        {agents.length === 0 && !error && (
           <div className="col-span-full h-40 flex items-center justify-center font-mono text-zinc-500">
             Loading gateway cluster health...
           </div>
        )}
      </div>
    </div>
  );
}
