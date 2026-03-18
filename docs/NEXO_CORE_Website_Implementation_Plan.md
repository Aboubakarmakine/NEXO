# NEXO CORE — MVP Website Implementation Plan
## Version 1.0 | Build-Ready Specification for AI-Assisted Development

---

## 0. PREAMBLE FOR THE AI BUILDER

You are building a **complete, production-ready, multi-page marketing website** for NEXO CORE — a venture-backed startup creating workforce reintegration infrastructure for returned migrants in the construction and real estate sectors.

This document is the **single source of truth**. Build everything described here. Do not summarize, scaffold, or leave TODOs. Every section, every component, every line of copy, and every interaction described below must be **fully implemented** before the project is considered done.

---

## 1. PROJECT OVERVIEW

**What NEXO is:** A platform helping returned migrants reconnect to formal economic opportunity — starting with worker visibility, employer discovery, and trust infrastructure in construction and real estate.

**What NEXO CORE is:** The first operational layer of the broader NEXO ecosystem — the MVP entry point that makes workers visible and connects them to opportunity.

**What this website is:** A strategic marketing and credibility asset — NOT the product itself. It introduces the mission, builds trust across four audience types, and converts visitors into segmented waitlist signups.

**Primary Conversion Goal:** Waitlist enrollment  
**Secondary Goal:** Credibility for meetings, pilots, partnerships, and early investor conversations

---

## 2. TECH STACK (FIREBASE-COMPATIBLE)

```
Framework:        Vite + React 18
Language:         TypeScript (strict mode)
Styling:          Tailwind CSS v3 (utility-first, no arbitrary values)
Animation:        Framer Motion v11
Routing:          React Router v6 (HashRouter for Firebase static hosting)
Form Handling:    React Hook Form + Zod validation
Form Backend:     Airtable REST API (via fetch, no SDK)
Icons:            Lucide React
Fonts:            Google Fonts (loaded via @import in CSS)
  - Display/Hero: "DM Serif Display" (headings, hero, statements)
  - Body:         "DM Sans" (body copy, navigation, UI elements)
  - Accent:       "Space Mono" (labels, tags, technical text)
Build Tool:       Vite (vite.config.ts configured for SPA)
Deployment:       Firebase Hosting (firebase.json + .firebaserc configured)
Analytics:        Google Analytics 4 (gtag via index.html script tag — placeholder GA_MEASUREMENT_ID)
SEO:              React Helmet Async (unique meta per page)
```

**Why this stack:**
- Vite builds a pure static site → perfect for Firebase Hosting (no server needed)
- React Router HashRouter avoids Firebase rewrite complexity
- Tailwind + Framer Motion = fast build, polished motion, small bundle
- Airtable as CRM captures segmented waitlist data in structured spreadsheet format

---

## 3. BRAND & DESIGN SYSTEM

### 3.1 Color Palette

```css
/* Primary Brand Colors */
--nexo-navy:       #0D1B2A   /* Deep navy — primary text, headers */
--nexo-teal:       #1A6B72   /* Core brand teal — primary CTA, accents */
--nexo-teal-light: #2A9A96   /* Lighter teal — hover states, gradients */
--nexo-green:      #3AAB5C   /* Ecosystem green — CORE badge, success */
--nexo-green-dark: #1F7A3D   /* Dark green — INFRA module reference */

/* Neutral Palette */
--nexo-white:      #FFFFFF
--nexo-off-white:  #F7F8FA   /* Section backgrounds, alternating */
--nexo-light-gray: #E8ECF0   /* Borders, dividers */
--nexo-mid-gray:   #8C9BAD   /* Placeholder text, secondary labels */
--nexo-dark:       #0D1B2A   /* Same as navy — for body text */

/* Semantic Colors */
--nexo-amber:      #D4831A   /* MONEY module — gold/amber */
--nexo-purple:     #5B4FBE   /* CHAIN module — blue-purple */
--nexo-silver:     #9BA8B5   /* Disabled, future modules */

/* Gradients */
--gradient-hero:   linear-gradient(135deg, #0D1B2A 0%, #1A3A4A 50%, #0D3B30 100%)
--gradient-teal:   linear-gradient(120deg, #1A6B72, #2A9A96)
--gradient-core:   linear-gradient(135deg, #1A6B72 0%, #3AAB5C 100%)
```

