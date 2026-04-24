# Primed — Heavy Civil Field Scheduler

Daily scheduling tool for heavy civil construction crews.  
Built with React + Vite. Deployable to Vercel in under 5 minutes.

---

## What's in the App

| Screen | Description |
|---|---|
| **Week at a Glance** | Home screen. 5-day calendar, responsive portrait/landscape. Tap any job to view or edit. |
| **Add Schedule** | Create a new daily assignment — date, time, project, crew, tasks, equipment, notes. |
| **Daily Detail** | Dispatch board. Select a date, see all jobs with full crew, task, and equipment breakdown. |

---

## Deploy to Vercel (Recommended — Free)

### Step 1 — Put the code on GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** → name it `primed` → click **Create repository**
3. On your computer, open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial Primed deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/primed.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username shown in the repo URL.

---

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and click **Sign Up** → choose **Continue with GitHub**
2. Click **Add New → Project**
3. Find and select your `primed` repository → click **Import**
4. Vercel will auto-detect Vite. Leave all settings as-is.
5. Click **Deploy**

That's it. In about 60 seconds Vercel will give you a live URL like:
```
https://primed-yourname.vercel.app
```

Share that link with anyone — no login required to view.

---

### Step 3 — Making Changes Later

Whenever you want to update the app:

1. Make your edits to the code (e.g. update `src/App.jsx`)
2. Run in terminal:
```bash
git add .
git commit -m "describe your change"
git push
```
3. Vercel automatically redeploys within ~60 seconds.

---

## Run Locally (for development)

```bash
# Install dependencies (first time only)
npm install

# Start local dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production (Vercel does this automatically)
npm run build
```

---

## Project Structure

```
primed/
├── public/
│   └── favicon.svg          # Hard hat icon
├── src/
│   ├── App.jsx              # Entire application (all screens + components)
│   └── main.jsx             # React entry point
├── index.html               # HTML shell
├── package.json             # Dependencies
├── vite.config.js           # Build config
├── vercel.json              # Vercel routing config
└── .gitignore
```

---

## Future Backend Connections

When ready to move beyond mock data, these are the pieces to connect:

| Feature | Service |
|---|---|
| Persistent database | Supabase (PostgreSQL) |
| Email notifications | SendGrid |
| SMS notifications | Twilio |
| Authentication / login | Supabase Auth or Auth0 |
| Real employee/project data | Replace mock arrays in `App.jsx` with API calls |

Each can be added independently without taking the app offline.

---

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Vercel** — Hosting + auto-deploy
- **Google Fonts** — Barlow Condensed, IBM Plex Mono, Barlow
- No CSS framework — all styles are inline React styles
