# Sanatan (सनातन) — Architecture & Atelier

> **"Architecture is the container of silence; furniture is how the human body comes to rest within that silence."**

Sanatan is a monorepo platform uniting architectural monograph publishing, spatial curation, and crafted furniture editions into a single cohesive experience.

---

## 🏛️ The Core Concept

This is **not** a standard furniture catalog. The platform is architected around a continuous spatial narrative:

```
ARCHITECTURE  ──►  SPACES  ──►  STORIES  ──►  OBJECTS  ──►  FURNITURE  ──►  PURCHASE
```

1. **Architecture First**: Every piece of furniture begins as a bespoke commission for an architectural interior.
2. **Contextual Inhabitation**: Users experience spaces (courtyards, pavilions, monoliths) with interactive spatial hotspots revealing the objects within.
3. **Tactile Materiality**: Regional stone (Dhrangadhra limestone, Makrana marble), reclaimed timber (aged Indian teak), and unlacquered brass.
4. **Editorial Provenance**: Direct links connect each furniture piece back to the architecture project that inspired its creation.

---

## 🧱 Architectural Principles & Boundaries

- **Separation of Concerns**: Strict boundary between Presentation (UI), Business Logic, Service Abstraction, and Data Models.
- **Service Layer Abstraction**: UI components never query database endpoints or raw mock data directly; all requests flow asynchronously through typed services (`projectService`, `productService`, `apiClient`).
- **Zero-Trust Commerce**: The client never calculates or trusts authoritative prices, discounts, or stock levels; all checkout transactions require server-side cryptographic validation.
- **Strict Typing**: Shared domain models defined in `@sanatan/types` and shared across frontend, admin, and future backend APIs.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Monorepo** | Turborepo + pnpm Workspaces |
| **Frontend Framework** | React 18 + Vite + TypeScript |
| **Routing** | React Router v6 (Data Router with dynamic layout shell) |
| **Design System** | Custom Vanilla CSS with Design Tokens (`tokens.css`, `typography.css`) |
| **Typography** | Cormorant Garamond (Editorial Display) + Inter (Functional Sans) |
| **Motion** | Framer Motion (Architectural slow-reveal curve presets) |
| **Domain Models** | `@sanatan/types` (Shared TypeScript package) |

---

## 📂 Repository Structure

```
sanatan-website/
├── apps/
│   └── web/                                # Main editorial & e-commerce client
│       ├── src/
│       │   ├── components/
│       │   │   ├── architecture/           # HotspotImage, ProjectCard, MaterialPalette
│       │   │   ├── commerce/               # ProductCard, pricing, object views
│       │   │   ├── layout/                 # Layout shell, scroll restoration
│       │   │   ├── navigation/             # Header (glassmorphic), Footer, MobileMenu
│       │   │   └── ui/                     # Button, Card, Image, Skeleton, Badge
│       │   ├── data/                       # Typed mock repositories (isolated)
│       │   ├── hooks/                      # useMediaQuery, useBreakpoint, useReducedMotion
│       │   ├── lib/                        # cn, formatCurrency, motion presets, SEO utils
│       │   ├── pages/                      # Home, Projects, ProjectDetail, Shop, ProductDetail, About, Journal, Contact
│       │   ├── services/                   # apiClient, projectService, productService
│       │   └── styles/                     # tokens, reset, base, typography, utilities
│       └── vite.config.ts
├── packages/
│   └── types/                              # Shared canonical domain models
│       └── src/index.ts
├── architecture_proposal.md                 # Full 5-phase engineering roadmap & RFC
├── package.json                            # Root workspace scripts
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18.0 or higher recommended)
- [pnpm](https://pnpm.io/) (v9 or higher): `npm install -g pnpm`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sanatan-website

# Install monorepo dependencies
pnpm install

# Build shared types package
pnpm --filter @sanatan/types build
```

### Running Locally

```bash
# Start web application dev server
pnpm --filter @sanatan/web dev
```

The application will be accessible at `http://localhost:5173/`.

### Quality & Verification

```bash
# Typecheck entire workspace with strict compiler flags
pnpm --filter @sanatan/web typecheck

# Build production bundle
pnpm --filter @sanatan/web build
```

---

## 🗺️ Engineering Roadmap

- [x] **Phase 1: Architecture-First Foundation** (Editorial layout, monograph pages, interactive hotspot rooms, material palettes, decoupled services).
- [ ] **Phase 2: Commerce & 3D Integration** (Cart store, server-validated checkout contract, Three.js spatial model viewer).
- [ ] **Phase 3: Production Backend & PostgreSQL** (Prisma ORM, authentication, orders, inventory locks).
- [ ] **Phase 4: Archival Admin Studio** (Content editor, product variant manager, spatial hotspot placement editor).
- [ ] **Phase 5: Global Edge Deployment & Performance** (Edge caching, image optimization, analytics).

---

## 📜 License

Private & Confidential © Sanatan Studio. All rights reserved.
