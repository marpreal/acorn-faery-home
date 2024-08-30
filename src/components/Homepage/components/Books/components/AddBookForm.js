import React, { useState, useEffect } from "react";
import { handleInputChange, handleAddBookField, handleRemoveBookField, validateBooks, handleSubmit } from "./AddBookFormHandlers";

const AddBookForm = ({ onAddBook, onClose, isMultiple: initialIsMultiple, initialBook }) => {
  const [books, setBooks] = useState(initialBook ? [initialBook] : [{ year: "", month: "", title: "" }]);
  const [errors, setErrors] = useState({});
  const [isMultiple, setIsMultiple] = useState(initialIsMultiple);

  useEffect(() => {
    setIsMultiple(initialIsMultiple);
  }, [initialIsMultiple]);

  useEffect(() => {
    if (initialBook) {
      setBooks([initialBook]);
    }
  }, [initialBook]);

  const handleInputChangeWrapper = (index, event) => {
    handleInputChange(index, event, books, setBooks);
  };

  const handleAddBookFieldWrapper = () => {
    handleAddBookField(books, setBooks);
  };

  const handleRemoveBookFieldWrapper = (index) => {
    handleRemoveBookField(index, books, setBooks);
  };

  const handleSubmitWrapper = (event) => {
    event.preventDefault();
    if (isMultiple && books.length <= 1) {
      alert("Please add more than one book for multiple book entry.");
      return;
    }

    if (initialBook && !isMultiple) {
      onAddBook(books[0]);
    } else {
      handleSubmit(
        event,
        books,
        validateBooks,
        onAddBook,
        isMultiple,
        setBooks,
        setErrors,
        onClose
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          {initialBook ? "Edit Book" : "Add New Books"}
        </h2>
        <form onSubmit={handleSubmitWrapper}>
          {books.map((book, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="text"
                id={`year-${index}`}
                name="year"
                value={book.year}
                onChange={(event) => handleInputChangeWrapper(index, event)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[`year-${index}`] ? "border-red-500" : ""}`}
              />
              {errors[`year-${index}`] && (
                <p className="text-red-500 text-sm">{errors[`year-${index}`]}</p>
              )}

              <label htmlFor={`month-${index}`} className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <input
                type="text"
                id={`month-${index}`}
                name="month"
                value={book.month}
                onChange={(event) => handleInputChangeWrapper(index, event)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[`month-${index}`] ? "border-red-500" : ""}`}
              />
              {errors[`month-${index}`] && (
                <p className="text-red-500 text-sm">{errors[`month-${index}`]}</p>
              )}

              <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
                Book Title
              </label>
              <input
                type="text"
                id={`title-${index}`}
                name="title"
                value={book.title}
                onChange={(event) => handleInputChangeWrapper(index, event)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[`title-${index}`] ? "border-red-500" : ""}`}
              />
              {errors[`title-${index}`] && (
                <p className="text-red-500 text-sm">{errors[`title-${index}`]}</p>
              )}

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBookFieldWrapper(index)}
                  className="mt-2 bg-red-500 text-white py-1 px-2 rounded-full"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {isMultiple && !initialBook && (
            <button
              type="button"
              onClick={handleAddBookFieldWrapper}
              className="mb-4 bg-blue-500 text-white py-1 px-2 rounded-full"
            >
              Add Another Book
            </button>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              {initialBook ? "Update Book" : "Add Books"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-transform transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
