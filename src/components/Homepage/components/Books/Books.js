import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import AddBookForm from "./components/AddBookForm";
import { fetchBooksData, handleYearNavigation, handleAddBook, handleAddMultipleBooks, handleEditBook, handleDeleteBook } from "./BooksHandlers";
import "./Books.css";

const Books = () => {
  const [booksData, setBooksData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isMultiple, setIsMultiple] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null); 

  const openFormForSingleBook = () => {
    setIsMultiple(false);
    setIsFormVisible(true);
  };

  const openFormForMultipleBooks = () => {
    setIsMultiple(true);
    setIsFormVisible(true);
  };

  useEffect(() => {
    fetchBooksData(setBooksData, setCurrentYearIndex, setLoading);
  }, []);

  const years = Object.keys(booksData);
  const currentYear = years[currentYearIndex] || "";
  const booksForCurrentYear = booksData[currentYear] || {};

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormVisible(true);
  };

  const handleSubmit = (book) => {
    if (editingBook) {
      handleEditBook(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
    } else {
      if (isMultiple) {
        handleAddMultipleBooks([book], setBooksData, setCurrentYearIndex, setIsFormVisible);
      } else {
        handleAddBook(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
      }
    }
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
        <div className="relative w-full h-[35vh] p-4 xs:border-0 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white xs:bg-transparent overflow-auto scroll-container">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => handleYearNavigation(years, -1, setCurrentYearIndex)}
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              &lt; Prev
            </button>
            <h1 className="text-2xl font-bold text-center">{currentYear}</h1>
            <button
              onClick={() => handleYearNavigation(years, 1, setCurrentYearIndex)}
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              Next &gt;
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
                style={{
                  border: "4px solid transparent",
                  borderImage: "linear-gradient(45deg, green, brown) 1",
                }}
              >
                <span className="visually-hidden" />
              </div>
            </div>
          ) : Object.keys(booksForCurrentYear).length > 0 ? (
            Object.keys(booksForCurrentYear).map((month) => (
              <div key={month} className="mb-4">
                <h2 className="text-lg font-semibold mb-2">{month}</h2>
                <ul className="list-disc pl-5">
                  {booksForCurrentYear[month].length > 0 ? (
                    booksForCurrentYear[month].map((book) => (
                      <li
                        key={book._id}
                        className="mb-1 flex justify-between items-center"
                      >
                        {book.title}
                        <div className="flex items-center ml-4">
                          <button
                            onClick={() => handleEdit(book)}
                            className="mr-2 p-1 rounded-full hover:bg-yellow-500 transition-transform transform hover:scale-105"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book._id, setBooksData)}
                            className="p-1 rounded-full hover:bg-red-500 transition-transform transform hover:scale-105"
                          >
                            🗑
                          </button>
                        </div>
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

      <div className="absolute bottom-8 left-8 flex flex-col gap-4">
        <button
          onClick={openFormForSingleBook}
          className="px-4 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
        >
          Add Single Book
        </button>

        <button
          onClick={openFormForMultipleBooks}
          className="px-4 py-2 bg-yellow-600 text-white rounded-full border border-yellow-800 shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          Add Multiple Books
        </button>
      </div>

      <Link
        to="/"
        className="absolute bottom-8 right-8 px-5 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
      >
        Back to Homepage
      </Link>

      {isFormVisible && (
        <AddBookForm
          onAddBook={handleSubmit}
          onClose={() => {
            setIsFormVisible(false);
            setEditingBook(null);
          }}
          isMultiple={isMultiple}
          initialBook={editingBook}
        />
      )}
    </div>
  );
};

export default Books;