### 3.2 Typography Scale

```css
/* Display — DM Serif Display */
.text-display-xl  { font: 700 72px/1.05 'DM Serif Display'; letter-spacing: -2px }
.text-display-lg  { font: 700 56px/1.1  'DM Serif Display'; letter-spacing: -1.5px }
.text-display-md  { font: 700 40px/1.15 'DM Serif Display'; letter-spacing: -1px }
.text-display-sm  { font: 700 32px/1.2  'DM Serif Display'; letter-spacing: -0.5px }

/* Body — DM Sans */
.text-body-xl     { font: 400 20px/1.7  'DM Sans' }
.text-body-lg     { font: 400 18px/1.65 'DM Sans' }
.text-body-md     { font: 400 16px/1.6  'DM Sans' }
.text-body-sm     { font: 400 14px/1.55 'DM Sans' }

/* Accent — Space Mono */
.text-label       { font: 500 11px/1 'Space Mono'; letter-spacing: 2.5px; text-transform: uppercase }
.text-tag         { font: 400 12px/1 'Space Mono'; letter-spacing: 1.5px }
```

### 3.3 Spacing System (8px base grid)
- xs: 8px | sm: 16px | md: 24px | lg: 32px | xl: 48px | 2xl: 64px | 3xl: 96px | 4xl: 128px

### 3.4 Component Tokens

```
Border radius:  
  - Buttons: 6px  
  - Cards: 12px  
  - Form inputs: 8px  
  - Chips/badges: 999px (pill)

Shadows:
  - Card: 0 4px 24px rgba(13,27,42,0.08)
  - Card hover: 0 12px 40px rgba(13,27,42,0.14)
  - Button: 0 4px 16px rgba(26,107,114,0.25)

Transitions: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)
```

### 3.5 Motion Principles (Framer Motion)

- **Page entrance:** Sections fade up with 40px Y offset, staggered at 0.08s between siblings
- **Hero:** 3-stage reveal — logo (0s) → headline (0.2s) → subhead (0.4s) → CTAs (0.6s) → trust bar (0.8s)
- **Scroll triggers:** `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- **Cards:** `whileHover={{ y: -6, boxShadow: "..." }}` with `transition={{ type: "spring", stiffness: 400 }}`
- **CTA buttons:** `whileHover={{ scale: 1.02 }}` `whileTap={{ scale: 0.98 }}`
- **No excessive animation.** Motion must feel intentional, not performative.

---

## 4. SITE ARCHITECTURE

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Router setup (HashRouter)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, mobile hamburger, CTA button
│   │   └── Footer.tsx          # Links, legal, social, newsletter note
│   └── ui/
│       ├── Button.tsx          # Primary, secondary, ghost variants
│       ├── Badge.tsx           # "NEXO CORE", "COMING SOON" labels
│       ├── Card.tsx            # Reusable content card
│       ├── SectionLabel.tsx    # Space Mono uppercase section labels
│       ├── EcosystemDiagram.tsx # SVG diagram — CORE center, others orbiting
│       └── WaitlistForm.tsx    # Full segmented waitlist form component
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── HowItWorks.tsx
│   ├── ForWorkers.tsx
│   ├── ForEmployers.tsx
│   ├── Vision.tsx
│   ├── Waitlist.tsx
│   ├── Contact.tsx
│   ├── PrivacyPolicy.tsx
│   └── TermsOfUse.tsx
├── hooks/
│   └── useScrollReveal.ts
├── lib/
│   └── airtable.ts             # Airtable API submission logic
├── assets/
│   ├── nexo-logo.svg           # Primary logo (teal+green variant)
│   └── nexo-core-logo.svg      # CORE lockup
└── index.css                   # Tailwind directives + CSS custom properties
```

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Navbar

**Behavior:**
- Fixed/sticky at top
- Background: transparent on hero, transitions to `rgba(13,27,42,0.96)` with `backdrop-filter: blur(16px)` after 60px scroll
- Scroll detection via `useEffect` + `window.scrollY`
- Height: 72px desktop / 64px mobile
- Logo left, nav links center, CTA button right
- Mobile: hamburger → full-height slide-down drawer with staggered link reveal

**Nav Links:**
`About` | `How It Works` | `For Workers` | `For Employers` | `Vision`

**CTA Button (right):** "Join Waitlist" → links to `/waitlist`

