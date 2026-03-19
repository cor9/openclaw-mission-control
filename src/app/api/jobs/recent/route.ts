import { NextResponse } from 'next/server';

export async function GET() {
  const jobs = Array.from({ length: 15 }).map((_, i) => {
    const statuses = ['success', 'failed', 'retrying', 'running'];
    const agents = ['Alpha Router', 'Data Ingestor', 'Web Scraper Worker', 'Summary Engine', 'Memory Indexer'];
    const models = ['gpt-4o', 'claude-3-opus', 'gpt-3.5-turbo', 'llama-3-70b-instruct', 'text-embedding-3-small'];
    const tiers = ['fast', 'smart', 'embedding', 'heavy'];
    
    return {
      id: `job-${1000 + i}`,
      timestamp: new Date(Date.now() - i * 1000 * 60 * Math.random() * 10).toISOString(),
      agent: agents[i % agents.length],
      taskType: i % 2 === 0 ? 'document_processing' : i % 3 === 0 ? 'web_scraping' : 'routing',
      model: models[i % models.length],
      routingTier: tiers[i % tiers.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      retryMarker: i % 5 === 0 ? 'escalated' : null,
    };
  });

  return NextResponse.json(jobs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
}
