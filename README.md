# UTILYZE - Utility Data Analytics Platform

A comprehensive platform for analyzing utility data, emergency response incidents, and gas leak mapping across San Antonio.

## Project Overview

UTILYZE provides data visualization and analytics tools for:
- Gas leak detection and mapping
- Emergency response incident analysis (SAPD + SAFD)
- Utility usage patterns and efficiency tracking
- Interactive dashboards and heatmaps

## Project Structure

```
UTILYZE/
├── apps/                    # Main applications
│   ├── GasLeakMaps/        # Gas leak visualization app (React + Vite)
│   ├── ai-chatbot/         # AI-powered utility analytics chatbot
│   └── utilyze-webapp/     # Main web application
├── data/                   # Data storage and processing
│   ├── raw/                # Raw data files (Gas Data, GBD data, etc.)
│   └── processed/          # Processed CSV files and datasets
├── docs/                   # Documentation and specifications
│   ├── dev-facing_playbook.txt # Development guidelines
│   ├── gas data sources    # Data source information
│   └── *.pdf              # Research documents and presentations
├── assets/                 # Static assets
│   └── images/            # Images and graphics
├── scripts/               # Utility and automation scripts
├── archive/               # Archived/legacy code and demos
├── .gitignore
└── README.md
```

## Quick Start

### Environment Setup

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd UTILYZE
   ```

2. **Setup all apps** (PowerShell):
   ```powershell
   .\scripts\setup-dev.ps1 -App all
   ```

3. **Setup individual apps**:
   ```bash
   # Gas Leak Maps
   cd apps/GasLeakMaps && npm install && npm run dev
   
   # AI Chatbot (requires database setup)
   cd apps/ai-chatbot && pnpm install && pnpm run db:migrate && pnpm run dev
   
   # UTILYZE Web App
   cd apps/utilyze-webapp && npm install && npm run dev
   ```

### Gas Leak Maps Features
- Interactive map with gas leak incidents
- Filter by Hour of Day (0-23)
- Filter by Day of Week (Mon-Sun)
- Filter by Month (Jan-Dec)
- Filter by Service Type and Agency
- Zoom controls and marker clustering
- Real-time incident counter

### AI Chatbot Features
Modern UI with Biome formatting
 AI-powered utility analytics
 SQLite database with Drizzle ORM
Playwright testing setup

## Tech Stack

### Gas Leak Maps
- **Frontend**: React 19, Vite, Tailwind CSS
- **Mapping**: Leaflet, React-Leaflet with clustering
- **Data Processing**: Papa Parse (CSV)
- **Features**: Hour filtering, multi-dimensional filtering

### AI Chatbot  
- **Framework**: Next.js 15 with Turbo
- **Database**: Drizzle ORM, SQLite
- **AI**: Integration ready for LLM APIs
- **UI**: Biome formatting, TypeScript

### UTILYZE Web App
- **Frontend**: React 18, Vite, TypeScript
- **UI Components**: Drag & drop, form handling
- **Styling**: Tailwind CSS, Geist fonts
- **Data Viz**: Chart libraries, number flow animations

## Data Pipeline

The project implements a unified incident schema for emergency response data:

### Schema Fields
- `incident_id` - Original agency incident number
- `agency` - SAPD | SAFD | ESD#
- `service` - police | fire | ems | fire+ems
- `call_code` - Original agency code/text
- `call_desc` - Human-readable description
- `priority` - Agency's priority level
- `ts_received` - Timestamp when call was received
- `ts_dispatch` - Timestamp when units were dispatched
- `addr_raw` - Original address as provided
- `block_100` - Normalized hundred-block string
- `lat`, `lon` - Geocoded coordinates
- `h3_res9` - H3 geospatial hash

### Data Sources

#### SAPD Pipeline
- Source: San Antonio Open Data Portal
- Frequency: Daily automated pulls
- Status: No request required

#### SAFD Pipeline  
 Source: Texas Public Information Act (PIA) request
 Frequency: Historical data via formal request
 Status: PIA submission required

## Features

### Filtering Options
 **Hour of Day**: 0-23 hour filtering
 **Day of Week**: Monday through Sunday
 **Month**: January through December
 **Service Type**: Police, Fire, EMS combinations
 **Agency**: SAPD, SAFD, Emergency Services Districts

### Map Controls
- Zoom controls (bottom-right positioning)
- Marker clustering for performance
- Color-coded incident severity
- Interactive popups with incident details

## Development Tasks

See `dev-facing_playbook.txt` for detailed implementation guidelines:

1. Define Unified Incident Schema
2. Implement SAPD Data Pipeline
3. Submit SAFD PIA Request
4. Build Interactive Map Interface
5. Add Hour/DoW/Month Filtering
6. Geocoding & H3 Implementation
7. Multi-agency Data Linking

## Getting Started with Development

1. Clone the repository
2. Choose your application directory (`apps/GasLeakMaps`, `apps/ai-chatbot`, etc.)
3. Navigate to the app: `cd apps/[app-name]`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`
6. Follow the playbook in `docs/` for data pipeline implementation

## Data Privacy

- All addresses normalized to 100-block format
- Geocoding limited to block/intersection centroids
- No parcel-level or exact address data stored
- Compliance with public records requirements

## Configuration

### Environment Variables
Each application has its own `.env.example` file:

```bash
# Root project settings
cp .env.example .env

# Gas Leak Maps
cp apps/GasLeakMaps/.env.example apps/GasLeakMaps/.env.local

# AI Chatbot
cp apps/ai-chatbot/.env.example apps/ai-chatbot/.env.local

# UTILYZE Web App  
cp apps/utilyze-webapp/.env.example apps/utilyze-webapp/.env.local
```

### Key Configuration Files
- `.env.example` - Global project environment variables
- `apps/*/package.json` - Application dependencies and scripts
- `apps/*/vite.config.js` - Build configuration (Vite apps)
- `apps/*/next.config.ts` - Next.js configuration (AI Chatbot)
- `apps/*/tailwind.config.js` - Styling configuration

## Documentation

- `docs/dev-facing_playbook.txt` - Complete implementation guide
 `docs/gas data sources` - Data source information
- Individual README files in each application directory (`apps/*/`)
- Research documents in `docs/` directory
- Inline code documentation

## Contributing

1. Follow the development playbook guidelines
2. Maintain data privacy standards
3. Test filtering functionality before commits
4. Update documentation for new features

## License

[Add your license information here]