# Blackwood Protocol — Technical Whitepaper

The official GitBook-style technical whitepaper web application for Blackwood Protocol, built with Next.js (App Router) and optimized for deployment on [Vercel](https://vercel.com).

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

- [`content/01-executive-summary.md`](./content/01-executive-summary.md)
- [`content/02-shift-to-agentic-markets.md`](./content/02-shift-to-agentic-markets.md)
- [`content/03-blackwood-protocol.md`](./content/03-blackwood-protocol.md)
- [`content/04-system-architecture.md`](./content/04-system-architecture.md)
- [`content/05-market-intelligence-layer.md`](./content/05-market-intelligence-layer.md)
- [`content/06-autonomous-agent-network.md`](./content/06-autonomous-agent-network.md)
- [`content/07-risk-and-execution-architecture.md`](./content/07-risk-and-execution-architecture.md)
- [`content/08-robinhood-chain.md`](./content/08-robinhood-chain.md)
- [`content/09-capital-architecture.md`](./content/09-capital-architecture.md)
- [`content/10-security-reliability.md`](./content/10-security-reliability.md)
- [`content/11-development-roadmap.md`](./content/11-development-roadmap.md)
- [`content/12-risks-and-limitations.md`](./content/12-risks-and-limitations.md)
- [`content/13-conclusion.md`](./content/13-conclusion.md)
- [`content/14-references-and-terminology.md`](./content/14-references-and-terminology.md)

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
