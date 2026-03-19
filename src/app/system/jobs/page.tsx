"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

type Job = {
  id: string;
  timestamp: string;
  agent: string;
  taskType: string;
  model: string;
  routingTier: string;
  status: 'success' | 'failed' | 'retrying' | 'running';
  retryMarker: string | null;
};

export default function JobsFeedPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    let mounted = true;
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs/recent', {
           headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISSION_CONTROL_TOKEN || 'MISSION_CONTROL_TOKEN'}` }
        });
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        if (mounted) setJobs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const agentsList = Array.from(new Set(jobs.map(j => j.agent)));
  const statusList = Array.from(new Set(jobs.map(j => j.status)));

  const filteredJobs = jobs.filter(j => 
    (filterAgent === 'all' || j.agent === filterAgent) &&
    (filterStatus === 'all' || j.status === filterStatus)
  );

  const StatusIcon = ({ status }: { status: Job['status'] }) => {
     switch (status) {
        case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500 glow-green" />;
        case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500 glow-red" />;
        case 'retrying': return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin glow-yellow" />;
        case 'running': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin glow-blue" />;
        default: return null;
     }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-5rem)] flex flex-col">
       <div>
           <h1 className="text-3xl font-bold tracking-tight mb-1 font-mono uppercase">Live Job Feed</h1>
           <p className="text-zinc-400 font-mono text-sm tracking-wide">Streaming Operational Logs</p>
       </div>

       <div className="flex bg-zinc-900 border border-zinc-800 p-3 rounded-md gap-4 shrink-0 shadow-lg">
          <select 
             value={filterAgent} 
             onChange={(e) => setFilterAgent(e.target.value)} 
             className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-mono tracking-widest uppercase"
          >
             <option value="all">ALL AGENTS</option>
             {agentsList.map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
          </select>

          <select 
             value={filterStatus} 
             onChange={(e) => setFilterStatus(e.target.value)} 
             className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-mono tracking-widest uppercase"
          >
             <option value="all">ALL SEVERITIES</option>
             {statusList.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
          </select>
       </div>

       <div className="flex-1 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900/40 shadow-xl backdrop-blur">
          <table className="w-full text-sm text-left text-zinc-400 font-mono tracking-wide">
             <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50 sticky top-0 z-10 border-b border-zinc-800">
                <tr>
                   <th className="px-6 py-4">Timestamp</th>
                   <th className="px-6 py-4">Agent</th>
                   <th className="px-6 py-4">Task</th>
                   <th className="px-6 py-4">Model & Tier</th>
                   <th className="px-6 py-4">Status</th>
                </tr>
             </thead>
             <tbody>
                {filteredJobs.map(job => (
                   <tr key={job.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap">{format(new Date(job.timestamp), 'HH:mm:ss.SSS')}</td>
                      <td className="px-6 py-3 font-bold text-zinc-300">{job.agent}</td>
                      <td className="px-6 py-3">{job.taskType}</td>
                      <td className="px-6 py-3">
                         <div className="flex gap-2 items-center">
                            <span className="text-zinc-300">{job.model}</span>
                            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">{job.routingTier}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap flex items-center gap-3">
                         <div className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-bold">
                            <StatusIcon status={job.status} /> 
                            {job.status}
                         </div>
                         {job.retryMarker && (
                            <span className="px-1.5 py-0.5 rounded bg-red-950 text-[9px] text-red-500 border border-red-900 glow-red">
                                {job.retryMarker}
                            </span>
                         )}
                      </td>
                   </tr>
                ))}
                {filteredJobs.length === 0 && (
                   <tr>
                      <td colSpan={5} className="text-center py-10 uppercase text-zinc-600">No jobs visible or gateway silent</td>
                   </tr>
                )}
             </tbody>
          </table>
       </div>
    </div>
  );
}
