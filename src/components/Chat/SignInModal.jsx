// SignInModal.jsx
import React, { useState } from "react";

// Component receives the state setter from MainPage
export const SignInModal = ({ onSignInSuccess }) => {
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username.trim() !== "") {
      // Check if username is not empty
      // ✨ SUCCESS: Call the function passed from the parent, sending the username
      onSignInSuccess(username.trim());
    } else {
      setError("Please enter a username to proceed.");
    }
  };

  // The modal uses fixed positioning, covers the whole screen,
  // and has a high z-index (e.g., z-50) to block all interaction.
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#4b90ff]">
          Welcome, Student!
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Please enter your name to access your study assistant, Xora.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="true"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm italic mb-4 text-center">
              {error}
            </p>
          )}
          <div className="flex items-center justify-center">
            <button
              className="bg-[#4b90ff] hover:bg-[#5a9bff] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
