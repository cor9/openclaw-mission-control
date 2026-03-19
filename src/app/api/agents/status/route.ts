import { NextResponse } from 'next/server';

export async function GET() {
  const mockAgents = [
    {
      id: 'agent-1',
      name: 'Alpha Router',
      status: 'idle',
      lastModel: 'gpt-4o',
      location: 'local',
      lastRun: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      lastError: null,
      pendingJobs: 0,
      heartbeat: '1000ms ago'
    },
    {
      id: 'agent-2',
      name: 'Data Ingestor',
      status: 'running',
      lastModel: 'claude-3-opus',
      location: 'cloud',
      lastRun: new Date().toISOString(),
      lastError: null,
      pendingJobs: 12,
      heartbeat: '200ms ago'
    },
    {
      id: 'agent-3',
      name: 'Web Scraper Worker',
      status: 'error',
      lastModel: 'gpt-3.5-turbo',
      location: 'cloud',
      lastRun: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      lastError: 'HTTP 429 Too Many Requests on Target API',
      pendingJobs: 3,
      heartbeat: '5m ago'
    },
    {
      id: 'agent-4',
      name: 'Summary Engine',
      status: 'waiting',
      lastModel: 'llama-3-70b-instruct',
      location: 'local',
      lastRun: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      lastError: null,
      pendingJobs: 4,
      heartbeat: '50ms ago'
    },
    {
      id: 'agent-5',
      name: 'Memory Indexer',
      status: 'idle',
      lastModel: 'text-embedding-3-small',
      location: 'cloud',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      lastError: null,
      pendingJobs: 0,
      heartbeat: '30s ago'
    }
  ];

  return NextResponse.json(mockAgents);
}
