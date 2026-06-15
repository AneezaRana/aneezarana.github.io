import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      <p className="text-xs text-gray-300 italic">Wanna play music while scrolling?</p>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="p-4 rounded-full shadow-lg transition transform hover:scale-110 text-white"
        style={{
          background: 'linear-gradient(135deg, rgb(0, 240, 255), rgb(0, 255, 128))',
          boxShadow: 'rgb(0, 240, 255) 0px 0px 15px, rgb(0, 255, 128) 0px 0px 25px',
        }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
}
