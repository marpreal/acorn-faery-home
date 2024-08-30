import React, { useState } from 'react';
import { usePassword } from './PasswordContext';

const PasswordPrompt = () => {
  const [password, setPassword] = useState('');
  const { authenticate, hidePasswordPrompt } = usePassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate(password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={hidePasswordPrompt}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Wait... who are you?? 🧐
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Password"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-800 text-white rounded-full hover:bg-yellow-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;
