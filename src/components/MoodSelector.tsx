import { useTheme } from '../contexts/ThemeContext';
import { MoodTheme } from '../types/theme';

const moods: { value: MoodTheme; label: string }[] = [
  { value: 'sunset', label: 'Sunset' },
  { value: 'night', label: 'Night' },
  { value: 'beach', label: 'Beach' },
  { value: 'dawn', label: 'Dawn' },
  { value: 'mountain', label: 'Mountain Top' },
  { value: 'forest', label: 'Forest' },
];

export function MoodSelector() {
  const { mood, setMood } = useTheme();

  return (
    <select
      value={mood}
      onChange={(e) => setMood(e.target.value as MoodTheme)}
      className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
    >
      {moods.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  );
}