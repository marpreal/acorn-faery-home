import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/images/bg.jpg';
import frameImage from '../../assets/images/container07.png'; 
import avatarImage from '../../assets/images/image07.gif';
import image01 from '../../assets/images/image01.png';
import image18 from '../../assets/images/image18.png'; 
import image29 from '../../assets/images/image29.gif'; 
import {tracks} from './components/Tracks/tracks'

const HomePage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = tracks[trackIndex].src;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [trackIndex, isPlaying]);

  const playPauseMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const previousTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        fontFamily: "'Pirata One', cursive",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
<div
  className="absolute inset-0 z-0 flex justify-center items-center hidden lg:flex"
>
  <img
    src={frameImage}
    alt="Decorative Frame"
    className="w-11/12 max-w-screen-xl max-h-screen object-contain"
/>
</div>

      <div className="absolute flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
        <div className="relative w-full p-4 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white flex items-start flex-wrap sm:flex-nowrap">
          <div className="w-1/3 flex flex-col items-center justify-center">
            <img
              src={image18} 
              alt="Another Image"
              className="mb-2 w-8 h-8 object-cover" 
            />
            <img
              src={avatarImage}
              alt="Avatar Image"
              className="w-24 h-24 object-cover rounded-full"
            />
            <img
              src={image01}
              alt="Additional Image"
              className="mt-2 w-12 h-12 object-cover"
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
                <li className="flex items-center">
                  <span role="img" aria-label="magic">🃏</span>
                  <span className="ml-2">Magic: The Gathering</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/3 flex flex-col items-center justify-center space-y-4">
  <Link to="/books" className="text-yellow-800 px-4 py-2 rounded-lg hover:text-yellow-700 transition text-2xl">
    📖
  </Link>
  <a href="https://bandcamp.com/hobbitina" className="text-yellow-800 px-4 py-2 rounded-lg hover:text-yellow-700 transition text-1xl">
    ⚔️🔥⚔️
  </a>
  <a href="https://open.spotify.com/user/silvanas8" className="text-yellow-800 px-4 py-2 rounded-lg hover:text-yellow-700 transition text-3xl">
    🎶
  </a>
</div>

        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col space-y-4 items-center">
        {isPlaying && (
          <div className="mb-4 text-center">
            <h3
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Luxurious Roman', serif", 
                color: 'white', 
                padding: '4px',
                display: 'inline-block' 
              }}
            >
              Now Playing:
            </h3>
            <p
              style={{
                fontFamily: "'Luxurious Roman', serif", 
                color: 'white', 
                padding: '4px', 
                display: 'inline-block' 
              }}
            >
              {tracks[trackIndex].name}
            </p>
          </div>
        )}
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={previousTrack}
            className="px-3 sm:px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Previous
          </button>
          <button
            onClick={playPauseMusic}
            className="px-3 sm:px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>
          <button
            onClick={nextTrack}
            className="px-3 sm:px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Next
          </button>
        </div>
        <img
          src={image29}
          alt="Tiny Gif"
          className="mt-4 w-6 sm:w-8 h-6 sm:h-8 object-cover"
        />
      </div>

      <audio ref={audioRef} src={tracks[trackIndex].src} loop />
    </div>
  );
};

export default HomePage;
