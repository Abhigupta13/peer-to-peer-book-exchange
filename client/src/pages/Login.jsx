import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/baseUrl';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);

      const { name, email, role, _id } = res.data.user;

      localStorage.setItem(
        'user',
        JSON.stringify({ name, email, role, _id })
      );

      navigate(role === 'Owner' ? '/owner-dashboard' : '/seeker-dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Info Panel */}
      <div className="w-1/2 bg-blue-900 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">📚 P2P Book Exchange</h1>
        <p className="text-lg text-center max-w-md">
          Welcome to the Peer-to-Peer Book Exchange Portal! <br />
          <br />
          This platform connects <strong>Book Owners</strong> who want to share or rent their books with <strong>Book Seekers</strong> looking to explore.
          <br /><br />
          Login to get started!
        </p>
      </div>

      {/* Right Side Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#f9f9f9]">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white py-2 rounded-md transition ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
