import React from 'react';
import bgImage from '../../../assets/images/bg.jpg'; // Background image
import frameImage from '../../../assets/images/container07.png'; // Frame image

const dataByMonth = {
  January: {
    lectures: ['Lecture 1', 'Lecture 2'],
    books: [
      'Flox de los colores',
      'Adiós, Fairy Oak',
      'El destino de un hada',
      'La historia perdida'
    ]
  },
  February: {
    lectures: ['Lecture 3', 'Lecture 4'],
    books: []
  },
  March: {
    lectures: [],
    books: ['Lores y Damas', 'El estrecho sendero entre deseos']
  },
  April: {
    lectures: [],
    books: [
      'To hell and back again. My Burzum Story.',
      'Dungeon Synth - The Rebirth of the legend.',
      'Siega',
      'Por si las voces vuelven',
      'Gothan, GasLight'
    ]
  },
  May: {
    lectures: [],
    books: [
      'How to Sell a Haunted House',
      "The Southern Book Club's Guide to Slaying Vampires",
      'Meditaciones de Marco Aurelio',
      'Wilt',
      'Beyond Order'
    ]
  },
  June: {
    lectures: [],
    books: ['Drácula']
  },
  July: {
    lectures: [],
    books: ['The Fellowship of the Ring']
  },
  August: {
    lectures: [],
    books: ['The Two Towers', 'The Return of the King']
  },
  September: {
    lectures: [],
    books: []
  },
  October: {
    lectures: [],
    books: []
  },
  November: {
    lectures: [],
    books: []
  },
  December: {
    lectures: [],
    books: []
  }
};

const Lectures = () => {
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
        <div className="relative w-full h-[35vh] p-4 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white overflow-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Lectures and Books of the Year</h1>
          {Object.keys(dataByMonth).map((month) => (
            <div key={month} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{month}</h2>
              {dataByMonth[month].lectures.length > 0 && (
                <>
                  <h3 className="text-md font-semibold mt-4 mb-2">Lectures:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {dataByMonth[month].lectures.map((lecture, index) => (
                      <li key={index} className="mb-1">{lecture}</li>
                    ))}
                  </ul>
                </>
              )}
              {dataByMonth[month].books.length > 0 && (
                <>
                  <h3 className="text-md font-semibold mt-4 mb-2">Books:</h3>
                  <ul className="list-disc pl-5">
                    {dataByMonth[month].books.map((book, index) => (
                      <li key={index} className="mb-1">{book}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lectures;