**Active state:** Teal underline (2px, 4px offset)

---

### 5.2 Footer

**Layout:** 4 columns (desktop), 2 columns (tablet), stacked (mobile)

**Columns:**
1. Logo + tagline: "Building the entry layer for workforce reintegration."
2. Platform: About, How It Works, Vision, Waitlist
3. For You: For Workers, For Employers, For Partners, Contact
4. Legal: Privacy Policy, Terms of Use + social icons (LinkedIn, Instagram placeholder)

**Bottom bar:** `© 2025 NEXO. All rights reserved.` | `Built with purpose.`

**Color:** Navy background (`#0D1B2A`), white text, mid-gray secondary

---

## 6. PAGE-BY-PAGE SPECIFICATIONS

---

### PAGE 1: HOME (`/`)

**Meta title:** `NEXO CORE | Workforce Reintegration Platform for Returned Migrants`  
**Meta description:** `NEXO CORE is the first layer of the NEXO ecosystem, helping returned migrants reconnect to opportunity in construction and real estate.`

---

#### SECTION A — HERO

**Background:** Dark gradient (`--gradient-hero`) with subtle animated mesh — implement as layered CSS radial gradients that slowly drift using `@keyframes` (15s cycle, translateX/Y ±20px, `animation-timing-function: ease-in-out`). Add a faint grid overlay pattern (SVG `<pattern>` as CSS background, 1px lines, 4% opacity white).

**Layout:** Full viewport height (`100vh`), centered content, two columns on desktop (text left 55%, visual right 45%), stacked on mobile.

**Left column:**
- **Section label** (Space Mono, teal, uppercase): `NEXO CORE · EARLY ACCESS`
- **Headline** (DM Serif Display, 72px desktop / 44px mobile, white):  
  `Rebuilding access to work for returned migrants.`
- **Subheadline** (DM Sans, 20px, 70% white opacity):  
  `NEXO CORE is the first layer of a new ecosystem — helping skilled returned workers become visible, trusted, and connected to opportunity in construction and real estate.`
- **CTA Group:**  
  - Primary: `Join the Waitlist` (teal gradient button, arrow icon right, links to `/waitlist`)  
  - Secondary: `See How It Works` (ghost/outline button, white border, links to `/how-it-works`)
- **Trust signals row** (below CTAs, separator line above):  
  `🔒 No credit card required · ✓ Early access notifications · 📍 Latin America & beyond`  
  (Small DM Sans 13px, 60% white opacity, inline with dot separators)

**Right column:**  
Animated SVG ecosystem diagram. NEXO CORE at center in a teal glowing circle. Four orbiting nodes: INFRA (green), CHAIN (purple), MONEY (amber), NEXO HQ (navy/white) — connected by subtle dashed lines with animated dash-offset (drawing effect). CORE node pulses gently (scale 1 → 1.04 → 1, 3s loop). Orbiting nodes slowly rotate (full rotation 30s). Entire diagram renders in SVG with Framer Motion `animate` props.

**Mobile:** Diagram moves below text, scales to 320px width.

---

#### SECTION B — PROBLEM

**Background:** White  
**Section label:** `THE PROBLEM`  
**Headline** (DM Serif Display, 48px): `Too much skill. Too little access.`  
**Subheadline** (DM Sans, 18px, navy 70%):  
`Thousands of returned migrants come back with experience, work ethic, and practical ability — but without a trusted system that reconnects them to formal opportunity.`

**Three-column stat/icon grid** (each card: icon top, bold number, label, description):

| Icon | Stat | Label | Description |
|------|------|-------|-------------|
| 👁️ EyeOff (Lucide) | **Invisible** | Without visibility | Workers with real skills remain undiscoverable to formal employers. |
| 🔗 LinkOff (Lucide) | **Disconnected** | Without trust signals | No verified credentials = no pathway into structured, formal work. |
| 📉 TrendingDown (Lucide) | **Underutilized** | Without access | Talent is wasted. Economies lose. People lose. |

**Below grid:** CTA link text — `Learn About NEXO CORE →` (teal, links to `/how-it-works`)

---

#### SECTION C — SOLUTION

**Background:** `#F7F8FA` (off-white)  
**Section label:** `THE SOLUTION`  
**Headline** (DM Serif Display, 48px): `A more trusted entry point into opportunity.`  
**Subheadline** (DM Sans, 18px):  
`NEXO CORE is designed to help workers become visible, help employers discover emerging talent, and create the foundation for long-term workforce reintegration.`

**Horizontal flow diagram** (4 steps with connecting arrows):

```
[ Worker ] ──→ [ Profile & Visibility ] ──→ [ Opportunity Access ] ──→ [ Growth & Credentialing ]
```

Each step: numbered circle (teal), bold label, 2-line description. Arrows are SVG with animated dash-offset on scroll enter.

**CTA:** `Join Early Access` (primary teal button, center-aligned)

---

#### SECTION D — WHY CORE

**Background:** White  
**Section label:** `WHY START WITH CORE`  
**Headline** (DM Serif Display, 40px): `Reintegration starts with visibility, structure, and trust.`

**Two-column layout:**
- Left: explanation text (3 short paragraphs, DM Sans 17px)  
  Para 1: NEXO CORE solves the first problem — being seen.  
  Para 2: Without a trusted digital layer, no matching, no credentialing, no economic access is possible.  
  Para 3: That's why CORE is the foundation. Everything else builds on it.
- Right: Stacked module cards (visual hierarchy):
  - `NEXO CORE` — large, teal gradient, glowing shadow — "Active · MVP focus"
  - `NEXO INFRA` — smaller, green muted — "Coming soon"
  - `NEXO CHAIN` — smaller, purple muted — "Coming soon"
  - `NEXO MONEY` — smaller, amber muted — "Coming soon"

Each card: module name (bold), one-line description, status badge.

---

#### SECTION E — AUDIENCE BENEFITS

**Background:** Navy (`#0D1B2A`)  
**Section label** (teal): `BUILT FOR THE ECOSYSTEM`  
**Headline** (DM Serif Display, white): `Value from day one — for everyone who matters.`

**Three cards** (teal-bordered, dark card background `#1A2E3D`):

| For Workers | For Employers | For Partners |
|------------|--------------|--------------|
| A pathway to visibility and future opportunity | Developing access to structured, emerging talent | Scalable infrastructure for reintegration impact |
| Your skills are real. NEXO helps the world see them. | Reduce hiring uncertainty. Join the ecosystem early. | Build with us. Refer. Collaborate. Scale. |
| `Join as a Worker →` | `Join as an Employer →` | `Partner with NEXO →` |

Each card links to the appropriate audience page.

---

#### SECTION F — TRUST / VISION TEASER

**Background:** Off-white  
**Section label:** `EARLY STAGE. LARGER VISION.`  
**Headline** (DM Serif Display, 40px): `A focused MVP with a longer view.`  
**Body text** (2 paragraphs, DM Sans 17px):  
Para 1: NEXO is starting where it matters most — with the first layer of trust, visibility, and access.  
Para 2: NEXO CORE is not the entire promise. It is the right starting point. The broader platform — INFRA, CHAIN, MONEY — is on the roadmap. But first: get CORE right.

**CTA:** `Explore the Vision →` (teal text link, arrow, links to `/vision`)

---

#### SECTION G — WAITLIST CTA

**Background:** Teal gradient (`--gradient-core`)  
**Headline** (DM Serif Display, 48px, white): `Get early access to NEXO.`  
**Subheadline** (DM Sans, 18px, white 85%):  
`Join the waitlist and tell us how you want to be part of the ecosystem.`  
**CTA Button:** `Sign Up Now` (white button, teal text)  
**Privacy note** (small, white 65%): `Your data is private. No spam. Ever.`

---

### PAGE 2: ABOUT (`/about`)

**Meta title:** `About NEXO | Workforce Reintegration Infrastructure`

**Sections:**
1. **Hero** — Dark navy background. Headline: `We're building the infrastructure that reintegration has always needed.` Subhead: Company origin story in 2–3 sentences. The why, not the what.
2. **Mission + Vision** — Two-column layout. Left: Mission statement card (teal border). Right: Vision statement card (green border). Both use DM Serif Display for the statement itself.
3. **Why Construction + Real Estate** — Explain sector choice in 3 short paragraphs. Use icons: BuildingIcon, HardHatIcon (Lucide or custom SVG).
4. **Why Reintegration Infrastructure Matters** — 3-column icon grid with economic, social, and structural arguments.
5. **The Team / Founders** — Placeholder cards with gray avatar circles (80px), [Founder Name], [Title], [2-line bio placeholder]. Note: "Founder photos and bios to be added before launch."
6. **CTA** — Full-width teal band: `Join the Waitlist` button.

