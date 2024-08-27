import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Lectures from './components/Homepage/components/Lectures';

const App = () => {
  return (
    <Router basename="/acorn-faery-home">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lectures" element={<Lectures />} />
      </Routes>
    </Router>
  );
};

export default App;
