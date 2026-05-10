# UASH Website

Rebuild of the Uzbek American Society of Houston website from the original WordPress and Elementor export.

## Stack

- Vite
- React 18
- React Router 6
- Tailwind CSS
- Lucide React

## Quick start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```text
uash-website/
|-- pages/                  <- static exported route folders (about-us, gallery, etc.)
|-- public/
|   |-- images/
|   `-- mirror/
|-- src/
|   |-- components/
|   |-- pages/              <- React page components
|   |-- App.jsx
|   |-- main.jsx
|   `-- index.css
|-- scripts/
|-- index.html              <- home page entry
|-- vite.config.js
`-- tailwind.config.js
```

## Notes

- Static exported HTML pages now live under the root `pages/` folder to keep the project cleaner.
- Vite is configured so routes like `/about-us/` and `/program-and-events/` still work in dev and build output.
- React component pages remain under `src/pages/`.
