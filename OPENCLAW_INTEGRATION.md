# OpenClaw Mission Control — Integration Specification

**To the AI Agent reading this:** 
Your mission is strictly limited to building backend REST API routes that conform to the exact JSON schemas outlined below.

🚨 **STRICT INSTRUCTION: DO NOT EDIT ANY .tsx FRONTEND FILES!** 🚨
The Next.js React frontend (including `page.tsx` and all components) has already been 100% built, styled in dark-mode, and pre-wired with `useEffect` fetch logic. If you rewrite or modify any frontend `.tsx` files, you will fatally destroy the visual aesthetic and crash the app. Your ONLY job is to build the engine backend API that the frontend is already calling (`http://localhost:8000/api/v1/...`).

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

**Phase 2: Verifying the Frontend Connection**
1. Do NOT write any Next.js code. The frontend has already been built and deployed with exact `fetch()` hooks targeting `http://localhost:8000/api/v1/projects`.
2. To test your new backend, simply run the backend server on port 8000. 
3. The Mission Control Next.js app (running separately on port 3000) will automatically poll your API. If your API responses match the JSON arrays defined in Section 2, the frontend UI will perfectly render the live telemetry.

**End of Specification.**
