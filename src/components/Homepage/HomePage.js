import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/images/bg.jpg';
import frameImage from '../../assets/images/container07.png'; 
import avatarImage from '../../assets/images/image07.gif';
import backgroundMusic from '../../assets/music/edge-of-town.mp3';

const HomePage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        fontFamily: "'Pirata One', cursive", 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <img
          src={frameImage}
          alt="Decorative Frame"
          className="w-11/12 max-w-screen-xl max-h-screen object-contain"
        />
      </div>

      <div className="absolute flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
        <div className="relative w-full p-4 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white flex items-start">
          <div className="w-1/3 flex justify-center items-center">
            <img
              src={avatarImage}
              alt="Avatar Image"
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>

          <div className="w-2/3 flex flex-col pl-4">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-brown-900 mb-2">Marta Pretel</h1>
              <p className="text-md text-brown-700">Hermit & Bookworm</p>
            </div>
            <div className="text-md mb-6">
              <ul className="text-brown-700 text-left space-y-2">
                <li className="flex items-center">
                  <span role="img" aria-label="books">📚</span>
                  <span className="ml-2">Books; Tolkien; Terry Pratchett</span>
                </li>
                <li className="flex items-center">
                  <span role="img" aria-label="drawing">🎨</span>
                  <span className="ml-2">Drawing & writing</span>
                </li>
                <li className="flex items-center">
                  <span role="img" aria-label="medieval fantasy">⚔️</span>
                  <span className="ml-2">Medieval fantasy & history</span>
                </li>
                <li className="flex items-center">
                  <span role="img" aria-label="squirrels">🐿️</span>
                  <span className="ml-2">Squirrels</span>
                </li>
                <li className="flex items-center">
                  <span role="img" aria-label="coffee">☕</span>
                  <span className="ml-2">Hazelnut coffee & berry cake</span>
                </li>
                <li className="flex items-center">
                  <span role="img" aria-label="music">🎵</span>
                  <span className="ml-2">Dungeon Synth & black Metal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/3 flex flex-col items-center justify-center space-y-4">
            <Link to="/lectures" className="bg-yellow-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition">
              📖
            </Link>
            <a href="https://bandcamp.com/hobbitina" className="bg-yellow-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition">
              ⚔️🔥⚔️
            </a>
            <a href="https://open.spotify.com/user/silvanas8" className="bg-yellow-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition">
              🎶
            </a>
          </div>
        </div>
      </div>
      <button
        onClick={handlePlayMusic}
        className="absolute bottom-4 px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 transition"
      >
        Play Music
      </button>

      <audio ref={audioRef} src={backgroundMusic} loop />
    </div>
  );
};

export default HomePage;
