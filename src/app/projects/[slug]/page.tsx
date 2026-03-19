"use client";

import { use } from 'react';
import Link from 'next/link';
import { 
  Zap, AlertTriangle, Target, Activity, Bot, TrendingUp, DollarSign, 
  Lightbulb, FileText, CheckCircle2, XCircle, Clock, ChevronRight, BarChart3, Users, MessageSquareCode,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProjectCommandScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const projectName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* TOP BAR */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
           <Link href="/" className="text-zinc-500 hover:text-zinc-300 font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-1 transition-colors">
             <ChevronRight className="w-3 h-3 rotate-180" /> Back to Global Projects
           </Link>
           <h1 className="text-3xl lg:text-4xl font-bold tracking-tight font-mono uppercase text-white flex flex-wrap items-center gap-4">
              {projectName}
              <span className="flex items-center gap-1.5 text-sm bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded ring-1 ring-inset ring-emerald-500/20 tracking-widest font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                🔥 GROWING
              </span>
           </h1>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 xl:mt-0">
           <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-lg px-5 py-3 flex flex-col items-end min-w-[160px]">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Revenue Today</p>
              <div className="flex items-center gap-1.5">
                 <p className="text-2xl font-bold text-emerald-400 font-mono drop-shadow-md">$4,200</p>
                 <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
           </div>
           <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-lg px-5 py-3 flex flex-col items-end min-w-[200px]">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-sky-400" /> Goal Progress</p>
              <div className="flex items-center gap-4 w-full justify-end mt-1">
                 <span className="text-xl font-bold text-sky-400 font-mono">35%</span>
                 <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 w-[35%] shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* left col: Outcomes & Action Queue */}
          <div className="lg:col-span-2 space-y-6">
             {/* ROW 1 — STRATEGIC PANEL */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               {/* dominant Outcomes */}
               <div className="bg-indigo-950/20 border-2 border-indigo-900/40 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Target className="w-24 h-24 text-indigo-400" />
                  </div>
                  <h2 className="flex items-center gap-2 text-sm font-bold font-mono uppercase tracking-widest text-indigo-400 mb-5 relative z-10">
                     <Target className="w-4 h-4" /> Strategic Outcomes
                  </h2>
                  <div className="space-y-4 relative z-10">
                     <div className="bg-indigo-950/40 border border-indigo-500/20 p-4 rounded-lg">
                       <p className="text-[10px] text-indigo-300 font-mono uppercase tracking-widest mb-1">Primary Target</p>
                       <p className="text-lg font-bold text-zinc-100">Launch V2 Subscription Funnel</p>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                       <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-lg">
                         <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Secondary</p>
                         <p className="text-sm font-medium text-zinc-300">Automate Affiliate Payouts</p>
                       </div>
                       <div className="bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-lg opacity-80">
                         <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Tertiary</p>
                         <p className="text-sm font-medium text-zinc-400">Refresh welcome email</p>
                       </div>
                     </div>
                  </div>
               </div>
               
               {/* Bottlenecks */}
               <div className="bg-rose-950/10 border-2 border-rose-900/30 rounded-xl p-6 shadow-lg flex flex-col">
                  <h2 className="flex items-center gap-2 text-sm font-bold font-mono uppercase tracking-widest text-rose-500 mb-5">
                     <AlertTriangle className="w-4 h-4" /> Critical Bottlenecks
                  </h2>
                  <div className="space-y-3 flex-1">
                     <div className="flex items-start gap-3 bg-rose-950/40 p-3 rounded-lg border border-rose-900/40">
                       <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shadow-[0_0_8px_rgba(244,63,94,0.6)] shrink-0" />
                       <div className="space-y-2">
                          <span className="text-sm font-medium text-zinc-200">Conversion drop detected on Mobile (iOS)</span>
                          <button className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white bg-zinc-900/80 w-fit px-2.5 py-1.5 rounded border border-zinc-700/50 transition-colors">
                             <MessageSquareCode className="w-3.5 h-3.5" /> Jump to Chat Context
                          </button>
                       </div>
                     </div>
                     <div className="flex items-start gap-3 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80">
                       <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                       <span className="text-sm text-zinc-400">Guide backlog risk increasing</span>
                     </div>
                  </div>
               </div>
             </div>

             {/* FOUNDER ACTION QUEUE */}
             <div className="bg-zinc-900/40 border border-amber-900/30 rounded-xl shadow-lg overflow-hidden">
                <div className="p-5 border-b border-zinc-800/60 bg-amber-950/10 flex items-center justify-between">
                   <h2 className="flex items-center gap-2 text-sm font-bold font-mono uppercase tracking-widest text-amber-500 tracking-widest">
                      <Users className="w-4 h-4" /> Founder Action Required
                   </h2>
                   <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">3 PENDING</span>
                </div>
                <div className="divide-y divide-zinc-800/50">
                   {[
                     { desc: "Approve new pricing test variants" },
                     { desc: "Record 60s promo video for V2 funnel" },
                     { desc: "Confirm affiliate payout logic overrides" }
                   ].map((item, i) => (
                      <div key={i} className="p-4 hover:bg-zinc-800/30 transition-colors flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-3">
                           <div className="w-4 h-4 rounded border border-zinc-600 group-hover:border-amber-500 group-hover:bg-amber-500/20 transition-colors" />
                           <span className="text-zinc-200 font-medium">{item.desc}</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                      </div>
                   ))}
                </div>
             </div>

             {/* ROW 2 — ACTIVE MISSIONS */}
             <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl shadow-lg overflow-hidden">
                <div className="p-5 border-b border-zinc-800/60">
                   <h2 className="flex items-center gap-2 text-sm font-bold font-mono uppercase tracking-widest text-zinc-400">
                      <Zap className="w-4 h-4 text-emerald-400" /> Active Executions
                   </h2>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                      <thead className="text-[10px] text-zinc-500 font-mono uppercase bg-zinc-950/50">
                         <tr>
                            <th className="px-5 py-3 font-medium">Mission</th>
                            <th className="px-5 py-3 font-medium">Owner</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50">
                         <tr className="hover:bg-zinc-800/20 transition-colors">
                            <td className="px-5 py-3.5 font-medium text-zinc-200">Launch subscription funnel</td>
                            <td className="px-5 py-3.5"><span className="flex items-center gap-1.5 text-xs text-sky-400 bg-sky-950/30 px-2 py-1 rounded w-fit"><Bot className="w-3 h-3" /> Growth Agent</span></td>
                            <td className="px-5 py-3.5">
                              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                                <Activity className="w-3 h-3 animate-pulse" /> Running
                              </span>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>


          {/* right col: Systems, AI Fleet, Knowledge */}
          <div className="space-y-6">

             {/* ROW 5 — SYSTEM RECOMMENDATIONS */}
             <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-5 shadow-lg">
                <h2 className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 mb-4">
                   <Lightbulb className="w-4 h-4" /> AI COO Whispers
                </h2>
                <div className="space-y-3">
                   {[
                     { t: "Increase email urgency", i: "+$1,100 projected" },
                     { t: "Reduce guide token use", i: "saves $18/day" },
                     { t: "Add testimonial module", i: "+7% conversion" }
                   ].map((rec, i) => (
                     <button key={i} className="w-full text-left group bg-zinc-950/40 hover:bg-indigo-900/30 border border-zinc-800/80 hover:border-indigo-500/50 rounded-lg p-3.5 transition-all">
                        <p className="font-medium text-zinc-200 mb-1.5 text-sm">{rec.t}</p>
                        <div className="flex justify-between items-end">
                           <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold">{rec.i}</span>
                           <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 group-hover:text-indigo-300">Deploy →</span>
                        </div>
                     </button>
                   ))}
                </div>
             </div>

             {/* ROW 3 — AI AGENTS MINIMIZED */}
             <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 shadow-lg">
                <h2 className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-zinc-500 mb-4">
                   <Bot className="w-3.5 h-3.5 text-sky-400" /> Active Agents
                </h2>
                <div className="space-y-2">
                   {[
                     { name: "Guide Generator", status: "Running", q: 4 },
                     { name: "Prompt Optimizer", status: "Idle", q: 0 },
                     { name: "SEO Agent", status: "Running", q: 12 },
                   ].map((agent, i) => (
                      <div key={i} className="flex justify-between items-center text-sm p-2 rounded hover:bg-zinc-800/40">
                         <span className="text-zinc-300 font-medium">{agent.name}</span>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Q:{agent.q}</span>
                            <div className={cn("w-1.5 h-1.5 rounded-full", agent.status === 'Running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600')} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* KNOWLEDGE ATTACHED */}
             <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 shadow-lg">
                <h2 className="flex items-center justify-between text-xs font-bold font-mono uppercase tracking-widest text-zinc-500 mb-4">
                   <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-purple-400" /> Knowledge Vault</span>
                   <button className="text-zinc-400 hover:text-white">+</button>
                </h2>
                <div className="flex flex-wrap gap-2">
                   {["Prompt packs", "VSL Script.pdf", "Customer SOPs"].map((tag, i) => (
                     <span key={i} className="px-2.5 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded text-[10px] font-mono uppercase tracking-widest text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors">
                        {tag}
                     </span>
                   ))}
                </div>
             </div>

          </div>

      </div>

    </div>
  );
}
