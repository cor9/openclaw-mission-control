"use client";

import { AlertTriangle, Clock, Zap, Activity, Target } from 'lucide-react';
import Link from 'next/link';

export default function TodayCommandCenter() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-mono uppercase text-white">Today</h1>
          <p className="text-zinc-500 font-mono text-sm tracking-wide">Founder Control Center — What matters right now.</p>
        </div>
        <div className="text-right">
           <div className="text-sm font-mono text-zinc-400">Momentum Score</div>
           <div className="text-3xl font-bold text-emerald-400">94/100</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Urgent Alerts */}
        <div className="space-y-4">
           <h2 className="flex items-center gap-2 text-sm font-bold font-mono uppercase tracking-widest text-zinc-400">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Action Required
           </h2>
           <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 shadow-lg space-y-4">
              <div className="bg-rose-950/20 border border-rose-900/50 p-4 rounded-lg flex gap-3">
                 <div className="mt-0.5"><AlertTriangle className="w-5 h-5 text-rose-500" /></div>
                 <div>
                    <h3 className="text-white font-medium">Conversion slowdown detected</h3>
                    <p className="text-zinc-400 text-sm mt-1">Prep101 mobile conversions dropped 12% in the last 4 hours.</p>
                    <button className="mt-3 bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-md font-mono transition-colors">Deploy Analysis Mission →</button>
                 </div>
              </div>
              <div className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-lg flex gap-3">
                 <div className="mt-0.5"><Clock className="w-5 h-5 text-amber-500" /></div>
                 <div>
                    <h3 className="text-white font-medium">Stalled Mission (SaaS)</h3>
                    <p className="text-zinc-400 text-sm mt-1">Onboarding Emailer sequence has been waiting for human approval for 2 days.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
           <h2 className="flex items-center gap-2 text-sm font-bold font-mono uppercase tracking-widest text-zinc-400">
              <Zap className="w-4 h-4 text-indigo-400" /> AI Recommendations
           </h2>
           <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 shadow-lg space-y-3">
              {[
                { title: "Increase email urgency", impact: "+$1,100 projected", action: "Deploy Sequence" },
                { title: "Reduce guide token length", impact: "Saves $18/day", action: "Optimize Prompt" },
                { title: "Add testimonial module", impact: "+7% conversion", action: "Update Landing Page" }
              ].map((rec, i) => (
                <div key={i} className="flex flex-col gap-3 p-3 bg-zinc-950/40 rounded border border-zinc-800/50 hover:border-indigo-500/30 transition-colors">
                   <div className="flex justify-between items-start">
                     <p className="text-zinc-200 font-medium">{rec.title}</p>
                     <span className="text-xs font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded">{rec.impact}</span>
                   </div>
                   <div className="flex justify-end">
                     <button className="text-xs text-indigo-400 hover:text-indigo-300 font-mono uppercase tracking-widest">{rec.action} →</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
