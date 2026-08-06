# Basanta Pokhrel — Portfolio

Personal portfolio for **Basanta Pokhrel**, Backend Developer. Built in a clean John Smith / Cryptical Coder style with grayscale foundations, a slate-blue accent, and day/night mode.

**Live focus:** multi-tenant SaaS APIs, distributed job queues, Node.js, TypeScript, NestJS, Express, Redis, PostgreSQL, MongoDB, Docker, and Kubernetes.

## Preview

Serve the folder over HTTP (needed for the About photo scatter canvas):

```bash
cd portfolio
python -m http.server 5500
```

Then open `http://localhost:5500`.

Or:

```bash
npx --yes serve .
```

Opening `index.html` directly works for most of the site; the About pixel scatter needs a local server (same-origin).

## Sections

| Section | What’s included |
| --- | --- |
| **Home** | Intro, socials, animated blob photo, Download CV |
| **About** | Circular scatter photo, dual tech orbit (inner clockwise / outer anticlockwise), education & project stats |
| **Skills** | Six skill groups with progress bars from resume / projects |
| **Qualification** | Education & experience timeline |
| **Services** | Backend offerings with detail modals |
| **Portfolio** | Orchestrate, AccessPro, Job Board API, ProjectForge, planned Gov Service Platform |
| **Contact** | Email, LinkedIn, GitHub, Formspree-ready form |
| **Theme** | Day / Night toggle (saved in `localStorage`) |

## Features

- Responsive layout for phone, tablet, and desktop (safe-area aware)
- Slate-blue accent on content sections; header/footer stay grayscale
- Floating bottom nav (desktop) / slide-up menu (mobile)
- About orbit tags keep text upright while rotating on the rings
- Project filters and flagged completed / evolving / planned work
- **Page Hunt** mini-game: scroll the site to find packets, eat them with ↑↓ (bombs reset score; score 10 unlocks a surprise)

## Stack

- HTML · CSS · Vanilla JavaScript
- [Boxicons](https://boxicons.com/) · [Poppins](https://fonts.google.com/specimen/Poppins)
- Assets in `assets/` (`profile-home.png`, `about-photo.png`, icons)

## Project structure

```
portfolio/
├── index.html      # Markup & content
├── styles.css      # Layout, theme, responsive breakpoints
├── script.js       # Nav, theme, qualification, filters, About scatter
├── assets/         # Photos & icons
└── README.md
```

## Customize

- **Accent:** CSS variables `--accent`, `--accent-hover`, `--accent-soft` in `styles.css`
- **Theme:** `html.dark-theme` overrides in `styles.css`
- **CV link / contacts / projects:** edit `index.html`
- **About photo:** replace `assets/about-photo.png` (prefer a square-ish portrait)

## Contact

- Email: [pokhrelb246@gmail.com](mailto:pokhrelb246@gmail.com)
- LinkedIn: [basanta-pokhrel](https://www.linkedin.com/in/basanta-pokhrel-83abb628b)
- GitHub: [basanta1-github](https://github.com/basanta1-github)
