import React, { createContext, useState, useRef, useContext, useEffect } from 'react';
import { tracks } from "./Tracks/tracks";

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
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
    setTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        audioRef,
        isPlaying,
        playPauseMusic,
        nextTrack,
        previousTrack,
        trackIndex,
      }}
    >
      {children}
      <audio ref={audioRef} src={tracks[trackIndex].src} loop />
    </AudioPlayerContext.Provider>
  );
};
