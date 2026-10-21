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

- **Virtualização de tabela** com [`@tanstack/react-virtual`](https://tanstack.com/virtual) — linhas absolutamente posicionadas dentro de uma `<table>` semântica, header sticky preservado via CSS (o padrão recomendado pelo [TanStack virtualization guide](https://tanstack.com/table/latest/docs/framework/react/guide/virtualization));
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
│   │   ├── hooks/SlowOrderHook.ts     # slow baseline — refilters AND re-sorts on every keystroke
│   │   ├── hooks/ImprovedOrderHook.ts # deferred filter + sort-once two-stage memoization
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



## 📚 Key takeaways

1. **The DOM is expensive** — performance isn't about how much data *you* process, but how much the *browser* has to paint;
2. Virtualization keeps rendering cost **constant** (the visible window), regardless of list size;
3. Derived state beats duplicated state — filter and sort fit in a single `useMemo`;
4. Absolutely positioned rows inside a semantic `<table>` keep sticky headers and plain CSS — virtualization without CSS hacks.

---

Built with a data-dense json.
