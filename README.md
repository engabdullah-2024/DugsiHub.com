<p align="center">
  <a href="https://dugsihubcom.vercel.app" target="_blank" rel="noopener">
    <img src="./public/dugsihub.png" alt="Dugsi Hub" height="96">
  </a>
</p>

<h1 align="center">Dugsi Hub</h1>
<p align="center">
  Past papers, quizzes, and student tools — built with Next.js (App Router), TypeScript, Tailwind, and shadcn/ui.
</p>

<p align="center">
  <a href="https://nextjs.org">Next.js</a> •
  <a href="https://tailwindcss.com">Tailwind</a> •
  <a href="https://ui.shadcn.com">shadcn/ui</a> •
  <a href="https://resend.com">Resend</a>
</p>

---

## Table of Contents
- [Features](#-features)
- [Tech](#-tech)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contact API](#-contact-api)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Deploy](#-deploy)
- [Troubleshooting](#-troubleshooting)
- [About Dugsi Hub](#-about-dugsi-hub)
- [Contact](#-contact)
- [License](#-license)

---

## ✨ Features

- **Modern stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.
- **Dark mode:** one-click theme toggle with accessible defaults.
- **Production-ready contact form:**
  - `/api/contact` with validation, honeypot, and friendly errors.
  - **Resend** email delivery using a **safe fallback sender** (`onboarding@resend.dev`) until a domain is verified.
  - `Reply-To` set to the user so you can respond directly.
  - **Node runtime enforced** (no Edge surprises).
- **Email UX:** designed HTML emails via Resend’s `react:` option; strict TypeScript (no `any`, no ts-comments).
- **Strict quality:** ESLint + TypeScript, typed API responses, safe error handling.

---

## 📦 Tech

- **Frontend:** Next.js 13+ (App Router), TypeScript, Tailwind, shadcn/ui, framer-motion, lucide-react  
- **Email:** Resend (`resend` SDK; SDK internally uses `@react-email/render`)  
- **Styling:** Tailwind (utility-first components)

---

## ▶️ Getting Started

```bash
pnpm install
pnpm dev
# open http://localhost:3000
