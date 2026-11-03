# SkillUp Academy — GitHub Repository & Push Guide

> **Official Creator**: Created by Tayo Verse Studios  
> **Application**: SkillUp Academy (Enterprise Full-Stack Digital Skills Platform)  
> **Tech Stack**: React 19, TypeScript, Tailwind CSS, Express, Vite, Paystack, Capacitor Mobile (Android/iOS), Gemini AI API

---

## 🚀 How to Push SkillUp Academy to Your GitHub Account

Follow these steps to host your SkillUp Academy project on your personal or organization GitHub account:

### Step 1: Create a New Empty Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Choose a repository name (e.g. `skillup-academy`).
3. Set visibility to **Public** or **Private**.
4. **IMPORTANT**: Leave "Add a README file", "Add .gitignore", and "Choose a license" **UNCHECKED** (the project already contains these pre-configured).
5. Click **Create repository**.
6. Copy the repository URL (e.g., `https://github.com/your-username/skillup-academy.git`).

---

### Step 2: Push Using Automated Script (Fastest)

If you downloaded or extracted the project, open your terminal in the project directory and run:

```bash
chmod +x scripts/push-to-github.sh
./scripts/push-to-github.sh https://github.com/your-username/skillup-academy.git
```

The script will automatically initialize Git, stage all files, commit them, link your remote, and push to `main`.

---

### Step 3: Manual Push Using Terminal Commands

Alternatively, run these standard Git commands step-by-step:

```bash
# 1. Initialize git in the project root
git init

# 2. Set default branch to main
git branch -M main

# 3. Stage all source files (node_modules and dist are safely ignored by .gitignore)
git add .

# 4. Create your initial commit
git commit -m "feat: initial commit of SkillUp Academy full-stack platform"

# 5. Link your GitHub repository remote
git remote add origin https://github.com/your-username/skillup-academy.git

# 6. Push your project to GitHub
git push -u origin main
```

---

## 🔑 Authentication with GitHub

When prompted for credentials during `git push`:
- **Username**: Your GitHub username.
- **Password**: Use a **Personal Access Token (classic or fine-grained)** with `repo` permissions, NOT your account password (GitHub deprecated password authentication for Git CLI operations).
- To create a token: Go to **GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate New Token** (select `repo` scope).
- If using SSH: Use `git@github.com:your-username/skillup-academy.git` instead of HTTPS.

---

## 📦 What's Included in This Repository

| Directory / File | Description |
| :--- | :--- |
| `src/` | Complete React 19 single-page app, modular views, components, and contexts |
| `server.ts` | Express full-stack API (Gemini AI proxy, Paystack integration, metrics, downloads) |
| `android/` | Full native Android Studio & Capacitor project for Google Play Store (.aab build) |
| `public/` | PWA manifest, service worker assets, offline fallback, SVG & PNG app icons |
| `scripts/` | Helper scripts: `push-to-github.sh`, `generate-android-assets.js` |
| `Dockerfile` | Multi-stage Docker container build for Google Cloud Run, Railway, Render |
| `twa-manifest.json` | Google Bubblewrap configuration for Play Store Trusted Web Activity |
| `DEPLOYMENT.md` | Comprehensive production deployment manual for Cloud Run and Google Play |
| `ANDROID_PLAY_STORE_GUIDE.md` | Step-by-step Google Play Developer Console checklist and keystore generation |

---

## 🌐 Deploying Directly From GitHub

Once pushed to GitHub, you can link the repository to popular cloud hosting platforms for automatic CI/CD:
- **Google Cloud Run**: Continuous deployment from GitHub repo with Google Cloud Build.
- **Render**: Create a new Web Service → Select your GitHub repo → Build command: `npm run build` → Start command: `npx tsx server.ts`.
- **Railway**: Click "New Project" → "Deploy from GitHub repo" → Railway automatically detects the `Dockerfile` or `Procfile`.
- **Vercel / Netlify**: Connect repo for static client hosting.
