# 🧪 Data Dense Lab — Tables that don't drop frames

A hands-on lab comparing **two ways of rendering the exact same table of 20,000 orders**:

- 🐌 **Slow** — the conventional table: every row lands in the DOM at once.
- ⚡ **Virtualized** — the windowed table: only the visible rows (plus a small overscan) exist in the DOM.

The goal is to **feel** the difference, not just read about it: open the *Slow* tab, type into the filter, and watch it stutter. Do the same on the *Virtualized* tab — the identical operation responds instantly.

> 💡 Tip: open Performance Monitor in DevTools (Chrome/Edge → `Ctrl+Shift+P` → "Performance Monitor") to watch CPU and memory per tab.

> 🔗 **Live demo:** update this line with your Vercel URL after the first deploy — recruiters love a one-click demo.

## 🎯 The idea

Data-dense UIs (dashboards, ERPs, admin consoles, web spreadsheets) live off long lists. Browsers deal poorly with dumping thousands of DOM nodes at once: every state re-render (typing in a filter, toggling a sort) makes React reconcile tens of thousands of `<tr>`s — the result is jank, dropped frames and wasted memory.

**Virtualization** fixes this by rendering only the visible window. This project keeps a real, semantic `<table>` doing it: two "spacer" rows (full-width `colSpan` with a dynamic `height`) push the actual rows into the right scroll position — no CSS hacks, no `head` loss.

### What each page shows

| Route | Page | Rendering | Feel |
| --- | --- | --- | --- |
| `/slowOrder` | Slow table | `.map()` over all ~20,000 rows | Freezes while filtering/sorting |
| `/virtualized` | Virtualized table | `useVirtualizer` + visible window | Instant |

### Techniques on display

- **List/table virtualization** with [`@tanstack/react-virtual`](https://tanstack.com/virtual) (classic top/bottom padding pattern inside `<tbody>`);
- **Derived state** — filter and sort are computed with `useMemo`, never duplicated into extra state;
- **Honest comparison**: the slow version is kept on purpose, so the improvement is measurable in practice, not just on paper.

## 🧱 Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vite.dev) (dev server, HMR and build)
- [React Router 7](https://reactrouter.com) (navigation between both demos)
- [TanStack Virtual 3](https://tanstack.com/virtual) (windowing)

## 🗂️ Project structure

```
.
├── public/
│   └── orders-20000.json        # dataset with 20,000 orders (customer, payment, fulfillment…)
├── src/
│   ├── components/
│   │   ├── menu/                          # main navigation
│   │   ├── slow-order-table/              # ❌ full-mount table
│   │   └── virtualization-order-table/    # ✅ windowed table
│   ├── shared/
│   │   ├── hooks/OrderHook.ts             # fetch + filter + sort (useMemo)
│   │   ├── models/order/order.model.ts    # Order type
│   │   └── utils/order-badge.ts           # status badge tones
│   ├── App.tsx                            # routes
│   └── main.tsx
├── index.html
├── vercel.json                            # SPA rewrites (for BrowserRouter on Vercel)
└── vite.config.ts
```

## 🚀 Getting started

Requirements: Node.js 18+ (20+ recommended) and npm.

```bash
# 1. install dependencies
npm install

# 2. run in development (http://localhost:5173)
npm run dev

# 3. production build
npm run build

# 4. serve the build locally to double-check
npm run preview

# lint (optional)
npm run lint
```

The `orders-20000.json` dataset is served automatically by Vite from `public/`; no extra configuration needed.

## ☁️ Deploy on Vercel

The repo is deploy-ready — `vercel.json` at the root handles the SPA rewrites so routes like `/virtualized` work on deep links instead of 404-ing.

**Via the dashboard (recommended):**

1. Push this repository to GitHub;
2. On [Vercel](https://vercel.com/new), click **Add New → Project** and pick the repository;
3. Vercel auto-detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
4. Hit **Deploy** — done, zero environment variables.

**Via the CLI:**

```bash
npm i -g vercel
vercel        # first deploy (preview)
vercel --prod # production deploy
```

## 📚 Key takeaways

1. **The DOM is expensive** — performance isn't about how much data *you* process, but how much the *browser* has to paint;
2. Virtualization keeps rendering cost **constant** (the visible window), regardless of list size;
3. Derived state beats duplicated state — filter and sort fit in a single `useMemo`;
4. `colSpan` + dynamic spacers are a clean way to virtualize **without abandoning `<table>`** — which keeps accessibility and table semantics intact.

---

Built with 💛 and a suspicious amount of table rows.
