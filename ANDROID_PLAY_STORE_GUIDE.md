# SkillUp Academy · Official Android & Google Play Publishing Guide
**Created by Tayo Verse Studios**

---

## 📱 Executive Overview

The **SkillUp Academy** web platform has been fully packaged into a native Android application using **Capacitor 7**, configured specifically for both direct device installation (**APK**) and official **Google Play Store** distribution (**AAB**).

- **Application Name**: `SkillUp Academy`
- **Application ID / Package**: `com.tayoverse.skillupacademy`
- **Version Name**: `1.0.0`
- **Version Code**: `1`
- **Target Platform**: Android 14+ (API 34 / 35), Min SDK: Android 5.1 (API 22)
- **Orientation**: Portrait locked for mobile ergonomics
- **Permissions**: `INTERNET`, `ACCESS_NETWORK_STATE` (minimal, secure, Play Store compliant)
- **Brand Identity**: Deep Navy (`#14213D`), Purple (`#7057D9`), Teal (`#35B8A0`)

---

## 📦 What Has Been Configured

1. **Native Android Project Directory (`android/`)**:
   - Ready-to-build Gradle structure with wrapper (`gradlew` & `gradlew.bat`).
   - `android/app/src/main/AndroidManifest.xml` configured with screen orientation, internet permissions, deep links, and FileProvider.
   - `android/app/build.gradle` configured with release signing config support and namespace `com.tayoverse.skillupacademy`.
   - `android/app/src/main/res/values/colors.xml` and `ic_launcher_background.xml` synced to official brand colors.

2. **Standardized Android Density App Icons**:
   - `mipmap-ldpi` (36×36 px)
   - `mipmap-mdpi` (48×48 px)
   - `mipmap-hdpi` (72×72 px)
   - `mipmap-xhdpi` (96×96 px)
   - `mipmap-xxhdpi` (144×144 px)
   - `mipmap-xxxhdpi` (192×192 px)
   - `public/icons/playstore-icon-512.png` (512×512 px 32-bit PNG with no alpha required for Google Play Console).

3. **Splash Screens**:
   - Tailored portrait and landscape splash screens for all density buckets (`drawable-port-*` and `drawable-land-*`).

4. **1-Click Download Route**:
   - Directly downloadable as a complete ZIP bundle at:
     `/api/download/android-project.zip`

5. **Cloud CI/CD Workflow**:
   - `.github/workflows/android-build.yml` enables automated compiling of both `.apk` and `.aab` in the cloud without needing a PC or Android Studio!

6. **Native Mobile Haptic Feedback (`@capacitor/haptics`)**:
   - Integrated tactile feedback on mobile devices for completing quizzes, submitting project deliverables, claiming verified certificates, and navigating courses. Includes automatic fallback to HTML5 Web Vibration API.

7. **Workbox Service Worker & Offline Course Access**:
   - Configured with `NetworkFirst` caching for course content, learning paths, quizzes, and project data, allowing seamless offline access on flights, commutes, or intermittent connectivity. Static assets, fonts, and icons are precached.

---

## 🚀 How to Generate the APK & AAB Files

You have **two simple options** to generate the final installable files:

### Option 1: Automated Free Cloud Build with GitHub Actions (Recommended for Mobile Users)
*No computer, Android Studio, or Java installation required!*

1. Push or import this repository to your **GitHub** account.
2. In your GitHub repository, click on the **Actions** tab.
3. Select the workflow titled **"Build SkillUp Academy Android APK & AAB"** from the left sidebar.
4. Click **Run workflow** > select `main` branch > click the green **Run workflow** button.
5. In approximately 3 to 4 minutes, the job will finish.
6. Under the completed run's **Artifacts** section, you will see two downloadable files:
   - **`SkillUp-Academy-Debug-APK`**: Contains `app-debug.apk` (ready to download and install straight onto your Android phone).
   - **`SkillUp-Academy-PlayStore-AAB`**: Contains `app-release.aab` (ready to upload to Google Play Console).

---

### Option 2: Build with Android Studio or Command Line (On Mac/Windows/Linux)

1. Download the Android project zip from `/api/download/android-project.zip` or clone the repository.
2. Open **Android Studio** and choose **Open**, then select the `android/` folder.
3. Allow Gradle to sync.
4. **To generate testing APK**:
   - In Android Studio menu: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - Or run in terminal:
     ```bash
     cd android
     ./gradlew assembleDebug
     ```
   - Output path: `android/app/build/outputs/apk/debug/app-debug.apk`.
