import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Books from './components/Homepage/components/Books';

const App = () => {
  return (
    <Router basename="/acorn-faery-home">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
};

export default App;
