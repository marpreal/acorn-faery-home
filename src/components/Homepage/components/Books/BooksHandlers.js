import axios from "axios";

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

export const fetchBooksData = async (setBooksData, setCurrentYearIndex, setLoading) => {
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


export const handleYearNavigation = (years, direction, setCurrentYearIndex) => {
  setCurrentYearIndex((prevIndex) => {
    const newIndex = prevIndex + direction;
    return Math.max(0, Math.min(newIndex, years.length - 1));
  });
};

const handleAddOrUpdateBooks = async (books, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  try {
    const isMultiple = Array.isArray(books) && books.length > 1;
    const url = isMultiple ? `${BASE_URL}/multiple` : BASE_URL;

    const { data: addedBooks } = await axios.post(url, books);

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
    console.error("Error adding books:", error);
  }
};



export const handleAddBook = async (book, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  await handleAddOrUpdateBooks(book, setBooksData, setCurrentYearIndex, setIsFormVisible);
};

export const handleAddMultipleBooks = async (books, setBooksData, setCurrentYearIndex, setIsFormVisible) => {
  await handleAddOrUpdateBooks(books, setBooksData, setCurrentYearIndex, setIsFormVisible);
};

export const handleDeleteBook = async (bookId, setBooksData) => {
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