5. **To generate Google Play Store AAB Bundle**:
   - In Android Studio menu: **Build** > **Generate Signed Bundle / APK** > select **Android App Bundle**.
   - Or run in terminal:
     ```bash
     cd android
     ./gradlew bundleRelease
     ```
   - Output path: `android/app/build/outputs/bundle/release/app-release.aab`.

---

## 📲 How to Install & Test the APK on an Android Phone

1. Transfer or download `app-debug.apk` directly to your Android device (via WhatsApp, Google Drive, Email, or USB).
2. Tap on `app-debug.apk` on your phone to open the installer.
3. If Android shows a warning saying **"For your security, your phone is not allowed to install unknown apps from this source"**:
   - Tap **Settings** on the prompt.
   - Toggle **Allow from this source** to **ON**.
   - Tap back and press **Install**.
4. Tap **Open** to launch **SkillUp Academy**.
5. Experience the full native mobile experience:
   - Custom app icon on your home screen.
   - SkillUp Academy splash screen.
   - Smooth navigation, courses, AI mentor, quizzes, and Paystack test payment checkout.

---

## 🔑 Generating a Java KeyStore (JKS) File for App Signing

Before publishing your release Android App Bundle (`.aab`) to the Google Play Store, it must be signed with a secure private release key.

### The `keytool` Command
`keytool` is a standard command-line utility bundled with the Java Development Kit (JDK). Run this command in your terminal:

```bash
keytool -genkey -v -keystore skillup-release-key.jks -alias skillup-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Parameter Breakdown
| Flag | Example Value | Description |
| :--- | :--- | :--- |
| `-genkey` / `-genkeypair` | *flag* | Generates a new key pair (public and private key). |
| `-v` | *flag* | Verbose output during key generation. |
| `-keystore` | `skillup-release-key.jks` | The filename of your output keystore file. |
| `-alias` | `skillup-key-alias` | A friendly alias identifier for this specific key inside the keystore. |
| `-keyalg` | `RSA` | Key algorithm (`RSA` is required by Google Play). |
| `-keysize` | `2048` | Key length in bits (2048-bit minimum required for security). |
| `-validity` | `10000` | Validity period in days (~27 years; Google Play requires keys valid beyond October 2033). |

### Interactive Prompts During Execution
When you run the command, `keytool` will prompt you for the following inputs:
1. **Keystore password**: Create a strong password (at least 8-12 characters). Note this down safely!
2. **What is your first and last name?**: e.g., `Tayo Verse Studios Admin` or your personal name.
3. **What is the name of your organizational unit?**: e.g., `Mobile Engineering`.
4. **What is the name of your organization?**: `Tayo Verse Studios`.
5. **What is the name of your City or Locality?**: e.g., `Lagos`.
6. **What is the name of your State or Province?**: e.g., `Lagos State`.
7. **What is the two-letter country code for this unit?**: `NG` (or your country's ISO 2-letter code).
8. **Is CN=..., OU=..., O=... correct?**: Type `yes` and press Enter.
9. **Key password**: Press Enter to use the same password as the keystore (recommended).

### Connecting the Keystore to the Android Build
The `android/app/build.gradle` file in this project is pre-configured to automatically pick up release signing credentials if defined.

1. Move `skillup-release-key.jks` into the `android/app/` folder.
2. In `android/gradle.properties` (or your local environment), add:
```properties
MYAPP_RELEASE_STORE_FILE=skillup-release-key.jks
MYAPP_RELEASE_KEY_ALIAS=skillup-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_keystore_password
```
3. Run `./gradlew bundleRelease` to generate a production-ready signed `.aab` file!

> ⚠️ **Critical Security Warning**: Never commit `skillup-release-key.jks` or passwords to a public GitHub repository. Keep a secure offline backup of your `.jks` file and passwords. Google Play utilizes **Play App Signing**, but having your original upload key ensures continuous release capability.

---

## 🏛️ Google Play Store Listing & Asset Checklist

### 1. Visual Graphic Assets & Dimensions

| Asset | Exact Dimensions | Format & Constraints | Purpose & Recommendations |
| :--- | :--- | :--- | :--- |
| **App Icon** | **512 × 512 px** | 32-bit PNG, max 1 MB, no alpha transparency | Launcher icon on Play Store search and detail pages. (Pre-generated at `public/icons/playstore-icon-512.png`). |
| **Feature Graphic** | **1024 × 500 px** | JPEG or 24-bit PNG (no alpha), max 15 MB | Displayed at the top of your store listing. Use brand navy background (`#14213D`), SkillUp logo, and bold tagline. Avoid putting text near edges. |
| **Phone Screenshots** | **1080 × 1920 px** or **1080 × 2400 px** | JPEG or 24-bit PNG (no alpha), min 2, max 8 screenshots, min 320 px, max 3840 px per side | Capture key screens: Home, Course Catalog, Video Lesson Player, AI Learning Mentor, Capstone Projects, and Certificate Verification. |
| **7-Inch Tablet Screenshots** | **1200 × 1920 px** (Portrait) or **1920 × 1200 px** (Landscape) | Min 1, max 8 screenshots, 16:10 or 16:9 ratio | Showcases adaptive responsiveness on compact tablets like Samsung Tab A7 / Amazon Fire. |
| **10-Inch Tablet Screenshots** | **1600 × 2560 px** (Portrait) or **2560 × 1600 px** (Landscape) | Min 1, max 8 screenshots, 16:10 ratio | Highlights spacious multi-column layout on larger tablets. |
| **Promotional Video** *(Optional)* | 16:9 YouTube Video URL | YouTube link (monetization disabled) | 30-90 second walkthrough of SkillUp Academy learning experience. |

