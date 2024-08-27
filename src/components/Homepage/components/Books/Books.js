import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../../../assets/images/bg.jpg'; 
import frameImage from '../../../../assets/images/container07.png'; 
import { dataByMonth } from './data';

const Books = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        fontFamily: "'Playball', cursive",
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

      <div className="relative flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
        <div className="relative w-full h-[35vh] p-4 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white overflow-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Books of the Year</h1>
          {Object.keys(dataByMonth).map((month) => (
            <div key={month} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{month}</h2>
              
              {dataByMonth[month].length > 0 && (
                <>
                  <ul className="list-disc pl-5">
                    {dataByMonth[month].map((book, index) => (
                      <li key={index} className="mb-1">{book}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <Link 
        to="/" 
        className="absolute bottom-8 right-8 px-5 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default Books;