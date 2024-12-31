import { FiLinkedin } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="w-full py-4 bg-black/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto flex justify-center items-center gap-4 text-white">
        <span>Made by SkyDragon</span>
        <a
          href="https://www.linkedin.com/in/ritam-jash"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          aria-label="LinkedIn Profile"
        >
          <FiLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
}