import React from "react";
import { Outlet } from "react-router-dom";
import { useAudioPlayer } from "../AudioPlayer/AudioPlayerContext";
import image29 from "../../assets/images/image29.gif";
import { tracks } from "../AudioPlayer/Tracks/tracks";
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid";

const Layout = () => {
  const { isPlaying, playPauseMusic, nextTrack, previousTrack, trackIndex } = useAudioPlayer();

  return (
    <div>
      <Outlet />
      <div
        className="fixed top-0 right-0 z-50 flex flex-col items-start space-y-2 p-4"
        style={{
          fontFamily: "'Pirata One', cursive",
        }}
      >
        <div className="flex items-center space-x-2">
          <img
            src={image29}
            alt="Tiny Gif"
            className="w-6 sm:w-8 h-6 sm:h-8 object-cover"
          />
          {isPlaying ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={previousTrack}
                className="p-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition"
              >
                <BackwardIcon className="w-8 h-8" />
              </button>
              <button
                onClick={playPauseMusic}
                className="p-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition"
              >
                <PauseIcon className="w-8 h-8" />
              </button>
              <button
                onClick={nextTrack}
                className="p-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition"
              >
                <ForwardIcon className="w-8 h-8" />
              </button>
              <div className="flex items-center">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    fontFamily: "'Luxurious Roman', serif",
                    color: "white",
                    padding: "4px",
                  }}
                >
                  Now Playing:
                </h3>
                <p
                  style={{
                    fontFamily: "'Luxurious Roman', serif",
                    color: "white",
                    padding: "4px",
                  }}
                >
                  {tracks[trackIndex].name}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={playPauseMusic}
              className="p-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition"
            >
              <PlayIcon className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
