import { NextResponse } from 'next/server';

export async function GET() {
  const mockCostData = {
    todaySpend: 14.50,
    yesterdaySpend: 22.10,
    trend7Day: [
      { day: 'Mon', cost: 12.0 },
      { day: 'Tue', cost: 15.5 },
      { day: 'Wed', cost: 22.1 },
      { day: 'Thu', cost: 18.0 },
      { day: 'Fri', cost: 26.5 },
      { day: 'Sat', cost: 30.1 },
      { day: 'Sun', cost: 14.5 },
    ],
    spendByProvider: [
      { name: 'OpenAI', value: 45.2 },
      { name: 'Anthropic', value: 30.8 },
      { name: 'Local/Meta', value: 0 }
    ],
    spendByModel: [
      { name: 'gpt-4o', value: 35.0 },
      { name: 'claude-3-opus', value: 30.8 },
      { name: 'gpt-3.5-turbo', value: 10.2 }
    ],
    localVsPaidPercent: { local: 65, paid: 35 },
    mostExpensiveAgent: 'Data Ingestor',
    largestSingleCall: 1.25, // cost in dollars
  };

  return NextResponse.json(mockCostData);
}
