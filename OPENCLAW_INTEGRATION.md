# OpenClaw Mission Control — Integration Specification

**To the AI Agent reading this:** 
Your mission is to replace the hardcoded frontend dummy data inside this Next.js 16 (App Router) project with live telemetry streams from the core OpenClaw engine.

## 1. High-Level Architecture
Mission Control operates exclusively as a "Read-First" telemetry dashboard (Frontend). The core OpenClaw execution engine (Backend) must expose an API gateway for Mission Control to poll. 
- **Current State:** The frontend files contain hardcoded `const` arrays mapping out the UI state.
- **Target State:** OpenClaw Engine exposes REST/WebSocket endpoints. The frontend fetches from these endpoints using standard React `useEffect` or React Server Components.

## 2. API Endpoints Required (To be built by the Engine)

The core OpenClaw engine must mount the following routes so Mission Control can read from them:

### A. Global Projects Telemetry (`GET /api/v1/projects`)
**Consuming Frontend File:** `src/app/page.tsx`
**Schema Expected:**
```json
[
  {
    "id": "prep101",
    "name": "Prep101",
    "jobs": 12,
    "rev": 4200,
    "revTrend": "up",      // "up" | "down" | "flat"
    "alerts": 1,
    "alertSummary": "Vector store latency",
    "lastEvent": "SEO Optimizer",
    "lastActivity": "4m ago",
    "momentum": "Growing", // "Exploding" | "Growing" | "Stable" | "Stalled"
    "needsFounder": true
  }
]
```

### B. Project-Specific Command Data (`GET /api/v1/projects/:slug/command`)
**Consuming Frontend File:** `src/app/projects/[slug]/page.tsx`
**Schema Expected:**
```json
{
  "projectInfo": { ... },     // Detailed project metadata
  "metrics": {                // For Row 4 Revenue Intelligence & Unit Economics
    "revenueToday": 4200,
    "goalProgressPercentage": 35,
    "historicalGraph": [30, 45, 25, 60, ...], 
    "conversionRate": "14.2%",
    "upsellTakeRate": "32.8%",
    "refundRisk": "Low (1.1%)",
    "costPerSale": "$18.40"
  },
  "strategy": {               // For Row 1 Strategic Panel
    "primaryOutcome": "Launch V2 Subscription Funnel",
    "bottlenecks": [
      { "id": 1, "severity": "critical", "message": "Conversion drop on iOS" }
    ]
  },
  "actionQueue": [            // For Row 1 FOUNDER ACTION REQUIRED
    "Approve new pricing test variants"
  ],
  "activeMissions": [         // For Row 2 Active Executions Table
    { "title": "Launch funnel", "owner": "Growth Agent", "status": "Running" }
  ],
  "dedicatedAgents": [        // For Row 3 Active Agents Grid
    { "name": "Guide Generator", "status": "Running", "queue": 4 }
  ],
  "cooRecommendations": [     // For Row 5 AI COO Whispers
    { "title": "Increase email urgency", "impact": "+$1,100 projected" }
  ],
  "liveFeed": [               // For Row 7 Live Activity Panel
    { "message": "New subscriber", "type": "user" }
  ]
}
```

## 3. Execution Plan for the AI Agent

**Phase 1: Build the Middleware API on OpenClaw**
1. Analyze your core OpenClaw python/node engine.
2. Build an API router (FastAPI, Express, etc.) exposing `/api/v1/projects` and `/api/v1/projects/{slug}/command`.
3. Map the live engine state, revenue DBs, and active agent statuses into the exact JSON JSON schemas defined above.

**Phase 2: Hydrate Mission Control (Frontend)**
1. Open `src/app/page.tsx` in Mission Control. Delete the hardcoded `const PROJECTS` mock. Write a `useEffect` fetch hook to hit `http://{OPENCLAW_ENGINE_IP}:8000/api/v1/projects`.
2. Open `src/app/projects/[slug]/page.tsx`. Delete the hardcoded markup in ROWs 1-7. Write a `useEffect` hook to fetch from `/api/v1/projects/{slug}/command` based on the router `params.slug`.
3. Add a `.env.local` to Mission Control defining `NEXT_PUBLIC_ENGINE_URL=http://localhost:8000` (or whichever port OpenClaw lives on) so the UI knows where the Gateway is.

**End of Specification.**
