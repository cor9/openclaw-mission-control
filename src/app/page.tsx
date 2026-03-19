"use client";

import { cn } from '@/lib/utils';
import { Briefcase, AlertTriangle, Play, CalendarClock, DollarSign, Activity, ArrowUpRight, ArrowDownRight, ArrowRight, MessageSquareCode } from 'lucide-react';
import Link from 'next/link';

const PROJECTS = [
  { id: 'child-actor-101', name: 'Child Actor 101', jobs: 4, rev: 1250, revTrend: 'up', alerts: 0, lastEvent: 'Content Publisher', lastActivity: '12m ago', momentum: 'Exploding', needsFounder: false },
  { id: 'directory', name: 'Directory', jobs: 1, rev: 45, revTrend: 'flat', alerts: 1, alertSummary: 'Scraper failed on site 3', lastEvent: 'Scraper Routine', lastActivity: '1h ago', momentum: 'Growing', needsFounder: true },
  { id: 'prep101', name: 'Prep101', jobs: 12, rev: 4200, revTrend: 'up', alerts: 0, lastEvent: 'SEO Optimizer', lastActivity: '4m ago', momentum: 'Growing', needsFounder: true },
  { id: 'coaching', name: 'Coaching', jobs: 0, rev: 0, revTrend: 'down', alerts: 0, lastEvent: 'Outreach Pipeline', lastActivity: '2d ago', momentum: 'Stalled', needsFounder: false },
  { id: 'books', name: 'Books', jobs: 2, rev: 140, revTrend: 'flat', alerts: 0, lastEvent: 'Kindle Sync', lastActivity: '4h ago', momentum: 'Stable', needsFounder: false },
  { id: 'saas', name: 'SaaS', jobs: 8, rev: 950, revTrend: 'down', alerts: 2, alertSummary: 'Stripe webhook sync degraded', lastEvent: 'Onboarding Emailer', lastActivity: '10m ago', momentum: 'Stalled', needsFounder: true },
  { id: 'amazon-influencer', name: 'Amazon Influencer', jobs: 3, rev: 310, revTrend: 'up', alerts: 0, lastEvent: 'Promo Generator', lastActivity: '35m ago', momentum: 'Stable', needsFounder: false },
  { id: 'wearable-psa', name: 'Wearable PSA', jobs: 5, rev: 0, revTrend: 'flat', alerts: 1, alertSummary: 'Ad account connection lost', lastEvent: 'Campaign Manager', lastActivity: '1h ago', momentum: 'Growing', needsFounder: true },
];

export default function ProjectGridPage() {
  const getMomentumStyle = (momentum: string, alerts: number) => {
    // Alert severity color glow overrides general glow if there are alerts
    const glow = alerts > 0 ? 'shadow-[0_0_20px_rgba(239,68,68,0.25)] border-rose-500/30' : 
                 momentum === 'Exploding' ? 'shadow-[0_0_15px_rgba(139,92,246,0.15)] border-zinc-800/80' : 
                 momentum === 'Growing' ? 'shadow-[0_0_15px_rgba(16,185,129,0.1)] border-zinc-800/80' : 
                 momentum === 'Stable' ? 'shadow-[0_0_15px_rgba(14,165,233,0.05)] border-zinc-800/80' : 
                 'shadow-[0_0_15px_rgba(244,63,94,0.1)] border-zinc-800/80';

    switch (momentum) {
      case 'Exploding': return { color: 'text-violet-400', bg: 'bg-violet-500', glow, icon: '🚀' };
      case 'Growing': return { color: 'text-emerald-400', bg: 'bg-emerald-500', glow, icon: '🔥' };
      case 'Stable': return { color: 'text-sky-400', bg: 'bg-sky-500', glow, icon: '🌊' };
      case 'Stalled': return { color: 'text-rose-400', bg: 'bg-rose-500', glow, icon: '🧊' };
      default: return { color: 'text-zinc-400', bg: 'bg-zinc-500', glow, icon: '•' };
    }
  };

  const renderTrend = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />;
    if (trend === 'down') return <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />;
    return <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
         <h1 className="text-3xl font-bold tracking-tight mb-1 font-mono uppercase text-white drop-shadow-md">Global Operations</h1>
         <p className="text-zinc-500 font-mono text-sm tracking-wide">Read-first observer dashboard. Open chat to command.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PROJECTS.map((proj) => {
          const mTheme = getMomentumStyle(proj.momentum, proj.alerts);
          return (
          <Link href={`/projects/${proj.id}`} key={proj.id} className="group block">
            <div className={cn("bg-zinc-900/60 border rounded-xl p-5 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-zinc-500", mTheme.glow)}>
              
              {/* Animated top border line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-zinc-800/80 rounded-lg group-hover:bg-zinc-700/80 transition-colors">
                       <Briefcase className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100 font-mono text-lg">{proj.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        <span className={cn("text-xs font-mono uppercase tracking-widest font-bold", mTheme.color)}>
                          {mTheme.icon} {proj.momentum}
                        </span>
                        {proj.needsFounder && (
                           <span className="text-[9px] bg-rose-500/20 text-rose-400 uppercase tracking-widest font-bold px-1.5 py-0.5 rounded border border-rose-500/30">
                             Needs Founder
                           </span>
                        )}
                      </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-zinc-950/40 rounded-lg p-3 border border-zinc-800/50">
                 <div className="space-y-1.5 flex flex-col">
                   <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
                     <Activity className="w-3 h-3 text-emerald-400" /> Active
                   </p>
                   <p className="text-lg font-bold text-zinc-200">{proj.jobs}</p>
                 </div>
                 <div className="space-y-1.5 flex flex-col">
                   <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
                     <DollarSign className="w-3 h-3 text-emerald-500" /> Rev Today
                   </p>
                   <div className="flex items-center gap-1">
                      <p className="text-lg font-bold text-emerald-400">${proj.rev.toLocaleString()}</p>
                      {renderTrend(proj.revTrend)}
                   </div>
                 </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                 {proj.alerts > 0 && proj.alertSummary ? (
                   <div className="flex flex-col gap-2 bg-rose-950/20 p-2.5 rounded-md border border-rose-900/30">
                     <div className="flex items-start gap-2 text-xs text-rose-400">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span className="font-mono font-medium leading-tight">{proj.alertSummary}</span>
                     </div>
                     <button className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white bg-zinc-900/80 w-fit px-2 py-1 rounded border border-zinc-700/50 transition-colors">
                        <MessageSquareCode className="w-3 h-3" /> Jump to Chat
                     </button>
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 text-xs text-zinc-500 px-2.5 py-1">
                      <AlertTriangle className="w-3.5 h-3.5 opacity-50" />
                      <span className="font-mono">No active alerts</span>
                   </div>
                 )}
                 
                 <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono px-1">
                    <span className="truncate">Last Activity: {proj.lastActivity}</span>
                 </div>
              </div>

            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
