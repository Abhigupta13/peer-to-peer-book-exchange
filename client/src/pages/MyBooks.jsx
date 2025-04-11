import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { BASE_URL } from '../config/baseUrl';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/book/`);
      const ownerBooks = response.data.books.filter(
        book => book.owner._id === user._id
      );

      setBooks(ownerBooks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books", error);
      setLoading(false);
    }
  };

  // Update Book Status
  const handleStatusChange = async (bookId, newStatus) => {
    try {
      await axios.patch(`${BASE_URL}/api/book/${bookId}/status`, { 
        status: newStatus 
      });
      
      fetchBooks();
    } catch (error) {
      console.error("Failed to update book status", error);
      alert("Failed to update book status");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading your books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My Books</h1>
        
        {books.length === 0 ? (
          <div className="text-center text-gray-600">
            You haven't added any books yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div 
                key={book._id} 
                className="bg-white rounded-lg shadow-md p-4"
              >
                <BookCard book={book} />
                
                <div className="mt-4">
                  <select
                    value={book.status}
                    onChange={(e) => handleStatusChange(book._id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Exchanged">Exchanged</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;