### 2. Store Listing Copy & Text

| Field | Character Limit | Suggested Copy for SkillUp Academy |
| :--- | :--- | :--- |
| **App Title** | Up to 30 chars | `SkillUp Academy` |
| **Short Description** | Up to 80 chars | `Learn digital skills, build portfolios, and earn income with SkillUp Academy.` |
| **Full Description** | Up to 4,000 chars | *See full description template below.* |

#### Full Description Template
```markdown
SkillUp Academy by Tayo Verse Studios is a premier digital learning and career empowerment platform designed for ambitious builders, creators, and professionals.

Whether you are starting from scratch or leveling up your existing career, SkillUp Academy connects high-value digital education, hands-on capstone projects, verified credentials, and real-world freelance and remote work opportunities in one seamless mobile ecosystem.

WHAT YOU CAN DO ON SKILLUP ACADEMY:
• LEARN IN-DEMAND DIGITAL SKILLS: Master Artificial Intelligence, Prompt Engineering, Full-Stack Web & Mobile Development, UI/UX Design, Data Science, Digital Marketing, and Freelancing.
• LEARN BY DOING: Every course features practical code playgrounds, interactive quizzes, and downloadable resources.
• CAPSTONE PROJECTS & PORTFOLIOS: Complete practical projects and showcase them in your verified public portfolio to impress clients and recruiters.
• AI LEARNING MENTOR: Get instant, 24/7 personalized explanations, code debugging, and quiz tutoring powered by advanced Gemini AI.
• VERIFIED CERTIFICATES: Earn shareable, verifiable certificates upon course completion to validate your expertise on LinkedIn and resumes.
• MONETIZE YOUR SKILLS: Access freelance blueprints, client pitching strategies, and international remote job opportunities tailored for African and global talent.

Download SkillUp Academy today. Learn valuable skills, build your portfolio, and take control of your digital future!
```

### 3. Store Categorization & Contact Data
- **Application Category**: Education / Career Development / Productivity
- **Tags**: Online Courses, Programming, Design, AI, Freelancing, Career
- **Target Age Group**: 13 and older (General Audience)
- **Content Rating**: Complete IARC rating questionnaire (Typical result: PEGI 3 / Everyone)
- **Developer Contact Email**: `carfagnoj50@gmail.com` or your custom domain email
- **Privacy Policy URL**: `https://skillup-academy.com/privacy`

### 4. Data Safety Questionnaire Answers
- **Data Collected**:
  - Personal Information: Name, Email address (for user registration, progress saving, and certificate generation).
  - Financial Info: Handled securely by Paystack (PCI-DSS Level 1 compliant); the app does not store raw credit card numbers.
- **Security Practices**:
  - All data is encrypted in transit using standard HTTPS / TLS.
  - Users can request account and data deletion via support ticket.

---

## 🚀 Rebuilding and Publishing Release Bundle

When you are ready to upload:
1. Generate your `.aab` file:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
2. Find the output bundle at:
   `android/app/build/outputs/bundle/release/app-release.aab`
3. Upload to Google Play Console under **Production Releases**.
4. Submit for review!

---

## 🔒 Backend & Service Continuity

- **Express Server**: All API routes (`/api/courses`, `/api/progress`, `/api/paystack/*`, `/api/assistant/*`) are preserved and functional.
- **Paystack Test Gateway**: Configured for risk-free sandbox testing using sample cards, bank transfer simulation, and USSD.
- **Gemini AI Mentor**: Backed by `@google/genai` (model `gemini-3.8-flash`) with automatic pedagogical fallback if offline.
- **Creator Attribution**: Preserved as **Created by Tayo Verse Studios**.
