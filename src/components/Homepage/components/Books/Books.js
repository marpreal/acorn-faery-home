import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import AddBookForm from "./components/AddBookForm";
import { usePassword } from "../../../Password/PasswordContext";
import PasswordPrompt from "../../../Password/PasswordPrompt";
import loadingGif from "../../../../assets/images/image29.gif";
import "./Books.css";

const BASE_URL = "https://my-backend-1-y6yu.onrender.com/books";

const transformBooksData = (books) => {
  if (!Array.isArray(books)) {
    console.error("Expected an array but got", typeof books);
    return {};
  }

  return books.reduce((acc, book) => {
    acc[book.year] = acc[book.year] || {};
    acc[book.year][book.month] = acc[book.year][book.month] || [];
    acc[book.year][book.month].push(book);
    return acc;
  }, {});
};

const findYearIndex = (data, year) => Object.keys(data).indexOf(year) || 0;

const updateBooksData = (books, isMultiple, prevData, setCurrentYearIndex) => {
  const newBooksData = transformBooksData(
    Array.isArray(books) ? books : [books]
  );
  const updatedData = { ...prevData };

  Object.keys(newBooksData).forEach((year) => {
    updatedData[year] = updatedData[year] || {};
    Object.keys(newBooksData[year]).forEach((month) => {
      updatedData[year][month] = updatedData[year][month] || [];
      const existingBooks = updatedData[year][month].map((b) => b._id);
      const newBooks = newBooksData[year][month].filter(
        (b) => !existingBooks.includes(b._id)
      );
      updatedData[year][month] = [...updatedData[year][month], ...newBooks];
    });
  });

  const year = isMultiple ? books[0].year : books.year;
  setCurrentYearIndex(findYearIndex(updatedData, year));

  return updatedData;
};

const Books = () => {
  const [booksData, setBooksData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isMultiple, setIsMultiple] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const {
    isAuthenticated,
    showPasswordPrompt,
    isPasswordPromptVisible,
    hidePasswordPrompt,
  } = usePassword();

  const fetchBooksData = async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      const transformedData = transformBooksData(data);
      setBooksData(transformedData);
      setCurrentYearIndex(
        findYearIndex(transformedData, new Date().getFullYear().toString())
      );
    } catch (error) {
      console.error("Error fetching books data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, data) => {
    const url =
      action === "add"
        ? isMultiple
          ? `${BASE_URL}/multiple`
          : BASE_URL
        : `${BASE_URL}/${data._id}`;
    const method =
      action === "delete" ? "delete" : action === "update" ? "put" : "post";

    try {
      const response = await axios({ method, url, data });
      if (action === "delete") {
        setBooksData((prevData) => {
          const updatedData = { ...prevData };
          Object.keys(updatedData).forEach((year) => {
            Object.keys(updatedData[year]).forEach((month) => {
              updatedData[year][month] = updatedData[year][month].filter(
                (book) => book._id !== data._id
              );
              if (updatedData[year][month].length === 0)
                delete updatedData[year][month];
            });
            if (Object.keys(updatedData[year]).length === 0)
              delete updatedData[year];
          });
          return updatedData;
        });
      } else {
        setBooksData((prevData) =>
          updateBooksData(
            response.data,
            action === "add" && isMultiple,
            prevData,
            setCurrentYearIndex
          )
        );
      }
      setIsFormVisible(false);
      setEditingBook(null);
    } catch (error) {
      console.error(
        `${action.charAt(0).toUpperCase() + action.slice(1)} error:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleYearNavigation = (direction) => {
    setCurrentYearIndex((prevIndex) =>
      Math.max(
        0,
        Math.min(prevIndex + direction, Object.keys(booksData).length - 1)
      )
    );
  };

  const handleSubmit = (book) => {
    if (isAuthenticated) {
      handleAction(editingBook ? "update" : isMultiple ? "add" : "add", book);
      hidePasswordPrompt(); // Hide password prompt if authentication is successful
    } else {
      showPasswordPrompt(() =>
        handleAction(editingBook ? "update" : isMultiple ? "add" : "add", book)
      );
    }
  };

  const handleDelete = (bookId) => {
    if (isAuthenticated) {
      handleAction("delete", { _id: bookId });
    } else {
      showPasswordPrompt(() => handleAction("delete", { _id: bookId }));
    }
  };

  const openAddForm = (isMultipleBooks) => {
    if (isAuthenticated) {
      setEditingBook(null);
      setIsMultiple(isMultipleBooks);
      setIsFormVisible(true);
    } else {
      showPasswordPrompt(() => {
        setEditingBook(null);
        setIsMultiple(isMultipleBooks);
        setIsFormVisible(true);
      });
    }
  };

  useEffect(() => {
    fetchBooksData();
  }, []);

  const years = Object.keys(booksData);
  const currentYear = years[currentYearIndex] || "";
  const booksForCurrentYear = booksData[currentYear] || {};

  const hasPreviousYear = years[currentYearIndex - 1] !== undefined;
  const hasNextYear = years[currentYearIndex + 1] !== undefined;

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
            {hasPreviousYear && (
              <button
                onClick={() => handleYearNavigation(-1)}
                className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
              >
                &lt; Prev
              </button>
            )}
            <h1 className="text-2xl font-bold text-center">{currentYear}</h1>
            {hasNextYear && (
              <button
                onClick={() => handleYearNavigation(1)}
                className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
              >
                Next &gt;
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <img src={loadingGif} alt="Loading" className="w-16 h-16" />
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
                            onClick={() => {
                              setEditingBook(book);
                              setIsFormVisible(true);
                            }}
                            className="mr-2 p-1 rounded-full hover:bg-yellow-500 transition-transform transform hover:scale-105"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
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
          onClick={() => openAddForm(false)}
          className="px-4 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
        >
          Add Single Book
        </button>
        <button
          onClick={() => openAddForm(true)}
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
          onClose={() => setIsFormVisible(false)}
          isMultiple={isMultiple}
          initialBook={editingBook}
        />
      )}
      {isPasswordPromptVisible && <PasswordPrompt />}
    </div>
  );
};

export default Books;
