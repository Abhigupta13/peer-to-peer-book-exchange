// client/src/pages/MyRentedBooks.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { BASE_URL } from '../config/baseUrl';

const MyRentedBooks = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const seeker = JSON.parse(localStorage.getItem('user'));

  const fetchRentedBooks = async () => {
    const seekerId = seeker ? seeker._id : null;

    try {
      const response = await axios.get(`${BASE_URL}/api/book/rented/${seekerId}`);
      setRentedBooks(response.data.rentedBooks || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rented books", error);
      setLoading(false);
    }
  };

  const handleUpdateToAvailable = async (bookId) => {
    try {
      await axios.patch(`${BASE_URL}/api/book/${bookId}/status`, { status: 'Available' });
      fetchRentedBooks(); // Refresh the rented books list
    } catch (error) {
      console.error("Failed to update book status", error);
      alert("Failed to update book status");
    }
  };

  useEffect(() => {
    fetchRentedBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading your rented books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My Rented Books</h1>
        
        {rentedBooks.length === 0 ? (
          <div className="text-center text-gray-600">
            You have not rented any books yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentedBooks.map((book) => (
              <div 
                key={book._id} 
                className="bg-white rounded-lg shadow-md p-4"
              >
                <BookCard book={book} />
                
                <div className="mt-4">
                  <button 
                    onClick={() => handleUpdateToAvailable(book._id)} 
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Mark as Available
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentedBooks;