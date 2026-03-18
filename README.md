# NEXO CORE — Marketing Website

A production-ready, multi-page marketing website for NEXO CORE — a venture-backed startup creating workforce reintegration infrastructure for returned migrants in the construction and real estate sectors.

## Tech Stack

- **Framework:** Vite + React 18
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion v11
- **Routing:** React Router v6 (HashRouter for Firebase Hosting)
- **Forms:** React Hook Form + Zod validation
- **Form Backend:** Airtable REST API (via fetch)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (DM Serif Display, DM Sans, Space Mono)
- **SEO:** React Helmet Async
- **Deployment:** Firebase Hosting (static)
- **Analytics:** Google Analytics 4

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd nexo-core-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your environment variables in .env (see below)

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable | Description |
|----------|-------------|
| `VITE_AIRTABLE_BASE_ID` | Your Airtable Base ID (starts with `app...`) |
| `VITE_AIRTABLE_API_KEY` | Your Airtable Personal Access Token |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`) |

## Firebase Deployment

```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

> **Note:** You must have the Firebase CLI installed (`npm install -g firebase-tools`) and be logged in (`firebase login`).

## Airtable Setup

### WaitlistSignups Table

Create a table named `WaitlistSignups` in your Airtable base with the following fields:

| Field Name | Type |
|------------|------|
| Full Name | Single line text |
| Email | Email |
| Country | Single line text |
| Phone | Phone number |
| Role | Single select (worker, employer, partner, investor) |
| Consent | Checkbox |
| Source Page | Single line text |
| Submitted At | Single line text |
| Trade / Skill Area | Single line text |
| Years of Experience | Single line text |
| Country of Work | Single line text |
| Worker Note | Long text |
| Company Name | Single line text |
| Industry Type | Single line text |
| Hiring Interest | Single line text |
| Operations Country | Single line text |
| Organization Name | Single line text |
| Organization Type | Single line text |
| Partnership Interest | Long text |
| Firm Affiliation | Single line text |
| Interest Type | Single line text |
| Investor Message | Long text |

### ContactSubmissions Table

Create a table named `ContactSubmissions` with:

| Field Name | Type |
|------------|------|
| Name | Single line text |
| Email | Email |
| Subject | Single select (General, Partnership, Investment, Press, Other) |
| Message | Long text |
| Submitted At | Single line text |

## Updating Content

All copy is organized in component-level constants for easy localization:

- **Pages:** `src/pages/` — each page file contains its own copy constants
- **Layout:** `src/components/layout/` — Navbar and Footer
- **Shared UI:** `src/components/ui/` — Button, Badge, Card, SectionLabel, WaitlistForm, EcosystemDiagram
- **Airtable integration:** `src/lib/airtable.ts`
- **Global styles:** `src/index.css`

## License

© 2025 NEXO. All rights reserved.
