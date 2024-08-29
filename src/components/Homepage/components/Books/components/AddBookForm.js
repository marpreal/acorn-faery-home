import React, { useState } from 'react';

const validMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const isValidYear = (year) => /^\d{4}$/.test(year);

const AddBookForm = ({ onAddBook, onClose }) => {
  const [books, setBooks] = useState([{ year: '', month: '', title: '' }]);
  const [isMultiple, setIsMultiple] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedBooks = [...books];
    updatedBooks[index][name] = value;
    setBooks(updatedBooks);
  };

  const handleAddBookField = () => {
    setBooks([...books, { year: '', month: '', title: '' }]);
  };

  const handleRemoveBookField = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const validateBooks = (books) => {
    const newErrors = {};
    books.forEach((book, index) => {
      if (!book.year || !isValidYear(book.year)) {
        newErrors[`year-${index}`] = !isValidYear(book.year) ? "Invalid year. Please enter a 4-digit year." : "Year is required.";
      }
      if (!book.month || !validMonths.includes(book.month)) {
        newErrors[`month-${index}`] = !validMonths.includes(book.month) ? "Invalid month. Please enter a valid month name." : "Month is required.";
      }
      if (!book.title) {
        newErrors[`title-${index}`] = "Title is required.";
      }
    });
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateBooks(books);

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        alert("Please correct the errors in the form.");
        return;
    }

    if (isMultiple) {
        onAddBook(books);
    } else {
        onAddBook(books[0]);
    }

    setBooks([{ year: '', month: '', title: '' }]);
    setErrors({});
    onClose();
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Add New Books</h2>
        <form onSubmit={handleSubmit}>
          {books.map((book, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`year-${index}`} className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="text"
                id={`year-${index}`}
                name="year"
                value={book.year}
                onChange={(event) => handleInputChange(index, event)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[index]?.year ? 'border-red-500' : ''}`}
              />
              {errors[index]?.year && (
                <p className="text-red-500 text-sm">{errors[index].year}</p>
              )}

              <label htmlFor={`month-${index}`} className="block text-sm font-medium text-gray-700">Month</label>
              <input
                type="text"
                id={`month-${index}`}
                name="month"
                value={book.month}
                onChange={(event) => handleInputChange(index, event)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[index]?.month ? 'border-red-500' : ''}`}
              />
              {errors[index]?.month && (
                <p className="text-red-500 text-sm">{errors[index].month}</p>
              )}

              <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">Book Title</label>
              <input
                type="text"
                id={`title-${index}`}
                name="title"
                value={book.title}
                onChange={(event) => handleInputChange(index, event)}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors[index]?.title ? 'border-red-500' : ''}`}
              />
              {errors[index]?.title && (
                <p className="text-red-500 text-sm">{errors[index].title}</p>
              )}

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
          <button
            type="button"
            onClick={handleAddBookField}
            className="mb-4 bg-blue-500 text-white py-1 px-2 rounded-full"
          >
            Add Another Book
          </button>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
              Add Books
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
