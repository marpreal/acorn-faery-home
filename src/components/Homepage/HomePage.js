import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/bg.jpg";
import frameImage from "../../assets/images/container07.png";
import avatarImage from "../../assets/images/image07.gif";
import image01 from "../../assets/images/image01.png";
import image18 from "../../assets/images/image18.png";

const HomePage = () => (
  <div
    className="bg-cover bg-center min-h-screen flex justify-center items-center relative"
    style={{
      backgroundImage: `url(${bgImage})`,
      fontFamily: "'Pirata One', cursive",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
  >
    <div className="absolute inset-0 z-0 flex justify-center items-center hidden lg:flex">
      <img
        src={frameImage}
        alt="Decorative Frame"
        className="w-11/12 max-w-screen-xl max-h-screen object-contain"
      />
    </div>

    <div className="absolute flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
      <div className="relative w-full p-4 xs:border-0 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white xs:bg-transparent flex items-start flex-wrap sm:flex-nowrap mb-12 sm:mb-0">
        <div className="w-1/3 flex flex-col items-center justify-center">
          <img src={image18} className="mb-2 w-8 h-8 object-cover" />
          <img
            src={avatarImage}
            className="w-24 h-24 object-cover rounded-full"
          />
          <img src={image01} className="mt-2 w-12 h-12 object-cover" />
          <a
            href="https://bandcamp.com/hobbitina"
            className="text-yellow-800 px-4 py-2 mb-2 sm:mb-0 rounded-lg hover:text-yellow-700 transition text-xl"
          >
            ⚔️🔥⚔️
          </a>
          <a
            href="https://open.spotify.com/user/silvanas8"
            className="text-yellow-800 px-4 py-2 mb-2 sm:mb-0 rounded-lg hover:text-yellow-700 transition text-3xl"
          >
            🎶
          </a>
        </div>

        <div className="w-2/3 flex flex-col pl-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-brown-900 mb-2">
              Marta Pretel
            </h1>
            <p className="text-md text-brown-700">Hermit & Bookworm</p>
          </div>
          <div className="text-md mb-6">
            <ul className="text-brown-700 text-left space-y-2">
              <li className="flex items-center">
                <span role="img" aria-label="books">
                  📚
                </span>
                <span className="ml-2">Books; Tolkien; Terry Pratchett</span>
              </li>
              <li className="flex items-center">
                <span role="img" aria-label="drawing">
                  🎨
                </span>
                <span className="ml-2">Drawing & writing</span>
              </li>
              <li className="flex items-center">
                <span role="img" aria-label="medieval fantasy">
                  ⚔️
                </span>
                <span className="ml-2">Medieval fantasy & history</span>
              </li>
              <li className="flex items-center">
                <span role="img" aria-label="squirrels">
                  🍄🐿️
                </span>
                <span className="ml-2"> Mushrooms & Squirrels</span>
              </li>
              <li className="flex items-center">
                <span role="img" aria-label="coffee">
                  ☕🫐
                </span>
                <span className="ml-2">Hazelnut coffee & berry cake</span>
              </li>
              <li className="flex items-center">
                <span role="img" aria-label="music">
                  🎵
                </span>
                <span className="ml-2">Dungeon Synth & black Metal</span>
              </li>
              <li className="flex items-center">
                <span role="img" aria-label="magic">
                  🃏
                </span>
                <span className="ml-2">Magic: The Gathering</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/3 flex flex-row justify-start sm:justify-center sm:flex-col items-center space-x-4 sm:space-x-0 sm:space-y-4">
          <Link
            to="/books"
            className="text-yellow-800 px-4 py-2  sm:mb-0 rounded-lg hover:text-yellow-700 transition text-2xl"
          >
            📖
          </Link>
          {/* <Link
              to="/movies"
              className="text-yellow-800 px-4 py-2  sm:mb-0 rounded-lg hover:text-yellow-700 transition text-2xl"
            >
              🎬
            </Link> */}
          <Link
            to="/recipes"
            className="text-yellow-800 px-4 py-2  sm:mb-0 rounded-lg hover:text-yellow-700 transition text-2xl"
          >
            🍯
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
