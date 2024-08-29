import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import AddBookForm from "./components/AddBookForm";
import axios from "axios";
import "./Books.css";

const Books = () => {
  const [booksData, setBooksData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isMultiple, setIsMultiple] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios.get(
          "https://my-backend-1-y6yu.onrender.com/books"
        );
        const data = {};
        response.data.forEach((book) => {
          if (!data[book.year]) {
            data[book.year] = {};
          }
          if (!data[book.year][book.month]) {
            data[book.year][book.month] = [];
          }
          data[book.year][book.month].push(book);
        });
        setBooksData(data);
        const currentYear = new Date().getFullYear().toString();
        const yearIndex = Object.keys(data).indexOf(currentYear);
        setCurrentYearIndex(yearIndex !== -1 ? yearIndex : 0);
      } catch (error) {
        console.error("Error fetching books data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksData();
  }, []);

  const years = Object.keys(booksData);
  const currentYear = years[currentYearIndex] || "";
  const booksForCurrentYear = booksData[currentYear] || {};

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

  const handleAddBook = async (book) => {
    try {
      const response = await axios.post(
        "https://my-backend-1-y6yu.onrender.com/books",
        book
      );
      const addedBook = response.data;

      setBooksData((prevData) => {
        const updatedData = { ...prevData };
        if (!updatedData[addedBook.year]) {
          updatedData[addedBook.year] = {};
        }
        if (!updatedData[addedBook.year][addedBook.month]) {
          updatedData[addedBook.year][addedBook.month] = [];
        }
        if (
          !updatedData[addedBook.year][addedBook.month].some(
            (b) => b._id === addedBook._id
          )
        ) {
          updatedData[addedBook.year][addedBook.month].push(addedBook);
        }

        const yearsList = Object.keys(updatedData);
        const currentYearIndex = yearsList.indexOf(addedBook.year);
        setCurrentYearIndex(currentYearIndex !== -1 ? currentYearIndex : 0);

        return updatedData;
      });

      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleAddMultipleBooks = async (books) => {
    try {
      const response = await axios.post(
        "https://my-backend-1-y6yu.onrender.com/books/multiple",
        books
      );
      const addedBooks = response.data;

      setBooksData((prevData) => {
        const updatedData = { ...prevData };
        addedBooks.forEach((addedBook) => {
          if (!updatedData[addedBook.year]) {
            updatedData[addedBook.year] = {};
          }
          if (!updatedData[addedBook.year][addedBook.month]) {
            updatedData[addedBook.year][addedBook.month] = [];
          }

          if (
            !updatedData[addedBook.year][addedBook.month].some(
              (b) => b._id === addedBook._id
            )
          ) {
            updatedData[addedBook.year][addedBook.month].push(addedBook);
          }
        });

        const yearsList = Object.keys(updatedData);
        const currentYearIndex = yearsList.indexOf(addedBooks[0].year);
        setCurrentYearIndex(currentYearIndex !== -1 ? currentYearIndex : 0);

        return updatedData;
      });

      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding multiple books:", error);
    }
  };

  const handleFormSubmit = (books) => {
    if (isMultiple) {
      handleAddMultipleBooks(books);
    } else {
      handleAddBook(books);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      console.log("Attempting to delete book with ID:", bookId);
      await axios.delete(
        `https://my-backend-1-y6yu.onrender.com/books/${bookId}`
      );

      setBooksData((prevData) => {
        const updatedData = { ...prevData };
        Object.keys(updatedData).forEach((year) => {
          Object.keys(updatedData[year]).forEach((month) => {
            updatedData[year][month] = updatedData[year][month].filter(
              (book) => book._id !== bookId
            );
            if (updatedData[year][month].length === 0) {
              delete updatedData[year][month];
            }
          });
          if (Object.keys(updatedData[year]).length === 0) {
            delete updatedData[year];
          }
        });
        return updatedData;
      });
    } catch (error) {
      console.error("Error deleting book:", error);
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
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="ml-4 px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-500 transition-transform transform hover:scale-105"
                        >
                          Delete
                        </button>
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
          onAddBook={handleFormSubmit}
          onClose={() => setIsFormVisible(false)}
          isMultiple={isMultiple}
        />
      )}
    </div>
  );
};

export default Books;
