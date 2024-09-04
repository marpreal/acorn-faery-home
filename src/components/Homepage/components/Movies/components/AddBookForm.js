import React, { useState, useEffect } from "react";

const validMonths = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const isValidYear = (year) => /^\d{4}$/.test(year);

const AddBookForm = ({ onAddBook, onClose, isMultiple: initialIsMultiple, initialBook }) => {
  const [books, setBooks] = useState(initialBook ? [initialBook] : [{ year: "", month: "", title: "" }]);
  const [errors, setErrors] = useState({});
  const [isMultiple, setIsMultiple] = useState(initialIsMultiple);

  useEffect(() => setIsMultiple(initialIsMultiple), [initialIsMultiple]);
  useEffect(() => {
    if (initialBook) setBooks([initialBook]);
  }, [initialBook]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setBooks(prevBooks => {
      const updatedBooks = [...prevBooks];
      updatedBooks[index][name] = value;
      return updatedBooks;
    });
  };

  const handleFieldChange = (index, field, value) => handleInputChange(index, { target: { name: field, value } });

  const handleAddBookField = () => setBooks(prevBooks => [...prevBooks, { year: "", month: "", title: "" }]);
  
  const handleRemoveBookField = (index) => setBooks(prevBooks => prevBooks.filter((_, i) => i !== index));

  const validateBooks = (books) => books.reduce((acc, book, index) => {
    const errors = {};
    if (!book.year || !isValidYear(book.year)) {
      errors[`year-${index}`] = !isValidYear(book.year) ? "Invalid year. Enter a 4-digit year." : "Year is required.";
    }
    if (!book.month || !validMonths.includes(book.month)) {
      errors[`month-${index}`] = !validMonths.includes(book.month) ? "Invalid month. Enter a valid month name." : "Month is required.";
    }
    if (!book.title) {
      errors[`title-${index}`] = "Title is required.";
    }
    return { ...acc, ...errors };
  }, {});

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateBooks(books);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddBook(isMultiple ? books : books[0]);
    setBooks([{ year: "", month: "", title: "" }]);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          {initialBook ? "Edit Book" : "Add New Books"}
        </h2>
        <form onSubmit={handleSubmit}>
          {books.map((book, index) => (
            <div key={index} className="mb-4">
              {["year", "month", "title"].map((field) => (
                <div key={field}>
                  <label htmlFor={`${field}-${index}`} className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={`${field}-${index}`}
                    name={field}
                    value={book[field]}
                    onChange={(e) => handleFieldChange(index, field, e.target.value)}
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[`${field}-${index}`] ? "border-red-500" : ""}`}
                  />
                  {errors[`${field}-${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`${field}-${index}`]}</p>
                  )}
                </div>
              ))}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBookField(index)}
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
              onClick={handleAddBookField}
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
