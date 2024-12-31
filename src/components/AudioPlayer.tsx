import { useState, useRef, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

interface AudioPlayerProps {
  isPlaying: boolean;
}

export function AudioPlayer({ isPlaying }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute bottom-4 right-4">
      <button
        onClick={toggleMute}
        className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
      </button>
      <audio ref={audioRef} loop>
        <source src="/audio/meditation.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}