import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [userType, setUserType] = useState('student'); // Default user type is 'student'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle user type switch
  const handleSwitchChange = (e) => {
    setUserType(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, email, password, role: userType };

    try {
      const response = await axios.post('http://localhost:3500/user/login', payload);
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Switch for Student/Teacher */}
        <div className="flex justify-center mb-6">
          <label className="mr-4 text-lg font-medium">I am a:</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setUserType('student')}
              className={`px-4 py-2 rounded-lg font-medium ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Student
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className={`px-4 py-2 rounded-lg font-medium ${userType === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Teacher
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium focus:outline-none hover:bg-blue-600"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
