# SkillUp Academy — Production Deployment & Google Play Store Guide

> **Official Creator**: Created by Tayo Verse Studios  
> **Application**: SkillUp Academy (Full-Stack Digital Learning & Monetization Platform)  
> **Tech Stack**: React 19, TypeScript, Tailwind CSS, Express, Vite, Paystack Test/Live, Gemini AI API

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Local Production Build & Testing](#2-local-production-build--testing)
3. [Environment Variables Blueprint](#3-environment-variables-blueprint)
4. [Cloud Deployment Options](#4-cloud-deployment-options)
   - [A. Google Cloud Run (Recommended)](#a-google-cloud-run-recommended)
   - [B. Render / Railway / Fly.io](#b-render--railway--flyio)
   - [C. Docker Container Run](#c-docker-container-run)
5. [Publishing to the Google Play Store (Android TWA)](#5-publishing-to-the-google-play-store-android-twa)
   - [Step 1: Domain & SSL Setup](#step-1-domain--ssl-setup)
   - [Step 2: Generate Signed Android App Bundle (.aab) with Bubblewrap or PWABuilder](#step-2-generate-signed-android-app-bundle-aab)
   - [Step 3: Digital Asset Links Verification (`assetlinks.json`)](#step-3-digital-asset-links-verification)
   - [Step 4: Google Play Developer Console Upload](#step-4-google-play-developer-console-upload)
6. [Switching Paystack from Test to Live Mode](#6-switching-paystack-from-test-to-live-mode)
7. [PWA Offline & Mobile App Verification](#7-pwa-offline--mobile-app-verification)

---

## 1. Architecture Overview

SkillUp Academy is built as an enterprise full-stack web application:
- **Client (`src/`)**: Single-page application built on React 19, Tailwind CSS, and Recharts.
- **Server (`server.ts`)**: Express backend hosting the Gemini AI Mentor proxy, Paystack payment verification endpoints, revenue analytics, and static asset serving in production.
- **PWA Engine (`public/`)**: Web App Manifest (`manifest.json`), service worker icons (192px, 512px, maskable), and Digital Asset Links (`.well-known/assetlinks.json`).

---

## 2. Local Production Build & Testing

Run these commands locally to verify the production build before pushing to your server:

```bash
# 1. Install dependencies
npm install

# 2. Compile TypeScript and build Vite client bundle
npm run build

# 3. Test production server locally
NODE_ENV=production PORT=3000 npm start
```

Visit `http://localhost:3000` to verify:
- Navigation across Courses, Paths, Projects, Jobs, Freelance, and Monitor.
- AI Mentor response via backend proxy.
- Paystack test payments (Card `4084 0000 0000 1234`, PIN `123456`, Bank Transfer simulation).

---

## 3. Environment Variables Blueprint

Create a `.env` file on your production host with the following keys:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Production environment flag | `production` |
| `PORT` | Web server listening port | `3000` (or injected by Cloud host) |
| `GEMINI_API_KEY` | Google Gemini AI Key for Learning Mentor | `AIzaSy...` |
| `APP_URL` | Public production domain | `https://skillup-academy.com` |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key (pk_test_ or pk_live_) | `pk_live_xxxx` |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (sk_test_ or sk_live_) | `sk_live_xxxx` |

---

## 4. Cloud Deployment Options

### A. Google Cloud Run (Recommended)

1. **Install Google Cloud SDK** (`gcloud`) and authenticate:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Deploy directly with Google Cloud Build & Run**:
   ```bash
   gcloud run deploy skillup-academy \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production,GEMINI_API_KEY="YOUR_KEY",APP_URL="https://YOUR_SERVICE_URL"
   ```

3. Cloud Run automatically scales to zero when idle and provisions an SSL certificate.

---

### B. Render / Railway / Fly.io

SkillUp Academy includes a pre-configured `Procfile` and `Dockerfile`.

#### On Render:
1. Connect your GitHub repository.
2. Select **Web Service**.
3. Set **Runtime** to `Node` (or `Docker`).
4. Build Command: `npm install && npm run build`
5. Start Command: `npx tsx server.ts`
6. Add your environment variables in the **Environment** tab.

#### On Railway:
1. Click **New Project** > **Deploy from GitHub repo**.
2. Railway will automatically detect the `Dockerfile` or `Procfile`.
3. Add `GEMINI_API_KEY`, `PAYSTACK_PUBLIC_KEY`, and `PAYSTACK_SECRET_KEY` in **Variables**.

---

### C. Docker Container Run

SkillUp Academy includes a production-grade multi-stage `Dockerfile`:

```bash
# Build Docker image
docker build -t skillup-academy:latest .

# Run container
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e GEMINI_API_KEY="YOUR_KEY" \
  -e APP_URL="https://yourdomain.com" \
  --name skillup-app skillup-academy:latest
```

---

## 5. Publishing to the Google Play Store (Android TWA)

SkillUp Academy is architected as an installable PWA that converts directly into a native Android App using Google's **Trusted Web Activity (TWA)** standard. In a TWA, your app runs in standalone full-screen with zero browser address bar, access to push notifications, and home screen launch.

### Step 1: Domain & SSL Setup
Your application **must be deployed on an HTTPS domain** (e.g. `https://skillup-academy.com` or your Cloud Run / Render URL).

### Step 2: Generate Signed Android App Bundle (.aab)

You can choose either **Option 1 (PWABuilder - UI)** or **Option 2 (Bubblewrap CLI - Terminal)**.

#### Option 1: Using PWABuilder (Easiest - 1 Click)
1. Go to [https://www.pwabuilder.com](https://www.pwabuilder.com).
2. Enter your deployed URL (e.g., `https://skillup-academy.com`).
3. PWABuilder will evaluate your manifest, service worker, and icons (already 100% compliant).
4. Click **Package for Stores** > **Android**.
5. Configure package name: `com.tayoverse.skillupacademy`.
6. Click **Generate Package**. PWABuilder will output a signed `.aab` file and your `assetlinks.json`.

#### Option 2: Using Google's Bubblewrap CLI (Official Google Tool)
SkillUp Academy includes a pre-configured `twa-manifest.json`.

```bash
# 1. Install Google Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize project using twa-manifest.json
bubblewrap init --manifest=https://your-domain.com/manifest.json

# 3. Build signed Android App Bundle (.aab)
bubblewrap build
```

This generates `app-release-bundle.aab` and your release keystore `android.keystore`.

---

### Step 3: Digital Asset Links Verification (`assetlinks.json`)

Google Play requires your domain to verify that you own the app so the browser URL bar is completely hidden.

1. Locate your **SHA-256 fingerprint** from your release keystore:
   ```bash
   keytool -list -v -keystore android.keystore -alias skillup
   ```
   (Or copy the SHA-256 fingerprint from the **App Signing** page in Google Play Console).

2. Open `/public/.well-known/assetlinks.json` in this repository and replace `REPLACE_WITH_YOUR_RELEASE_KEYSTORE_SHA256_FINGERPRINT` with your actual fingerprint:
   ```json
   [
     {
       "relation": ["delegate_permission/common.handle_all_urls"],
       "target": {
         "namespace": "android_app",
         "package_name": "com.tayoverse.skillupacademy",
         "sha256_cert_fingerprints": [
           "14:6D:E9:7D:..."
         ]
       }
     }
   ]
   ```

3. Deploy the update so that `https://your-domain.com/.well-known/assetlinks.json` is publicly accessible.

---

### Step 4: Google Play Developer Console Upload

1. Open the [Google Play Developer Console](https://play.google.com/console).
2. Click **Create app**:
   - **App name**: `SkillUp Academy`
   - **Default language**: English (United States) or English (Nigeria)
   - **App or game**: App
   - **Free or paid**: Free (In-app subscriptions handled by Paystack)
3. Under **Release** > **Production** (or **Closed testing**):
   - Upload `app-release-bundle.aab`.
4. Fill out Store Listing:
   - **Short description**: `Learn in-demand digital skills, build projects, and unlock careers.`
   - **Full description**: Mention AI Prompt Engineering, Software Engineering, UI/UX Design, and digital freelancing.
   - **App Icon**: 512x512 PNG (generated from `public/icons/icon-512.svg`).
   - **Feature Graphic**: 1024x500 PNG.
   - **Screenshots**: At least 4 phone screenshots (Course player, AI Mentor, Monitor, and Jobs Directory).
5. Complete **Content Rating** and **Target Audience** questionnaires.
6. Submit for review!

---

## 6. Switching Paystack from Test to Live Mode

When ready to collect real payments in Nigerian Naira (`₦`) or US Dollars (`$`):

1. Log into your [Paystack Dashboard](https://dashboard.paystack.com).
2. Complete your business compliance / KYC verification.
3. Switch the toggle from **Test Mode** to **Live Mode**.
4. Go to **Settings** > **API Keys & Webhooks**.
5. Copy your **Live Public Key** (`pk_live_...`) and **Live Secret Key** (`sk_live_...`).
6. Set them on your production server:
   ```env
   PAYSTACK_PUBLIC_KEY="pk_live_..."
   PAYSTACK_SECRET_KEY="sk_live_..."
   ```
7. Configure your Paystack Webhook URL:
   `https://your-domain.com/api/paystack/webhook`

---

## 7. PWA Offline & Mobile App Verification

- **Chrome / Android**: Tap browser menu (⋮) > **Install App**.
- **iOS Safari**: Tap **Share** > **Add to Home Screen**.
- **Desktop Chrome / Edge**: Click the install icon in the URL bar.
- Launching from the home screen opens SkillUp Academy in full standalone mode with no browser chrome.

---

*Official product of Tayo Verse Studios. All rights reserved.*
