import { NextResponse } from 'next/server';

export async function GET() {
  const mockHealthInfo = {
    status: 'degraded', // healthy | degraded | down
    providerName: 'text-embedding-3-small',
    lastSuccess: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    lastFailureMessage: 'Vector search timeout > 1000ms. Retrying.',
    indexSize: 124503,
    rebuildTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    backendType: 'qmd', // builtin / qmd / pgvector
  };

  return NextResponse.json(mockHealthInfo);
}
