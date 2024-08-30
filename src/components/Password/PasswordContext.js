import React, { createContext, useState, useContext } from 'react';

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordPromptVisible, setIsPasswordPromptVisible] = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState(null);

  const authenticate = (password) => {
    if (password === 'keroro007') {
      setIsAuthenticated(true);
      setIsPasswordPromptVisible(false);

      if (onSuccessCallback) {
        onSuccessCallback();
        setOnSuccessCallback(null); 
      }
    } else {
      alert('Incorrect password');
    }
  };

  const showPasswordPrompt = (callback) => {
    setOnSuccessCallback(() => callback);
    setIsPasswordPromptVisible(true);
  };

  const hidePasswordPrompt = () => {
    setIsPasswordPromptVisible(false);
  };

  return (
    <PasswordContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        showPasswordPrompt,
        hidePasswordPrompt,
        isPasswordPromptVisible,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);