---

### PAGE 3: HOW IT WORKS (`/how-it-works`)

**Meta title:** `How NEXO CORE Works | Workforce Reintegration Platform`

**Sections:**
1. **Page Hero** — Medium height. Section label: `HOW IT WORKS`. Headline: `A simple first layer designed to reconnect talent to opportunity.`
2. **Current Phase — 4-Step Process** (numbered vertical cards on mobile, horizontal on desktop):
   - Step 1: `Join the Waitlist` — Tell us who you are and how you want to engage.
   - Step 2: `Select Your Role` — Worker, employer, partner, or advisor. We design for each.
   - Step 3: `Share Your Background` — What you bring to the ecosystem. Where you've been. What you're looking for.
   - Step 4: `Get Access Updates` — As early pilot phases open, you'll be first in line.
3. **Coming Next** — Muted card row labeled "FUTURE PHASES":
   - Worker profile creation and skill documentation
   - Employer access layer and talent discovery
   - Structured matching and opportunity pipeline
   - Certification and long-term credentialing
4. **CTA** — `Get Early Access` primary button

---

### PAGE 4: FOR WORKERS (`/for-workers`)

**Meta title:** `For Workers | NEXO CORE — Your Path Back to Opportunity`

**Tone:** Warm, direct, respectful. Never paternalistic. Speak to dignity and possibility.

**Sections:**
1. **Hero** — Headline: `A better starting point after return.` Subhead: `NEXO CORE is being built to help skilled workers become visible, trusted, and connected to future opportunities.` Dark hero, teal accent.
2. **You Are Not Invisible** — Full-bleed quote section with large DM Serif Display italic quote: *"Your experience is real. Your skills are real. NEXO is building a path that recognizes both."* White text on deep navy.
3. **What NEXO CORE Offers Workers** — 4-card grid:
   - Visibility: Be seen by employers, partners, and the ecosystem.
   - Trust: A credible foundation that grows over time.
   - Access: Future pathways to projects and opportunities.
   - Possibility: Long-term: certifications, profile growth, structured career identity.
4. **What to Expect Right Now** — 3 honest bullet points about what is currently available (waitlist only) vs. what's coming.
5. **CTA** — `Join as a Worker` primary button → links to `/waitlist?role=worker`

---

### PAGE 5: FOR EMPLOYERS & PARTNERS (`/for-employers`)

**Meta title:** `For Employers & Partners | NEXO CORE — Build the Workforce Pipeline`

**Tone:** Operational, clear, value-driven. Speak to ROI and strategic positioning.

**Sections:**
1. **Hero** — Headline: `Help build a more trusted workforce pipeline.` Subhead: `NEXO is creating infrastructure that can make reintegration more visible, more structured, and more scalable.`
2. **For Employers** — 3-feature list:
   - Future access to emerging structured talent
   - Early ecosystem participation and pilot shaping
   - Reduce hiring uncertainty before it becomes a bottleneck
3. **For Partners / NGOs / Institutions** — 3-feature list:
   - Referral infrastructure for the workers you serve
   - Strategic collaboration on ecosystem design
   - Scalable, measurable impact vehicle
4. **Why Join Early** — Short paragraph: "The companies and organizations that join now will shape how this platform works, what it prioritizes, and who it serves."
5. **CTA** — Two buttons side by side: `Join as an Employer` | `Partner with NEXO`

---

### PAGE 6: VISION (`/vision`)

**Meta title:** `The NEXO Vision | Building a Reintegration Ecosystem`

**Sections:**
1. **Hero** — Headline: `NEXO starts with CORE.` Subhead: `Over time, NEXO is being designed to grow into a broader ecosystem for workforce access, infrastructure, and economic mobility.`
2. **The Ecosystem** — Visual card layout (large for CORE, smaller for others):
   - **NEXO CORE** (teal, large, glowing): Worker visibility, access, trust layer — *Active Focus*
   - **NEXO INFRA** (green, medium): Digital twin infrastructure, site-level tools — *Future*
   - **NEXO CHAIN** (purple, medium): Blockchain-backed credentials and verification — *Future*
   - **NEXO MONEY** (amber, medium): Remittance, micro-financing, financial access — *Future*
