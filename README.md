# UASH Website — React + Tailwind

Rebuild of the Uzbek American Society of Houston website (originally WordPress + Elementor) as a React + Vite + Tailwind project.

This version was rebuilt from the official `.wpress` site export, so it includes:
- All page content (Home, About Us, Membership, Programs & Events, Discover Uzbekistan, Gallery, Contact)
- The official logo, favicon, and Get Involved card icons
- 12 photos from the live gallery
- The brand colors and fonts from the live Elementor kit (`#112C35` dark teal, Playfair Display + Work Sans)

## Stack

- **Vite** + **React 18** + **React Router 6**
- **Tailwind CSS** with a custom brand palette
- **Lucide React** for icons
- **Google Fonts**: Playfair Display (display) + Work Sans (body)

## Quick start

```bash
npm install
npm run dev          # → http://localhost:5173
npm run build        # production build
npm run preview      # preview the build
```

## Project structure

```
uash-website/
├── public/
│   └── images/             ← logo, icons, about photo, gallery photos (bundled)
├── src/
│   ├── components/
│   │   ├── Header.jsx      ← top nav with contact strip + mobile menu
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx      ← wraps every page
│   │   └── PageHero.jsx    ← reusable hero for inner pages
│   ├── pages/
│   │   ├── Home.jsx        ← Hero, About, Get Involved, Gallery preview
│   │   ├── About.jsx       ← Who We Are, What We Do, Our Vision
│   │   ├── Events.jsx      ← Programs (6) + Upcoming Events (3)
│   │   ├── Membership.jsx  ← Benefits + 4 tiers
│   │   ├── Gallery.jsx     ← Full photo grid
│   │   ├── Discover.jsx    ← Discover Uzbekistan (5 sections)
│   │   └── Contact.jsx     ← Contact info + map + form
│   ├── App.jsx             ← React Router routes
│   ├── main.jsx
│   └── index.css           ← Tailwind + base styles
├── tailwind.config.js      ← brand palette + fonts
└── index.html              ← Google Fonts loaded here
```

## Theme & branding

Color and font tokens extracted from the live Elementor kit. Defined in `tailwind.config.js`:

- `brand-500` (#112C35) — primary brand accent
- `surface-50` (#FFFFFF) — page background
- `surface-200` (#F1F1F1) — light gray surface
- `ink-primary` (#202020) — heading color
- `ink-body` (#333333) — body text

Fonts loaded from Google Fonts in `index.html`:
- **Playfair Display** — headings
- **Work Sans** — body

## Routes

| Path                       | Component   |
|----------------------------|-------------|
| `/`                        | Home        |
| `/about-us`                | About       |
| `/program-and-events`      | Events      |
| `/membership`              | Membership  |
| `/become-a-member`         | Membership (alias) |
| `/gallery`                 | Gallery     |
| `/discover-uzbekistan`     | Discover    |
| `/contact-us`              | Contact     |

## Things to wire up next

**Contact form** — `Contact.jsx` has a UI-only form. Easiest options:
- **Formspree** — paste your endpoint into the submit handler
- **Web3Forms** — free, no backend
- **Resend / SendGrid** — needs a Vercel/Netlify function

**Become a Member form / payments** — `/become-a-member` currently reuses the Membership page. The original WordPress version had a paid signup with the four tiers ($50 / $100 / $200 / $500). Options:
- **Stripe Payment Links** — 4 links, no backend code
- **Stripe Checkout** with a small serverless function
- **Donorbox** or **Givebutter** widget — embed-friendly

**Deployment** — recommended hosts:

- **Vercel** — `vercel` from CLI or push to GitHub and import. Add `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```
- **Netlify** — add `public/_redirects`:
  ```
  /* /index.html 200
  ```

## Notes

The original site was WordPress + Elementor. This version is fully code-based — non-technical edits now require code changes. If UASH leadership needs a CMS later, options include **Sanity**, **Contentful**, or **Decap** (Git-based, free) layered on top of this React app.
