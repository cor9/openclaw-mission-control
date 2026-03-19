"use client";

import { useEffect, useState } from 'react';
import { Banknote, TrendingUp, DollarSign } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

type CostData = {
  todaySpend: number;
  yesterdaySpend: number;
  trend7Day: { day: string; cost: number }[];
  spendByProvider: { name: string; value: number }[];
  spendByModel: { name: string; value: number }[];
  localVsPaidPercent: { local: number; paid: number };
  mostExpensiveAgent: string;
  largestSingleCall: number;
};

export default function CostPanel() {
  const [data, setData] = useState<CostData | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/cost/summary', {
       headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISSION_CONTROL_TOKEN || 'MISSION_CONTROL_TOKEN'}` }
    })
      .then(r => r.json())
      .then(d => { if (mounted) setData(d) });
    return () => { mounted = false; };
  }, []);

  if (!data) return <div className="p-10 text-center font-mono opacity-50 uppercase tracking-widest">Loading burn metrics...</div>;

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold tracking-tight mb-1 font-mono uppercase">Cost & Burn Analytics</h1>
           <p className="text-zinc-400 font-mono text-sm tracking-wide">LLM API Expenditure Overview</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
             <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1">Today&apos;s Spend</p>
             <h2 className="text-3xl font-bold text-white font-mono flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-emerald-500 glow-green" />
                {data.todaySpend.toFixed(2)}
             </h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
             <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1">Yesterday&apos;s Spend</p>
             <h2 className="text-3xl font-bold text-zinc-300 font-mono">${data.yesterdaySpend.toFixed(2)}</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
             <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1">Most Expensive Agent</p>
             <h2 className="text-lg font-bold text-white font-mono uppercase truncate mt-2">{data.mostExpensiveAgent}</h2>
          </div>
           <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
             <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1">Largest Call</p>
             <h2 className="text-3xl font-bold text-red-400 font-mono mt-2">${data.largestSingleCall.toFixed(2)}</h2>
          </div>
       </div>

       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl">
             <h3 className="font-mono uppercase text-zinc-400 mb-6 flex items-center gap-2 text-sm tracking-widest">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                7-Day Burn Trend
             </h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={data.trend7Day}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="day" stroke="#52525b" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                      <YAxis stroke="#52525b" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} tick={{ fontSize: 12, fill: '#71717a' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', fontFamily: 'monospace' }} />
                      <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#34d399' }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl flex flex-col justify-between">
             <h3 className="font-mono uppercase text-zinc-400 mb-6 flex items-center gap-2 text-sm tracking-widest border-b border-zinc-800 pb-2">
                <Banknote className="w-4 h-4 text-blue-500" />
                Execution Breakdown
             </h3>

             <div className="space-y-4 flex-1">
                 <div>
                    <div className="flex justify-between font-mono text-sm mb-1 uppercase tracking-wider text-zinc-300">
                       <span>Local Engine</span>
                       <span className="text-blue-500 glow-blue">{data.localVsPaidPercent.local}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5">
                       <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${data.localVsPaidPercent.local}%` }}></div>
                    </div>
                 </div>
                 
                 <div>
                    <div className="flex justify-between font-mono text-sm mb-1 uppercase tracking-wider text-zinc-300">
                       <span>Cloud APIs</span>
                       <span className="text-amber-500">{data.localVsPaidPercent.paid}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5">
                       <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${data.localVsPaidPercent.paid}%` }}></div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-zinc-800 grid gap-3">
                    <p className="text-xs uppercase font-mono tracking-widest text-zinc-500">Spend By Provider</p>
                    {data.spendByProvider.map((p) => (
                       <div key={p.name} className="flex justify-between border-b border-zinc-800/50 pb-2 font-mono text-sm">
                          <span className="text-zinc-300">{p.name}</span>
                          <span className="text-zinc-400">${p.value.toFixed(2)}</span>
                       </div>
                    ))}
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
}
