# Mian Asif Langrah — Portfolio

Built with **Next.js**, **Tailwind CSS**, **Three.js** (React Three Fiber), **Motion** and the **Claude API**. Deployed on **Vercel**.

## Features

- Interactive 3D "AI core" hero (gold liquid sphere, orbit rings, particles) that follows the mouse
- Preloader, custom cursor, magnetic buttons, word-by-word text reveals, parallax on scroll
- 3D tilt cards with light glare, spinning 3D skills globe, scroll-drawn career timeline
- AI chatbot that answers questions about Asif (powered by Claude)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Edit content

All text (projects, experience, skills, contact links) is in `app/data.ts`. The chatbot learns from the same file.
Profile photo: put the image at `public/profile.jpg`.

## AI chatbot

The chatbot works out of the box with built-in answers. For real AI answers, add an Anthropic API key:

- Locally: create `.env.local` with `ANTHROPIC_API_KEY=your-key`
- On Vercel: Project → Settings → Environment Variables → add `ANTHROPIC_API_KEY`

## Deploy

1. Push this folder to a GitHub repository.
2. On vercel.com, click **Add New → Project**, import the repo and click **Deploy**.
