# AgentRox Protocol — Technical Whitepaper

The official GitBook-style technical whitepaper web application for AgentRox Protocol, built with Next.js (App Router) and optimized for deployment on [Vercel](https://vercel.com).

---

## 🚀 Deployment to Vercel

### Method 1: Push to GitHub & Connect to Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, and import this repository.
3. Vercel automatically detects Next.js. Click **Deploy**.

### Method 2: Deploy directly via Vercel CLI
```bash
npx vercel
```

---

## ✍️ How to Edit Content

All chapters are stored as standard Markdown files inside the [`content/`](./content/) directory:

- [`content/01-introduction.md`](./content/01-introduction.md)
- [`content/02-abstract.md`](./content/02-abstract.md)
- [`content/03-private-swaps.md`](./content/03-private-swaps.md)
- [`content/04-tokenized-stock-swaps.md`](./content/04-tokenized-stock-swaps.md)
- [`content/05-private-agentic-trading.md`](./content/05-private-agentic-trading.md)
- [`content/06-agentic-strategies.md`](./content/06-agentic-strategies.md)
- [`content/07-architecture-overview.md`](./content/07-architecture-overview.md)
- [`content/08-security-privacy-model.md`](./content/08-security-privacy-model.md)
- [`content/09-use-cases.md`](./content/09-use-cases.md)
- [`content/10-roadmap.md`](./content/10-roadmap.md)
- [`content/11-conclusion.md`](./content/11-conclusion.md)

Simply open any file in `content/`, edit the markdown, save, and your changes will immediately update.

---

## 💻 Local Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the whitepaper.

### Production Build
```bash
npm run build
npm start
```
