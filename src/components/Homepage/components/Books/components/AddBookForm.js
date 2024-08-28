import React, { useState } from 'react';

const AddBookForm = ({ onAddBook, onClose }) => {
  const [newBook, setNewBook] = useState({ year: '', month: '', title: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBook.year || !newBook.month || !newBook.title) {
      alert("Please fill out all fields.");
      return;
    }
    onAddBook(newBook);
    setNewBook({ year: '', month: '', title: '' });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              id="year"
              name="year"
              value={newBook.year}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
            <input
              type="text"
              id="month"
              name="month"
              value={newBook.month}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105"
          >
            Add Book
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-transform transform hover:scale-105"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
