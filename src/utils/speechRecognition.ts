import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { triggerHaptic } from './haptics';

/**
 * SkillUp Academy Voice Search & Speech Recognition Utility
 * Created by Tayo Verse Studios
 * 
 * Provides unified speech-to-text functionality supporting both:
 * 1. Native Capacitor Speech Recognition on Android & iOS devices
 * 2. Web Speech API (webkitSpeechRecognition) on modern desktop and mobile browsers
 */

export interface SpeechRecognitionHandlers {
  onStart?: () => void;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (errorMessage: string) => void;
  onEnd?: () => void;
}

export interface SpeechServiceStatus {
  isSupported: boolean;
  isNative: boolean;
  hasPermission: boolean;
}

/**
 * Check if speech recognition is available in the current environment
 */
export async function checkSpeechRecognitionStatus(): Promise<SpeechServiceStatus> {
  // Check native Capacitor plugin first
  try {
    const availableResult = await SpeechRecognition.available();
    if (availableResult && availableResult.available) {
      let hasPerm = false;
      try {
        const permResult = await SpeechRecognition.checkPermissions();
        hasPerm = permResult.speechRecognition === 'granted';
      } catch {
        hasPerm = false;
      }
      return {
        isSupported: true,
        isNative: true,
        hasPermission: hasPerm
      };
    }
  } catch {
    // Fall back to Web Speech API check
  }

  // Check browser Web Speech API
  if (typeof window !== 'undefined') {
    const hasWebSpeech = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    return {
      isSupported: hasWebSpeech,
      isNative: false,
      hasPermission: true // Handled by browser permission prompt
    };
  }

  return {
    isSupported: false,
    isNative: false,
    hasPermission: false
  };
}

/**
 * Request speech recognition audio recording permissions
 */
export async function requestSpeechPermissions(): Promise<boolean> {
  try {
    const perm = await SpeechRecognition.checkPermissions();
    if (perm.speechRecognition === 'granted') return true;

    const requestResult = await SpeechRecognition.requestPermissions();
    return requestResult.speechRecognition === 'granted';
  } catch {
    // Web Speech API will prompt automatically when started
    return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }
}

/**
 * Start listening for voice input and streaming transcription
 * Returns a cleanup / stop function
 */
export async function startVoiceRecognition(handlers: SpeechRecognitionHandlers): Promise<() => void> {
  let isStopped = false;
  let activeWebRecognizer: any = null;

  // Haptic feedback to indicate listening started
  triggerHaptic.medium();

  // Try Native Capacitor Speech Recognition first
  try {
    const available = await SpeechRecognition.available();
    if (available && available.available) {
      // Ensure permissions
      await requestSpeechPermissions();

      if (handlers.onStart) handlers.onStart();

      // Listen for partial and final matches
      await SpeechRecognition.addListener('partialResults', (data: { matches: string[] }) => {
        if (!isStopped && data.matches && data.matches.length > 0) {
          const text = data.matches[0];
          handlers.onResult(text, false);
        }
      });

      await SpeechRecognition.start({
        language: 'en-US',
        maxResults: 2,
        prompt: 'Search SkillUp Academy courses (e.g., Python, React, AI, Figma)...',
        partialResults: true,
        popup: false
      });

      return async () => {
        if (isStopped) return;
        isStopped = true;
        try {
          await SpeechRecognition.stop();
          await SpeechRecognition.removeAllListeners();
        } catch {
          // ignore cleanup errors
        }
        if (handlers.onEnd) handlers.onEnd();
      };
    }
  } catch (err: any) {
    console.warn('Native Capacitor speech recognition not active or unavailable, falling back to Web Speech API:', err?.message);
  }

  // Fallback: Standard Web Speech API (Chrome, Safari, Edge, Mobile Web)
  if (typeof window !== 'undefined') {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        const recognition = new SpeechRecognitionClass();
        activeWebRecognizer = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          if (handlers.onStart) handlers.onStart();
        };

        recognition.onresult = (event: any) => {
          if (isStopped) return;
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          const combined = (finalTranscript || interimTranscript).trim();
          if (combined) {
            handlers.onResult(combined, !!finalTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          if (isStopped) return;
          console.warn('Web speech recognition event error:', event.error);
          triggerHaptic.warning();
          if (handlers.onError) {
            const userFriendlyMsg = event.error === 'not-allowed'
              ? 'Microphone access was denied. Please allow microphone permissions.'
              : event.error === 'no-speech'
              ? 'No speech detected. Please try speaking again.'
              : `Voice search error: ${event.error}`;
            handlers.onError(userFriendlyMsg);
          }
        };

        recognition.onend = () => {
          if (!isStopped) {
            isStopped = true;
            if (handlers.onEnd) handlers.onEnd();
          }
        };

        recognition.start();

        return () => {
          if (isStopped) return;
          isStopped = true;
          try {
            recognition.stop();
          } catch {
            // ignore
          }
          if (handlers.onEnd) handlers.onEnd();
        };
      } catch (webErr: any) {
        console.error('Failed to initialize Web Speech API:', webErr);
      }
    }
  }

  // If neither is available
  if (handlers.onError) {
    handlers.onError('Voice recognition is not supported in this browser. Please use keyboard search or upgrade your browser.');
  }
  if (handlers.onEnd) handlers.onEnd();
  return () => {};
}
