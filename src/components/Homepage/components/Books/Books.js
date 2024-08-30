import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import AddBookForm from "./components/AddBookForm";
import { usePassword } from "../../../Password/PasswordContext";
import PasswordPrompt from "../../../Password/PasswordPrompt";
import "./Books.css";

const Books = () => {
  const [booksData, setBooksData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isMultiple, setIsMultiple] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null); 
  const { isAuthenticated, showPasswordPrompt, isPasswordPromptVisible } = usePassword();
  console.log('isMultiplebooks', isMultiple)
const BASE_URL = "https://my-backend-1-y6yu.onrender.com/books";

const transformBooksData = (books) => {
  if (!Array.isArray(books)) {
    console.error('Expected an array but got', typeof books);
    return {};
  }

  return books.reduce((acc, book) => {
    if (!acc[book.year]) acc[book.year] = {};
    if (!acc[book.year][book.month]) acc[book.year][book.month] = [];
    acc[book.year][book.month].push(book);
    return acc;
  }, {});
};

const findYearIndex = (data, year) => Object.keys(data).indexOf(year) || 0;

const fetchBooksData = async (setBooksData, setCurrentYearIndex, setLoading) => {
  try {
    const { data } = await axios.get(BASE_URL);
    const transformedData = transformBooksData(data);
    setBooksData(transformedData);

    const currentYear = new Date().getFullYear().toString();
    setCurrentYearIndex(findYearIndex(transformedData, currentYear));
  } catch (error) {
    console.error("Error fetching books data:", error);
  } finally {
    setLoading(false);
  }
};

const handleYearNavigation = (years, direction, setCurrentYearIndex) => {
  setCurrentYearIndex((prevIndex) => {
    const newIndex = prevIndex + direction;
    return Math.max(0, Math.min(newIndex, years.length - 1));
  });
};
const handleAddOrUpdateBooks = async (books, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  try {
    const url = isMultiple ? `${BASE_URL}/multiple` : BASE_URL;

    console.log("Sending data to:", url);
    console.log("Data being sent:", books);

    const { data: addedBooks } = await axios.post(url, books);

    console.log("Received data:", addedBooks);

    setBooksData((prevData) => {
      const newBooksData = transformBooksData(Array.isArray(addedBooks) ? addedBooks : [addedBooks]);
      const updatedData = { ...prevData };

      Object.keys(newBooksData).forEach((year) => {
        if (!updatedData[year]) updatedData[year] = {};
        Object.keys(newBooksData[year]).forEach((month) => {
          if (!updatedData[year][month]) updatedData[year][month] = [];
          const existingBooks = updatedData[year][month].map(b => b._id);
          const newBooks = newBooksData[year][month].filter(b => !existingBooks.includes(b._id));
          updatedData[year][month] = [...updatedData[year][month], ...newBooks];
        });
      });

      const year = isMultiple ? addedBooks[0].year : addedBooks.year;
      setCurrentYearIndex(findYearIndex(updatedData, year));
      return updatedData;
    });

    setIsFormVisible(false);
  } catch (error) {
    console.error("Error adding books:", error.response ? error.response.data : error.message);
  }
};



const handleAddBook = async (book, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  await handleAddOrUpdateBooks(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
};

const handleAddMultipleBooks = async (books, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  await handleAddOrUpdateBooks(books, setBooksData, setCurrentYearIndex, setIsFormVisible);
};

const handleDeleteBook = async (bookId, setBooksData) => {
  try {
    await axios.delete(`${BASE_URL}/${bookId}`);

    setBooksData((prevData) => {
      const updatedData = { ...prevData };
      Object.keys(updatedData).forEach((year) => {
        Object.keys(updatedData[year]).forEach((month) => {
          updatedData[year][month] = updatedData[year][month].filter((book) => book._id !== bookId);
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

const handleEditBook = async (book, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  try {
    const { data: updatedBook } = await axios.put(`${BASE_URL}/${book._id}`, book);

    setBooksData((prevData) => {
      const newBooksData = transformBooksData([updatedBook]);
      const updatedData = { ...prevData };

      Object.keys(newBooksData).forEach((year) => {
        if (!updatedData[year]) updatedData[year] = {};
        Object.keys(newBooksData[year]).forEach((month) => {
          if (!updatedData[year][month]) updatedData[year][month] = [];
          updatedData[year][month] = updatedData[year][month].map(b =>
            b._id === updatedBook._id ? updatedBook : b
          );
        });
      });

      const year = updatedBook.year;
      setCurrentYearIndex(findYearIndex(updatedData, year));
      return updatedData;
    });

    setIsFormVisible(false);
  } catch (error) {
    console.error("Error updating book:", error);
  }
};



  const openFormForSingleBook = () => {
    if (isAuthenticated) {
      setIsMultiple(false);
      setIsFormVisible(true);
    } else {
      showPasswordPrompt(() => {
        setIsMultiple(false);
        setIsFormVisible(true);
      });
    }
  };

  const openFormForMultipleBooks = () => {
    if (isAuthenticated) {
      setIsMultiple(true);
      setIsFormVisible(true);
    } else {
      showPasswordPrompt(() => {
        setIsMultiple(true);
        setIsFormVisible(true);
      });
    }
  };

  const handleEdit = (book) => {
    if (isAuthenticated) {
      setEditingBook(book);
      setIsFormVisible(true);
    } else {
      showPasswordPrompt(() => {
        setEditingBook(book);
        setIsFormVisible(true);
      });
    }
  };

  const handleSubmit = (book) => {
    if (isAuthenticated) {
      if (editingBook) {
        handleEditBook(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
      } else {
        if (isMultiple) {
          handleAddMultipleBooks(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
        } else {
          handleAddBook(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
        }
      }
    } else {
      showPasswordPrompt(() => {
        if (editingBook) {
          handleEditBook(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
        } else {
          if (isMultiple) {
            handleAddMultipleBooks([book], setBooksData, setCurrentYearIndex, setIsFormVisible);
          } else {
            handleAddBook(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
          }
        }
      });
    }
  };

  const handleDelete = (bookId) => {
    if (isAuthenticated) {
      handleDeleteBook(bookId, setBooksData);
    } else {
      showPasswordPrompt(() => handleDeleteBook(bookId, setBooksData));
    }
  };

  useEffect(() => {
    fetchBooksData(setBooksData, setCurrentYearIndex, setLoading);
  }, []);

  const years = Object.keys(booksData);
  const currentYear = years[currentYearIndex] || "";
  const booksForCurrentYear = booksData[currentYear] || {};

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

      {isPasswordPromptVisible && <PasswordPrompt />}
    </div>
  );
};

export default Books;
