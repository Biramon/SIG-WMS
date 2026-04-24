# SIG-WMS Frontend

Frontend application for the SIG-WMS (Warehouse Management System) built with React, TypeScript, and Vite.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## Prerequisites

- Node.js 18+ and npm

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.  
API requests to `/api/*` are proxied to `http://localhost:8080`.

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── pages/           # Page components (routes)
├── services/        # API services
├── types/           # TypeScript type definitions
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles (Tailwind)
```

## Environment Variables

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:8080
```

Available environment files:
- `.env` - Default
- `.env.development` - Development
- `.env.production` - Production

## Docker

A `Dockerfile` and `docker-compose.yaml` are provided for containerized deployment.

```bash
docker compose up
```