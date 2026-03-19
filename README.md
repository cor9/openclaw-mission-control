# OpenClaw Mission Control

A read-only observer interface (operational dashboard) for the OpenClaw multi-agent AI framework. 

**Mission Control** is purely an observer. If it crashes or goes offline, the core OpenClaw engine running on the local node will not be affected. It relies on lightweight API routes (simulated in this repo) to poll data from the gateway.

## Environment Variables

Copy the `.env.example` to `.env` or set it in your environment:

```env
MISSION_CONTROL_TOKEN=your_secure_random_token_here
```

To access the UI via the browser (since there is no login form), you can initially visit:
`http://localhost:3000/?auth=your_secure_random_token_here`
The middleware will set a secure cookie allowing you subsequent access.

## Running Locally via Node

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000/?auth=MISSION_CONTROL_TOKEN` (Use "MISSION_CONTROL_TOKEN" if no env variable is set).

## Deployment

The app uses standard Next.js (App Router) and can be deployed anywhere Node.js or Docker is supported.

### VPS Deployment via Docker
A lean multi-stage `Dockerfile` is included. It leverages Next.js standalone output mode.

1. First, enable standalone mode in `next.config.ts`:
```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
};

export default config;
```

2. Build the Docker image:
```bash
docker build -t openclaw-mission-control .
```

3. Run the container:
```bash
docker run -p 3000:3000 -e MISSION_CONTROL_TOKEN=super_secret_token_123 openclaw-mission-control
```

If deploying behind a reverse proxy (e.g., Nginx, Traefik), route traffic to port `3000`.
