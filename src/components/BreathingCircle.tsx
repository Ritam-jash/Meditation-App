import { useState } from 'react';
import { FiPlay, FiPause, FiRotateCcw, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { BreathingSettings } from '../types/theme';
import { useBreathingAnimation } from '../hooks/useBreathingAnimation';
import { useBreathingTimer } from '../hooks/useBreathingTimer';
import { useAudio } from '../hooks/useAudio';

interface BreathingCircleProps {
  settings: BreathingSettings;
  onSettingsChange: (settings: BreathingSettings) => void;
}

export function BreathingCircle({ settings, onSettingsChange }: BreathingCircleProps) {
  const [isActive, setIsActive] = useState(false);
  const { 
    breathingState, 
    timeLeft, 
    sessionTimeLeft, 
    resetExercise,
    startExercise,
    pauseExercise
  } = useBreathingTimer(settings, isActive);
  
  const { scale } = useBreathingAnimation(breathingState, isActive, settings);
  const { toggleMute, isMuted } = useAudio(isActive);

  const toggleExercise = () => {
    if (!isActive) {
      startExercise();
    } else {
      pauseExercise();
    }
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <div 
          className="absolute inset-0 rounded-full border-4 border-white bg-black/30 backdrop-blur-sm
            flex items-center justify-center"
          style={{
            transform: `scale(${scale})`,
            transition: breathingState === 'hold' ? 'none' : `transform ${settings.breathDuration}s cubic-bezier(0.4, 0, 0.2, 1)`
          }}
        >
          <div className="text-center text-white">
            <div className="text-3xl font-light">
              {breathingState === 'ready' ? 'Ready' :
               breathingState === 'breathe-in' ? 'Breathe In' :
               breathingState === 'hold' ? 'Hold' : 'Breathe Out'}
            </div>
            <div className="text-xl">{timeLeft}s</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={toggleExercise}
          className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
        >
          {isActive ? <FiPause size={20} /> : <FiPlay size={20} />}
        </button>
        <button
          onClick={resetExercise}
          className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
        >
          <FiRotateCcw size={20} />
        </button>
        <button
          onClick={toggleMute}
          className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
        >
          {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
        </button>
      </div>

      <div className="mt-4 text-xl text-white">{formatTime(sessionTimeLeft)}</div>

      <div className="mt-8 p-4 rounded-lg bg-black/30 backdrop-blur-sm text-white">
        <h3 className="text-lg font-semibold mb-4">Breathing Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm">Breath Duration: {settings.breathDuration}s</label>
            <input
              type="range"
              min="2"
              max="10"
              value={settings.breathDuration}
              onChange={(e) => onSettingsChange({ ...settings, breathDuration: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Hold Duration: {settings.holdDuration}s</label>
            <input
              type="range"
              min="1"
              max="10"
              value={settings.holdDuration}
              onChange={(e) => onSettingsChange({ ...settings, holdDuration: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Session Duration: {settings.sessionDuration} minutes</label>
            <input
              type="range"
              min="1"
              max="30"
              value={settings.sessionDuration}
              onChange={(e) => onSettingsChange({ ...settings, sessionDuration: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}