"use client";
import Placeholder from '../placeholder';
import Link from 'next/link';
import { Settings, Activity, Database, DollarSign } from 'lucide-react';

export default function SystemOverviewPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-mono uppercase text-white">System Diagnostics</h1>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">Last resort technical dashboard.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        <Link href="/system/agents" className="bg-zinc-900/50 hover:bg-zinc-800/80 p-5 rounded-xl border border-zinc-800 transition-colors flex items-center gap-4">
           <Settings className="w-8 h-8 text-zinc-400" />
           <span className="font-mono text-zinc-300">Agent Status</span>
        </Link>
        <Link href="/system/jobs" className="bg-zinc-900/50 hover:bg-zinc-800/80 p-5 rounded-xl border border-zinc-800 transition-colors flex items-center gap-4">
           <Activity className="w-8 h-8 text-indigo-400" />
           <span className="font-mono text-zinc-300">Live Job Feed</span>
        </Link>
        <Link href="/system/cost" className="bg-zinc-900/50 hover:bg-zinc-800/80 p-5 rounded-xl border border-zinc-800 transition-colors flex items-center gap-4">
           <DollarSign className="w-8 h-8 text-emerald-400" />
           <span className="font-mono text-zinc-300">Cost Logs</span>
        </Link>
        <Link href="/system/memory" className="bg-zinc-900/50 hover:bg-zinc-800/80 p-5 rounded-xl border border-zinc-800 transition-colors flex items-center gap-4">
           <Database className="w-8 h-8 text-sky-400" />
           <span className="font-mono text-zinc-300">Memory Health</span>
        </Link>
      </div>
    </div>
  );
}