3. **Sequencing Statement** — DM Serif italic centered: *"We are not building everything at once. We are building it right."*
4. **Market Context** — 2-paragraph explanation of the Latin America + construction sector opportunity.
5. **CTA** — `Join the Early Ecosystem` button.

---

### PAGE 7: WAITLIST (`/waitlist`)

**Meta title:** `Join the NEXO Waitlist | Early Access`

**This is the most important functional page. Build it perfectly.**

**Layout:** Two-column desktop (left: messaging + trust signals, right: form). Single column mobile (form below messaging).

**Left column:**
- Section label: `EARLY ACCESS`
- Headline (DM Serif, 40px): `Join the NEXO waitlist.`
- Body: "Tell us who you are and how you want to engage with the platform."
- **Trust signals list:**
  - ✓ Early access to pilot phases
  - ✓ Segmented updates based on your role
  - ✓ Be part of shaping the ecosystem
  - 🔒 Your data stays private. No spam.
- Quote below: *"Thank you for joining NEXO. We're building the first layer of the ecosystem now, and we'll keep you updated as early access opportunities open."*

**Right column — WaitlistForm component:**

**Field 1 — Role Selector (required, single select, large toggle buttons):**  
Label: "How would you like to join NEXO?"  
Options (large pill buttons, select highlights in teal):
- 👷 `I'm a Worker`
- 🏗️ `I'm an Employer`
- 🤝 `I'm a Partner / Organization`
- 💼 `I'm an Investor / Advisor`

**Universal Fields (shown for all roles):**
- Full Name (text input, required)
- Email Address (email input, required)
- Country (text input or simple select, required)
- Phone Number (optional, tel input, labeled "Optional")
- Consent checkbox: "I agree to receive updates from NEXO about early access and platform news." (required)

**Conditional Fields — Worker:**
- Trade / Skill Area (text, placeholder: "e.g. Electrician, Mason, Plumber, Carpenter")
- Years of Experience (select: "1-2 years / 3-5 years / 6-10 years / 10+ years")
- Country of Most Recent Work (text)
- Tell us about your interest (textarea, 3 rows, optional)

**Conditional Fields — Employer:**
- Company Name (text, required)
- Industry / Business Type (text, placeholder: "e.g. Construction, Real Estate Development")
- Hiring Interest (select: "Immediately / In 3-6 months / Exploring / Not sure yet")
- Country / Region of Operations (text)

**Conditional Fields — Partner / Organization:**
- Organization Name (text, required)
- Organization Type (select: NGO / Government / Academic / Foundation / Other)
- Partnership Interest (textarea, 2 rows, placeholder: "Tell us how you'd like to collaborate")

**Conditional Fields — Investor / Advisor:**
- Firm or Affiliation (text, optional)
- Interest Type (select: Seed Investment / Strategic Advice / Both / Other)
- Short Message (textarea, 2 rows, optional)

**Submit Button:**
- Text: `Join the Waitlist`
- Full width, teal gradient, arrow icon right
- Loading state: spinner, text changes to "Submitting..."
- Success state: Green checkmark animation, text: "You're on the list. We'll be in touch."
- Error state: Red border on failed fields, generic error message below button

**Form Validation (Zod):**
- Email: valid format
- Name: min 2 chars
- Country: min 2 chars
- Consent: must be true to submit
- Role: must be selected

**Airtable Submission:**
Submit to Airtable via REST API. See `src/lib/airtable.ts` spec below.

---

### PAGE 8: CONTACT (`/contact`)

**Meta title:** `Contact NEXO | Get in Touch`

**Layout:** Two-column. Left: messaging. Right: simple contact form.

**Left:**
- Headline: `Get in touch.`
- Body: "Whether you're a worker, employer, partner, or investor — we'd love to hear from you."
- **Contact Email:** `hello@nexo.io` (placeholder, mailto: link, copy-to-clipboard button)
- **For strategic inquiries:** `partnerships@nexo.io` (placeholder)
- Social links (placeholder icons for LinkedIn, Instagram)

**Right — Contact Form:**
- Name (required)
- Email (required)
- Subject (select: General / Partnership / Investment / Press / Other)
- Message (textarea, 5 rows, required)
- Submit: `Send Message` button
- Same Airtable submission logic, separate table: `ContactSubmissions`

