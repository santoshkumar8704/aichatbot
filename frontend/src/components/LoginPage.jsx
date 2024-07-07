import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://accenchat.onrender.com/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // Redirect to homepage
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login to AccenChat</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300">Login</button>
        </form>
        <p className="mt-4 text-center text-gray-600">Don't have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
