import { useState, useEffect } from 'react';
import { BreathingSettings } from '../types/theme';

type BreathingState = 'ready' | 'breathe-in' | 'hold' | 'breathe-out';

export function useBreathingTimer(settings: BreathingSettings, isActive: boolean) {
  const [breathingState, setBreathingState] = useState<BreathingState>('ready');
  const [timeLeft, setTimeLeft] = useState(4);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(settings.sessionDuration * 60);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          switch (breathingState) {
            case 'ready':
              setBreathingState('breathe-in');
              return settings.breathDuration;
            case 'breathe-in':
              setBreathingState('hold');
              return settings.holdDuration;
            case 'hold':
              setBreathingState('breathe-out');
              return settings.breathDuration;
            case 'breathe-out':
              setBreathingState('breathe-in');
              return settings.breathDuration;
          }
        }
        return prev - 1;
      });

      setSessionTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, breathingState, settings]);

  const resetExercise = () => {
    setBreathingState('ready');
    setTimeLeft(4);
    setSessionTimeLeft(settings.sessionDuration * 60);
  };

  const startExercise = () => {
    resetExercise();
  };

  const pauseExercise = () => {
    // Additional pause logic if needed
  };

  return {
    breathingState,
    timeLeft,
    sessionTimeLeft,
    resetExercise,
    startExercise,
    pauseExercise
  };
}