---

### PAGE 9: PRIVACY POLICY (`/privacy`)

**Meta title:** `Privacy Policy | NEXO`

Standard placeholder privacy policy with:
- Data collected (form submissions, analytics)
- How data is used (waitlist notifications, ecosystem updates)
- Third parties (Airtable, Google Analytics)
- Right to deletion: contact hello@nexo.io
- No data selling statement
- Last updated date placeholder

---

### PAGE 10: TERMS OF USE (`/terms`)

**Meta title:** `Terms of Use | NEXO`

Standard placeholder terms:
- Website is informational only
- No guarantee of platform availability
- Early access is non-contractual
- Waitlist does not constitute a binding agreement
- Intellectual property notice
- Governing law placeholder

---

## 7. AIRTABLE INTEGRATION SPEC

**File:** `src/lib/airtable.ts`

```typescript
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const WAITLIST_TABLE = 'WaitlistSignups';
const CONTACT_TABLE = 'ContactSubmissions';

interface WaitlistData {
  role: 'worker' | 'employer' | 'partner' | 'investor';
  fullName: string;
  email: string;
  country: string;
  phone?: string;
  consent: boolean;
  sourcePage?: string;
  submittedAt: string;
  // Conditional fields
  tradeSkillArea?: string;
  yearsExperience?: string;
  countryOfWork?: string;
  workerNote?: string;
  companyName?: string;
  industryType?: string;
  hiringInterest?: string;
  operationsCountry?: string;
  organizationName?: string;
  organizationType?: string;
  partnershipInterest?: string;
  firmAffiliation?: string;
  interestType?: string;
  investorMessage?: string;
}

export async function submitToWaitlist(data: WaitlistData): Promise<void> {
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${WAITLIST_TABLE}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Full Name': data.fullName,
          'Email': data.email,
          'Country': data.country,
          'Phone': data.phone || '',
          'Role': data.role,
          'Consent': data.consent,
          'Source Page': data.sourcePage || 'waitlist',
          'Submitted At': data.submittedAt,
          'Trade / Skill Area': data.tradeSkillArea || '',
          'Years of Experience': data.yearsExperience || '',
          'Country of Work': data.countryOfWork || '',
          'Worker Note': data.workerNote || '',
          'Company Name': data.companyName || '',
          'Industry Type': data.industryType || '',
          'Hiring Interest': data.hiringInterest || '',
          'Operations Country': data.operationsCountry || '',
          'Organization Name': data.organizationName || '',
          'Organization Type': data.organizationType || '',
          'Partnership Interest': data.partnershipInterest || '',
          'Firm Affiliation': data.firmAffiliation || '',
          'Interest Type': data.interestType || '',
          'Investor Message': data.investorMessage || '',
        },
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Airtable submission failed');
  }
}
```

**Environment variables (.env):**
```
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 8. FIREBASE HOSTING CONFIGURATION

**`firebase.json`:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [{ "key": "Cache-Control", "value": "max-age=31536000" }]
      },
      {
        "source": "**",
        "headers": [
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-Content-Type-Options", "value": "nosniff" }
        ]
      }
    ]
  }
}
```

**`.firebaserc`:**
```json
{
  "projects": {
    "default": "nexo-core-website"
  }
}
```

**`vite.config.ts`:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
```

---

## 9. SEO IMPLEMENTATION

Each page uses `React Helmet Async` to inject:
- `<title>` unique per page
- `<meta name="description">` unique per page
- `<meta property="og:title">` matching page title
- `<meta property="og:description">` matching meta description
- `<meta property="og:image">` = `/og-image.png` (1200×630, create a placeholder navy/teal branded card)
- `<meta property="og:url">` = `https://nexo.io[page-path]`
- `<link rel="canonical">` per page
- `<html lang="en">`
- One `<h1>` per page matching the hero headline

---

## 10. ACCESSIBILITY REQUIREMENTS

- All interactive elements keyboard-accessible (Tab order logical)
- All images have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Form labels associated with inputs via `htmlFor`/`id`
- Error messages linked to inputs via `aria-describedby`
- Focus ring visible on all interactive elements (`outline: 2px solid #2A9A96`)
- `aria-label` on icon-only buttons
- Landmark regions: `<header>`, `<main>`, `<footer>`, `<nav>`

---

## 11. PERFORMANCE STANDARDS

