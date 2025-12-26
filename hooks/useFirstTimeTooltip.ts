import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOOLTIP_KEYS = {
  FLOATING_BUTTON: '@tooltip_floating_button',
  BUSINESS_CARD: '@tooltip_business_card',
  ADD_BUSINESS: '@tooltip_add_business',
  COPY_SHEET: '@tooltip_copy_sheet',
};

export function useFirstTimeTooltip(tooltipKey: keyof typeof TOOLTIP_KEYS) {
  const [shouldShow, setShouldShow] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    try {
      const key = TOOLTIP_KEYS[tooltipKey];
      const hasSeenTooltip = await AsyncStorage.getItem(key);

      if (!hasSeenTooltip) {
        // Wait a bit before showing tooltip (better UX)
        setTimeout(() => {
          setShouldShow(true);
        }, 500);
      }

      setIsReady(true);
    } catch (error) {
      console.error('Error checking tooltip state:', error);
      setIsReady(true);
    }
  };

  const dismissTooltip = async () => {
    try {
      const key = TOOLTIP_KEYS[tooltipKey];
      await AsyncStorage.setItem(key, 'true');
      setShouldShow(false);
    } catch (error) {
      console.error('Error saving tooltip state:', error);
    }
  };

  const resetTooltip = async () => {
    try {
      const key = TOOLTIP_KEYS[tooltipKey];
      await AsyncStorage.removeItem(key);
      setShouldShow(true);
    } catch (error) {
      console.error('Error resetting tooltip:', error);
    }
  };

  return { shouldShow, isReady, dismissTooltip, resetTooltip };
}