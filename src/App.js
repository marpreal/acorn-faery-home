import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import Books from './components/Homepage/components/Books/Books';
import Movies from './components/Homepage/components/Movies/Movies';
import Recipes from './components/Homepage/components/Recipes/Recipes';
import RecipeDetail from './components/Homepage/components/Recipes/components/Details/RecipeDetail';
import { PasswordProvider } from './components/Password/PasswordContext';
import { AudioPlayerProvider } from './components/AudioPlayer/AudioPlayerContext';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <PasswordProvider>
      <AudioPlayerProvider>
        <Router>
          <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<Books />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Route>
          </Routes>
        </Router>
      </AudioPlayerProvider>
    </PasswordProvider>
  );
};

export default App;