- Lazy load all below-fold images via `loading="lazy"`
- `React.lazy` + `Suspense` for all pages (code split by route)
- Google Fonts: `preconnect` + `display=swap`
- SVG assets inlined where < 2kb, referenced as files where > 2kb
- No blocking scripts in `<head>` except gtag
- Target: LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## 12. COPY REFERENCE (FINAL APPROVED WORDING)

### Headlines by page:
| Page | H1 |
|------|----|
| Home | Rebuilding access to work for returned migrants. |
| About | We're building the infrastructure that reintegration has always needed. |
| How It Works | A simple first layer designed to reconnect talent to opportunity. |
| For Workers | A better starting point after return. |
| For Employers | Help build a more trusted workforce pipeline. |
| Vision | NEXO starts with CORE. |
| Waitlist | Join the NEXO waitlist. |
| Contact | Get in touch. |

### CTA Button Copy by context:
| Context | CTA Text |
|---------|---------|
| Hero primary | Join the Waitlist |
| Hero secondary | See How It Works |
| Problem section | Learn About NEXO CORE |
| Solution section | Join Early Access |
| Workers page | Join as a Worker |
| Employers page | Join as an Employer |
| Partners section | Partner with NEXO |
| Vision page | Join the Early Ecosystem |
| Contact page | Send Message |

### FAQ Content (for Home or dedicated FAQ section within About or Waitlist page):
1. **What is NEXO?** — NEXO is a platform being built to help returned migrants reconnect to economic opportunity, starting with access and visibility in construction and real estate-related sectors.
2. **What is NEXO CORE?** — NEXO CORE is the first layer of the NEXO ecosystem. It is focused on helping workers become visible, structured, and better positioned for future opportunity.
3. **Is NEXO already live?** — NEXO is currently in its early ecosystem-building phase. The website is designed to introduce the mission and collect interest through the waitlist.
4. **Who is NEXO for?** — Returned migrant workers, employers, contractors, partners, institutions, and strategic stakeholders.
5. **Is NEXO a staffing agency?** — No. NEXO is being designed as a broader reintegration and opportunity infrastructure platform, not just a staffing intermediary.
6. **What happens after I join the waitlist?** — You will be categorized based on your role and kept informed as early access, pilots, or partnership opportunities develop.
7. **Can organizations partner with NEXO?** — Yes. NEXO is open to conversations with NGOs, institutions, ecosystem partners, and strategic collaborators.

---

## 13. WHAT NOT TO BUILD

- ❌ No login / authentication system
- ❌ No user dashboard or profile pages
- ❌ No job board or matching functionality
- ❌ No payment or subscription flows
- ❌ No crypto wallet integration
- ❌ No backend server or serverless functions (Firebase Hosting = static only)
- ❌ No heavy stock photo usage — use CSS gradients and SVG illustration instead
- ❌ No excessive animation that slows page load
- ❌ No navigation links on the waitlist page (distraction-free conversion)
- ❌ No equal visual weight to INFRA, CHAIN, MONEY — CORE is primary

---

## 14. LAUNCH CHECKLIST (FOR REVIEW BEFORE DEPLOY)

- [ ] All 10 pages built and routing correctly
- [ ] Waitlist form submits to Airtable (test with valid API key)
- [ ] All conditional form fields show/hide correctly based on role selection
- [ ] Mobile responsive on 375px, 768px, 1280px, 1440px viewports
- [ ] All CTAs link to correct destinations
- [ ] Meta tags present on all pages
- [ ] Google Analytics gtag in index.html
- [ ] firebase.json and .firebaserc present in root
- [ ] `npm run build` produces clean `dist/` folder
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No console errors in browser
- [ ] .env.example file created (no real keys committed)
- [ ] README.md with setup and deploy instructions

---

## 15. README REQUIREMENTS

The generated README.md must include:
1. Project overview (1 paragraph)
2. Tech stack list
3. Local setup instructions (`npm install`, `npm run dev`)
4. Environment variables setup (copy .env.example to .env, fill in Airtable + GA keys)
5. Firebase deployment steps (`npm run build`, `firebase deploy`)
6. Airtable table setup guide (table name, field names and types)
7. How to update content (file path references for copy changes)

---

*End of Implementation Plan — Version 1.0*
*All sections are build-ready. No further clarification required before implementation.*
