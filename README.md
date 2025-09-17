<p align="center">
  <a href="https://dugsihubcom.vercel.app" target="_blank" rel="noopener">
    <img src="./public/dugsihub.png" alt="Dugsi Hub" height="96">
  </a>
</p>

<h1 align="center">Dugsi Hub</h1>
<p align="center">
  Past papers, quizzes, and student tools — built with Next.js App Router, TypeScript, Tailwind, and shadcn/ui.
</p>

<p align="center">
  <a href="https://nextjs.org">Next.js</a> •
  <a href="https://tailwindcss.com">Tailwind</a> •
  <a href="https://ui.shadcn.com">shadcn/ui</a> •
  <a href="https://resend.com">Resend</a>
</p>

---

## ✨ Features

- **Modern stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.
- **Dark mode:** one-click theme switch with a11y-friendly defaults.
- **Contact form (production-ready):**
  - `/api/contact` with validation, honeypot, and helpful error messages.
  - **Resend** email delivery using a **safe fallback sender** (`onboarding@resend.dev`).
  - **Reply-To** set to the user so you can respond directly.
  - Node runtime enforced (no Edge surprises).
- **Email templates:** Clean HTML emails rendered via Resend `react:`; no `any`, no ts-ignore.
- **ESLint/TypeScript strict:** No `any`, typed API responses, clean catches.

---

## 📦 Tech

- **Frontend:** Next.js 13+ (App Router), TypeScript, Tailwind, shadcn/ui, framer-motion, lucide-react
- **Email:** Resend (`resend` SDK, `@react-email/render` used internally by SDK)
- **Styling:** Tailwind + utility-first components

---

## ▶️ Getting Started

```bash
pnpm install
pnpm dev
# open http://localhost:3000
