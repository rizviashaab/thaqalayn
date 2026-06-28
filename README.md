# Thaqalayn

A daily-reflection app — Quran and Ahl al-Bayt teachings, Deepstash-style swipeable cards, every card sourced.

## What's in here

- `app/page.jsx` — the card UI (everything lives in one component for v1)
- `data/cards.json` — all 48 cards (24 Quran, 24 Ahl al-Bayt). **Edit this file to add/change content — no code changes needed.**
- `app/layout.jsx`, `app/globals.css` — page shell, fonts

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel (free)

1. **Push this folder to a new GitHub repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial Thaqalayn app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/thaqalayn-app.git
   git push -u origin main
   ```
   (Create the empty repo on GitHub first via "New repository" — don't initialize it with a README there, to avoid a merge conflict.)

2. **Import into Vercel:**
   - Go to vercel.com → log in with GitHub
   - "Add New" → "Project"
   - Select the `thaqalayn-app` repo
   - Vercel auto-detects Next.js — leave all settings default
   - Click "Deploy"

3. **You'll get a live URL** like `thaqalayn-app.vercel.app` within ~1-2 minutes.

4. **Every future `git push` to `main` auto-redeploys.** To add more cards later, just edit `data/cards.json`, commit, and push — no need to touch Vercel again.

## Adding a custom domain later

Vercel → your project → Settings → Domains → add your domain, follow the DNS instructions it gives you.

## Before going fully public

- [ ] Run through the verification checklist in `thaqalayn-v1-content-48-cards.md` (every citation should be double-checked against a primary source like sunnah.com or a published Nahj al-Balagha translation)
- [ ] Consider having someone familiar with the Ahl al-Bayt textual tradition review the "story" cards specifically (a10–a14 in the JSON)
