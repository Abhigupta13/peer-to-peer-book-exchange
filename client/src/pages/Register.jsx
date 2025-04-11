import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/baseUrl';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', mobile: '', role: 'Owner'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`${BASE_URL}/api/auth/register`, formData);
      navigate(res.data.user.role === 'Owner' ? '/owner-dashboard' : '/seeker-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212121]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          maxLength="10"
          required
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded-md"
        >
          <option value="Owner">Book Owner</option>
          <option value="Seeker">Book Seeker</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/" className="text-green-600 underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
