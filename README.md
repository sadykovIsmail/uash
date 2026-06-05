# UASH - High-Availability Disaster Recovery Site

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-SSG-646CFF?style=flat-square&logo=vite&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Global_CDN-222222?style=flat-square&logo=github&logoColor=white)

---

## Build Automation & Deployment Infrastructure

```mermaid
flowchart LR
    A["🗂️ Legacy WordPress\nAsset Extraction"] --> B["⚛️ React Components\n+ Route Mapping"]
    B --> C["⚡ Vite SSG Build Pipeline\nRoutes → Pre-rendered HTML"]
    C --> D["🤖 GitHub Actions\nCI/CD on Push to main"]
    D --> E["🌐 GitHub Pages\nGlobal CDN Edge Network"]
    E --> F["✅ Zero-Downtime\nDisaster Recovery Site"]

    style A fill:#f4a261,color:#000
    style B fill:#61dafb,color:#000
    style C fill:#646cff,color:#fff
    style D fill:#2088ff,color:#fff
    style E fill:#24292e,color:#fff
    style F fill:#2ecc71,color:#000
```

---

## Why This Exists

Pro-bono engineering for the **Uzbek American Society of Houston** — a cultural non-profit serving the Central Asian immigrant community in Texas.
Their primary WordPress site is a single point of failure; this static replica is a bulletproof failover so the community is never left without a home online.

---

## Tech Highlights

- **Zero database queries** — every route pre-rendered to static HTML at build time via Vite SSG
- **Sub-second load times** — pure static assets served from GitHub's global CDN edge nodes
- **Automated deployments** — any push to `main` triggers a full rebuild and redeploy via GitHub Actions
- **WordPress-free** — reverse-engineered from a bloated Elementor/WP stack into a lean React + Vite project
