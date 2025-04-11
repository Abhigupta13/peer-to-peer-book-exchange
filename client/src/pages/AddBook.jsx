import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../config/baseUrl';

const AddBook = () => {
  const navigate = useNavigate();
  
  // Retrieve userId from localStorage
  const ownerId = localStorage.getItem('userId');

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    phoneNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Combine book data with owner ID
      const completeBookData = {
        ...bookData,
        ownerId: ownerId
      };

      // API call to add book
      const response = await axios.post(`${BASE_URL}/api/book/`, completeBookData);
      
      navigate('/owner-dashboard');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form 
          onSubmit={handleSubmit} 
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter book title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter book author"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Genre (Optional)</label>
            <input
              type="text"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter book genre"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={bookData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              value={bookData.phoneNo}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;