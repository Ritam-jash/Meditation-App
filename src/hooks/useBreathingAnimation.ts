import { useState, useEffect } from 'react';
import { BreathingSettings } from '../types/theme';

export function useBreathingAnimation(
  breathingState: 'ready' | 'breathe-in' | 'hold' | 'breathe-out',
  isActive: boolean,
  _settings: BreathingSettings
) {
  const [scale, setScale] = useState(1);
  const [prevState, setPrevState] = useState(breathingState);

  useEffect(() => {
    if (!isActive) {
      setScale(1);
      return;
    }

    if (breathingState !== prevState) {
      setPrevState(breathingState);
      
      if (breathingState === 'breathe-in') {
        setScale(1.25);
      } else if (breathingState === 'breathe-out') {
        setScale(0.75);
      } else if (breathingState === 'hold') {
        // Keep the previous scale during hold
        setScale(prevState === 'breathe-in' ? 1.25 : 0.75);
      }
    }
  }, [breathingState, isActive, prevState]);

  return { scale };
}