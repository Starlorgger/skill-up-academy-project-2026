import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Workbox service worker for offline course content and static assets
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[SkillUp PWA] Workbox: New content ready, refreshing.');
  },
  onOfflineReady() {
    console.log('[SkillUp PWA] Workbox: Offline access active for course content and static assets.');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
