import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resDir = path.resolve(__dirname, '../android/app/src/main/res');

// Standardized icon sizes across all Android density buckets
const iconSizes = {
  'mipmap-ldpi': 36,
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

// Adaptive foreground sizes (108dp base grid)
const foregroundSizes = {
  'mipmap-ldpi': 81,
  'mipmap-mdpi': 108,
  'mipmap-hdpi': 162,
  'mipmap-xhdpi': 216,
  'mipmap-xxhdpi': 324,
  'mipmap-xxxhdpi': 432,
};

// SVG templates reflecting SkillUp Academy brand: Deep Navy (#14213D), Elegant Purple (#7057D9), Soft Teal (#35B8A0)
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14213D"/>
      <stop offset="50%" stop-color="#1b2a4a"/>
      <stop offset="100%" stop-color="#0c1626"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8e78f0"/>
      <stop offset="50%" stop-color="#7057D9"/>
      <stop offset="100%" stop-color="#553dbb"/>
    </linearGradient>
    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4eecd0"/>
      <stop offset="100%" stop-color="#35B8A0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="512" height="512" rx="108" fill="url(#bgGrad)"/>
  <rect width="504" height="504" x="4" y="4" rx="104" fill="none" stroke="#7057D9" stroke-width="6" stroke-opacity="0.45"/>

  <!-- Subtle ambient glow -->
  <circle cx="256" cy="256" r="140" fill="#7057D9" opacity="0.3" filter="url(#glow)"/>

  <!-- SkillUp Academy Graduation Cap & 'S' Ribbon -->
  <g transform="translate(256, 256) scale(0.92) translate(-256, -256)">
    <path d="M 330 155 C 330 155, 190 145, 175 220 C 160 285, 340 280, 335 345 C 330 405, 180 400, 160 365" 
          fill="none" 
          stroke="url(#purpleGrad)" 
          stroke-width="52" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>

    <path d="M 325 340 C 320 395, 195 395, 175 365" 
          fill="none" 
          stroke="url(#tealGrad)" 
          stroke-width="24" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>

    <polygon points="256,105 320,135 256,165 192,135" fill="url(#tealGrad)" filter="url(#glow)"/>
    <circle cx="256" cy="135" r="8" fill="#F8F9FC"/>

    <path d="M 390 110 Q 390 135 415 135 Q 390 135 390 160 Q 390 135 365 135 Q 390 135 390 110 Z" 
          fill="url(#tealGrad)" 
          filter="url(#glow)"/>
    <circle cx="390" cy="135" r="3" fill="#ffffff"/>
  </g>
</svg>
`;

const roundIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGradR" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14213D"/>
      <stop offset="50%" stop-color="#1b2a4a"/>
      <stop offset="100%" stop-color="#0c1626"/>
    </linearGradient>
    <linearGradient id="purpleGradR" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8e78f0"/>
      <stop offset="50%" stop-color="#7057D9"/>
      <stop offset="100%" stop-color="#553dbb"/>
    </linearGradient>
    <linearGradient id="tealGradR" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4eecd0"/>
      <stop offset="100%" stop-color="#35B8A0"/>
    </linearGradient>
    <clipPath id="circleClip">
      <circle cx="256" cy="256" r="252"/>
    </clipPath>
  </defs>

  <g clip-path="url(#circleClip)">
    <rect width="512" height="512" fill="url(#bgGradR)"/>
    <circle cx="256" cy="256" r="250" fill="none" stroke="#7057D9" stroke-width="6" stroke-opacity="0.45"/>
    <circle cx="256" cy="256" r="140" fill="#7057D9" opacity="0.3"/>

    <g transform="translate(256, 256) scale(0.85) translate(-256, -256)">
      <path d="M 330 155 C 330 155, 190 145, 175 220 C 160 285, 340 280, 335 345 C 330 405, 180 400, 160 365" 
            fill="none" 
            stroke="url(#purpleGradR)" 
            stroke-width="52" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>

      <path d="M 325 340 C 320 395, 195 395, 175 365" 
            fill="none" 
            stroke="url(#tealGradR)" 
            stroke-width="24" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>

      <polygon points="256,105 320,135 256,165 192,135" fill="url(#tealGradR)"/>
      <circle cx="256" cy="135" r="8" fill="#F8F9FC"/>

      <path d="M 390 110 Q 390 135 415 135 Q 390 135 390 160 Q 390 135 365 135 Q 390 135 390 110 Z" 
            fill="url(#tealGradR)"/>
    </g>
  </g>
</svg>
`;

const foregroundSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="purpleGradF" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8e78f0"/>
      <stop offset="50%" stop-color="#7057D9"/>
      <stop offset="100%" stop-color="#553dbb"/>
    </linearGradient>
    <linearGradient id="tealGradF" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4eecd0"/>
      <stop offset="100%" stop-color="#35B8A0"/>
    </linearGradient>
  </defs>

  <!-- Transparent background for adaptive icon foreground (scaled into Android 66% safe zone) -->
  <g transform="translate(256, 256) scale(0.66) translate(-256, -256)">
    <path d="M 330 155 C 330 155, 190 145, 175 220 C 160 285, 340 280, 335 345 C 330 405, 180 400, 160 365" 
          fill="none" 
          stroke="url(#purpleGradF)" 
          stroke-width="52" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>

    <path d="M 325 340 C 320 395, 195 395, 175 365" 
          fill="none" 
          stroke="url(#tealGradF)" 
          stroke-width="24" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>

    <polygon points="256,105 320,135 256,165 192,135" fill="url(#tealGradF)"/>
    <circle cx="256" cy="135" r="8" fill="#F8F9FC"/>

    <path d="M 390 110 Q 390 135 415 135 Q 390 135 390 160 Q 390 135 365 135 Q 390 135 390 110 Z" 
          fill="url(#tealGradF)"/>
    <circle cx="390" cy="135" r="3" fill="#ffffff"/>
  </g>
</svg>
`;

async function generateAssets() {
  console.log('Generating standardized Android app icons across ldpi, mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi...');

  for (const [folder, size] of Object.entries(iconSizes)) {
    const dir = path.join(resDir, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 1. Standard App Icon
    await sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(dir, 'ic_launcher.png'));

    // 2. Round App Icon
    await sharp(Buffer.from(roundIconSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(dir, 'ic_launcher_round.png'));

    // 3. Adaptive Foreground Icon
    const fgSize = foregroundSizes[folder] || Math.round(size * 1.5);
    await sharp(Buffer.from(foregroundSvg))
      .resize(fgSize, fgSize)
      .png()
      .toFile(path.join(dir, 'ic_launcher_foreground.png'));

    console.log(`✓ Generated ${folder} (${size}x${size})`);
  }

  // Also generate 512x512 Google Play Store Icon
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.resolve(__dirname, '../public/icons/playstore-icon-512.png'));
  console.log('✓ Generated Google Play Store Icon (512x512 PNG)');

  // Generate splash screen assets
  const splashSizes = {
    'drawable-port-mdpi': [320, 480],
    'drawable-port-hdpi': [480, 800],
    'drawable-port-xhdpi': [720, 1280],
    'drawable-port-xxhdpi': [960, 1600],
    'drawable-port-xxxhdpi': [1280, 1920],
    'drawable-land-mdpi': [480, 320],
    'drawable-land-hdpi': [800, 480],
    'drawable-land-xhdpi': [1280, 720],
    'drawable-land-xxhdpi': [1600, 960],
    'drawable-land-xxxhdpi': [1920, 1280],
  };

  for (const [folder, [width, height]] of Object.entries(splashSizes)) {
    const dir = path.join(resDir, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const iconOverlaySize = Math.min(width, height) * 0.35;
    const resizedIcon = await sharp(Buffer.from(iconSvg))
      .resize(Math.round(iconOverlaySize), Math.round(iconOverlaySize))
      .png()
      .toBuffer();

    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 20, g: 33, b: 61, alpha: 1 } // #14213D
      }
    })
      .composite([{ input: resizedIcon, gravity: 'center' }])
      .png()
      .toFile(path.join(dir, 'splash.png'));

    console.log(`✓ Generated splash for ${folder} (${width}x${height})`);
  }

  console.log('All standardized Android icons and splash assets successfully generated!');
}

generateAssets().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
