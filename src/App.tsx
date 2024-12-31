import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { MoodSelector } from './components/MoodSelector';
import { BreathingCircle } from './components/BreathingCircle';
import { Footer } from './components/Footer';
import { useTheme } from './contexts/ThemeContext';
import { moodImages } from './constants/moodImages';
import type { BreathingSettings } from './types/theme';

function MainContent() {
  const { mood } = useTheme();
  const [settings, setSettings] = useState<BreathingSettings>({
    breathDuration: 4,
    holdDuration: 2,
    sessionDuration: 5
  });
  
  return (
    <div 
      className="min-h-screen bg-cover bg-center transition-all duration-700 flex flex-col"
      style={{ backgroundImage: `url(${moodImages[mood]})` }}
    >
      <div className="flex-1 flex flex-col bg-black/30">
        <header className="py-4 px-4">
          <div className="container mx-auto flex justify-end items-center gap-4">
            <MoodSelector />
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <h1 className="text-5xl font-bold mb-4 text-center text-white">
            Breathe & Meditate
          </h1>
          <p className="text-xl mb-12 text-center text-white">
            Find your inner peace.
          </p>
          
          <BreathingCircle 
            settings={settings}
            onSettingsChange={setSettings}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}