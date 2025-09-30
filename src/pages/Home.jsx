import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { serverUrl } from '../main';

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/api/tasks/create`,
        { title, description },
        { withCredentials: true }
      );
      setMessage("Task successfully added");
      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800  mt-10 mb-10 drop-shadow-lg">
          Add a New Task
        </h1>

        <form
          onSubmit={handleAddTask}
          className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 transition-transform transform hover:scale-[1.02]"
        >
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 font-medium shadow-sm placeholder-gray-400 transition duration-200"
            required
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 font-medium shadow-sm placeholder-gray-400 transition duration-200"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
          >
            Add Task
          </button>

          {message && (
            <p className="text-center mt-2 font-medium text-green-600 animate-fadeIn">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Home;
