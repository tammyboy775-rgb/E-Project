# Alpine Ascents

An image-led mountaineering field guide and expedition overview built with React 19, React Router, and Vite. The site covers mountain history, styles, techniques, shelter, hazards, records, clubs, stories, a gallery, updates, guidelines, and contact.
## Run Locally

Use Node.js 20.19+ or 22.12+.
```powershell
cd AlpineAscents
npm install
```
Create and serve a production build:

```powershell
npm run build
npm run preview
```
`npm run lint` runs ESLint. Vite's preview server provides SPA fallback for direct route visits and refreshes.

## Routes
The primary routes are `/`, `/history`, `/types`, `/techniques`, `/sheltering`, `/hazards`, `/records`, `/clubs`, `/success-stories`, `/gallery`, `/latest`, and `/guidelines`. `/contact` is retained. Unknown paths display a custom 404. Trips and Experiences are folded into the Home overview and Clubs; Reviews is now Success Stories.

## Team Ground Rules
1. Pull the latest `main` before creating a feature branch. After the project lead publishes a shared update, pull `main` before branching.
2. Page owners work in their assigned `src/pages/<PageName>Page.jsx`, matching page stylesheet, and assigned content data. Keep page-specific UI and copy in those files.
3. Router registrations (`src/App.jsx`), global layout, navigation, shared tokens, and shared component APIs are integration-owner files. Coordinate changes to them before editing.
4. Do not edit another page owner's files or reformat unrelated code. Keep pull requests focused on the assigned page and its tests.
5. Keep `App.css` as the last stylesheet import in `src/App.jsx`. Put global design tokens in `src/index.css`; put page-only rules in that page's CSS file.
6. Run `npm run lint` and `npm run build` before requesting review. Check direct route refreshes and mobile widths for each changed page.
The route-specific page entry files are isolated so contributors can replace their own page implementation without editing the shared layout. Existing topic copy is seeded in `src/data/mountaineeringPages.json`; coordinate any edits to that shared seed file or move new page copy to an owner-specific JSON file.

## Design System
| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#18332e` | Headings and primary text |
| `--color-lime` | `#d6e89a` | Highlight and active states |
| `--color-paper` | `#f5f3e9` | Page background |
| `--color-line` | `#d8dfd4` | Dividers |
| `--font-body` | DM Sans | Body text and controls |
| `--font-display` | Playfair Display | Display headings |
| `--space-section` | `72px` | Home section spacing |

The main content width is 1200px. Directory cards use three columns on wide screens, two at tablet widths, and one on narrow screens.
## Assumptions and Sources

- The visitor total is a client-side counter, seeded at 1,200 in `src/data/alpineAscentsData.json`. It is stored per browser and increments once per browser session; it is not a global visitor total.
- Location requires browser geolocation permission. Reverse lookup uses the OpenStreetMap Nominatim service; coordinates are shown if lookup fails, and `Location unavailable` appears if location access fails or is unsupported.
- The Records map is an OpenStreetMap embed; no client-side map library is installed.
- Mountain photographs are loaded from Unsplash URLs in the JSON content. Text is authored for this educational project; the app is not a substitute for local conditions, qualified instruction, or emergency services.
- The map and reverse-geocoding services and external photographs require an internet connection.

See [PROJECT_REPORT.md](PROJECT_REPORT.md) for design notes, diagrams, test data, browser coverage, and the submission checklist. Assumptions are also supplied in [ReadMe.doc](ReadMe.doc).
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
