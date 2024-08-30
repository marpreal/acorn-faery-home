import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Books from './components/Homepage/components/Books/Books';
import { PasswordProvider } from './components/Password/PasswordContext';
const App = () => {
  return (
<PasswordProvider>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<Books />} />
          </Routes>
      </Router>
    </PasswordProvider>
  );
};

export default App;
