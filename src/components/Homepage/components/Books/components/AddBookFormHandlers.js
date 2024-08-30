export const validMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const isValidYear = (year) => /^\d{4}$/.test(year);

export const handleInputChange = (index, event, books, setBooks) => {
  const { name, value } = event.target;
  const updatedBooks = [...books];
  updatedBooks[index][name] = value;
  setBooks(updatedBooks);
};

export const handleAddBookField = (books, setBooks) => {
  setBooks([...books, { year: "", month: "", title: "" }]);
};

export const handleRemoveBookField = (index, books, setBooks) => {
  const updatedBooks = [...books];
  updatedBooks.splice(index, 1);
  setBooks(updatedBooks);
};

export const validateBooks = (books) => {
  const newErrors = {};
  books.forEach((book, index) => {
    if (!book.year || !isValidYear(book.year)) {
      newErrors[`year-${index}`] = !isValidYear(book.year)
        ? "Invalid year. Please enter a 4-digit year."
        : "Year is required.";
    }
    if (!book.month || !validMonths.includes(book.month)) {
      newErrors[`month-${index}`] = !validMonths.includes(book.month)
        ? "Invalid month. Please enter a valid month name."
        : "Month is required.";
    }
    if (!book.title) {
      newErrors[`title-${index}`] = "Title is required.";
    }
  });
  return newErrors;
};

export const handleSubmit = (
  event,
  books,
  validateBooks,
  onAddBook,
  isMultiple,
  setBooks,
  setErrors,
  onClose
) => {
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

  setBooks([{ year: "", month: "", title: "" }]);
  setErrors({});
  onClose();
};
