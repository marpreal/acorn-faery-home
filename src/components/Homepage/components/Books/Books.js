import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import { dataByYear } from "./data";
import AddBookForm from "./components/AddBookForm";
import "./Books.css";

const Books = () => {
  const [booksData, setBooksData] = useState(dataByYear);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const years = Object.keys(booksData);
  const currentYearString = new Date().getFullYear().toString();
  const initialYearIndex = years.indexOf(currentYearString);
  const [currentYearIndex, setCurrentYearIndex] = useState(
    initialYearIndex !== -1 ? initialYearIndex : 0
  );

  const currentYear = years[currentYearIndex];
  const booksForCurrentYear = booksData[currentYear];

  const handleNextYear = () => {
    setCurrentYearIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < years.length ? nextIndex : prevIndex;
    });
  };

  const handlePreviousYear = () => {
    setCurrentYearIndex((prevIndex) => {
      const prevIndexAdjusted = prevIndex - 1;
      return prevIndexAdjusted >= 0 ? prevIndexAdjusted : prevIndex;
    });
  };

  const handleAddBook = (book) => {
    setBooksData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData[book.year]) {
        updatedData[book.year] = {};
      }
      if (!updatedData[book.year][book.month]) {
        updatedData[book.year][book.month] = [];
      }
      updatedData[book.year][book.month].push(book.title);
      return updatedData;
    });
    setIsFormVisible(false); // Hide the form after adding the book
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        fontFamily: "'Playball', cursive",
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

      <div className="relative flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
        <div className="relative w-full h-[35vh] p-4 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white overflow-auto scroll-container">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePreviousYear}
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              &lt; Prev
            </button>
            <h1 className="text-2xl font-bold text-center">{currentYear}</h1>
            <button
              onClick={handleNextYear}
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              Next &gt;
            </button>
          </div>

          {Object.keys(booksForCurrentYear).length > 0 ? (
            Object.keys(booksForCurrentYear).map((month) => (
              <div key={month} className="mb-4">
                <h2 className="text-lg font-semibold mb-2">{month}</h2>
                <ul className="list-disc pl-5">
                  {booksForCurrentYear[month].length > 0 ? (
                    booksForCurrentYear[month].map((book, index) => (
                      <li key={index} className="mb-1">
                        {book}
                      </li>
                    ))
                  ) : (
                    <p>No books available for {month}.</p>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-center">No books available for this year.</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsFormVisible(true)}
        className="absolute bottom-8 left-8 px-4 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
      >
        Add New Book
      </button>

      <Link
        to="/"
        className="absolute bottom-8 right-8 px-5 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
      >
        Back to Homepage
      </Link>

      {isFormVisible && (
        <AddBookForm
          onAddBook={handleAddBook}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default Books;
