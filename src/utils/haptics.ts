import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * SkillUp Academy Haptic Feedback Engine
 * Created by Tayo Verse Studios
 * 
 * Provides native Capacitor tactile feedback on Android & iOS mobile devices
 * with graceful fallback to the Web Vibration API where supported.
 */

export const triggerHaptic = {
  /**
   * Light impact: For standard interactive actions like selecting options,
   * tapping quiz choices, and navigating tabs.
   */
  light: async (): Promise<void> => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(10);
        } catch {
          // ignore vibration errors
        }
      }
    }
  },

  /**
   * Medium impact: For purposeful actions like toggling lesson completion,
   * bookmarking, or opening drawers.
   */
  medium: async (): Promise<void> => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(25);
        } catch {
          // ignore vibration errors
        }
      }
    }
  },

  /**
   * Heavy impact: For major state changes or milestone completions.
   */
  heavy: async (): Promise<void> => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(50);
        } catch {
          // ignore vibration errors
        }
      }
    }
  },

  /**
   * Success notification: Triggered on passing a quiz, submitting a project,
   * unlocking a verified certificate, or completing payment.
   */
  success: async (): Promise<void> => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          // Distinct success pulse: short pulse, gap, longer confirm pulse
          navigator.vibrate([30, 50, 60]);
        } catch {
          // ignore vibration errors
        }
      }
    }
  },

  /**
   * Warning notification: For incomplete requirements or retrying quizzes.
   */
  warning: async (): Promise<void> => {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 40, 40]);
        } catch {
          // ignore vibration errors
        }
      }
    }
  },

  /**
   * Error notification: For failed quiz submissions or form errors.
   */
  error: async (): Promise<void> => {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([60, 40, 80]);
        } catch {
          // ignore vibration errors
        }
      }
    }
  },

  /**
   * Selection changed: For subtle haptic ticks during wheel or tab navigation.
   */
  selectionChanged: async (): Promise<void> => {
    try {
      await Haptics.selectionChanged();
    } catch {
      // noop
    }
  }
};
