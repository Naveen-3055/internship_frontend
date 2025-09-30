import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { serverUrl } from '../main'
import { setUserData } from '../redux/authSlice'
import Navbar from './Navbar'

function DashBoard() {
  let {userData} = useSelector(state => state.auth)
  let dispatch = useDispatch()

   const [userName, setUserName] = useState(userData?.userName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [editing, setEditing] = useState(false);
   const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
// fetch tasks
   const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/tasks?search=${search}&status=${status}`,
        { withCredentials: true }
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };
    useEffect(() => {
    fetchTasks();
  }, [search, status]);

 
   // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${serverUrl}/api/profile/update`,
        { userName ,email},
        { withCredentials: true }
      );
      dispatch(setUserData(res.data.user));
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

   const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${serverUrl}/api/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

   // Toggle status
  const handleToggleStatus = async (task) => {
    try {
      await axios.put(
        `${serverUrl}/api/tasks/${task._id}`,
        { status: task.status === "pending" ? "completed" : "pending" },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar/>
     <div className="p-6 max-w-6xl mx-auto space-y-8">
       
      {/* Dashboard Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-12">
          Welcome, <span className="text-blue-500">{userData?.userName}</span>
        </h1>
        <p className="text-gray-500 mt-7">Manage your profile & tasks</p>
      </header>

      {/* Profile Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        {!editing ? (
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {userData?.userName}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email}
              </p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleUpdateProfile}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border p-2 rounded shadow w-full md:w-1/3"
              placeholder="Username"
            />
           <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded shadow w-full md:w-1/3"
              placeholder="Email"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {message && (
        <p className="text-green-600 font-semibold text-center">{message}</p>
      )}

      {/* Tasks Section */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">My Tasks</h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded shadow w-full md:flex-1"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded shadow w-full md:w-48"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        {tasks.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col justify-between p-4 border rounded-lg shadow hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-lg">{task.title}</p>
                  <p className="text-gray-600">{task.description}</p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      task.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleToggleStatus(task)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </section>
    </div>
    </div>
  )
}

export default DashBoard
