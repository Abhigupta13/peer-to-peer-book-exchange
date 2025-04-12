import React, { useState } from 'react';
import { BASE_URL } from '../config/baseUrl';

const BookCard = ({ book, showOwnerDetails = true, onCardClick, isOpen }) => {
  const [bookStatus, setBookStatus] = useState(book.status); // Manage book status
  const [showButtons, setShowButtons] = useState(false); // Manage button visibility
  const seeker = JSON.parse(localStorage.getItem('user'));
  const seekerId = seeker ? seeker._id : null;
  const isSeeker = seeker ? seeker.role === 'Seeker' : false;

  const handleCardClick = () => {
    setShowButtons(prev => !prev); // Toggle button visibility on card click
    onCardClick(); // Call the parent click handler if needed
  };

  const handleRentClick = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/book/rent/${book._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seekerId: seekerId })
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setBookStatus('Rented'); // Update the book status to 'Rented'
        setShowButtons(false); // Hide buttons after renting
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Notify user of error
      }
    } catch (error) {
      console.error('Error renting the book:', error);
      alert('An error occurred while renting the book.');
    }
  };

  const handleCloseClick = () => {
    setShowButtons(false); // Hide buttons when close is clicked
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'available': return 'text-green-500';
      case 'rented': return 'text-yellow-500';
      case 'exchanged': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-gradient-to-r from-[#0f3664] to-[#1e3c72] text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Overlay when buttons are visible */}
      {isOpen && isSeeker && showButtons && (
        <div className="absolute inset-0 z-10 bg-opacity-40 backdrop-blur-sm flex flex-col justify-center items-center space-y-3 p-4 rounded-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRentClick();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded w-32"
          >
            Rent
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseClick();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded w-32"
          >
            Close
          </button>
        </div>
      )}
  
      {/* Card Content */}
      <div className={`${isOpen && isSeeker && showButtons ? 'blur-sm' : ''}`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold truncate pr-2">{book.title}</h2>
          <span className={`font-semibold text-lg ${getStatusColor(bookStatus)}`}>
            {bookStatus}
          </span>
        </div>
  
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="mr-2">✍️</span>
            <p className="text-sm">
              <span className="font-medium">Author:</span> {book.author}
            </p>
          </div>
  
          {book.genre && (
            <div className="flex items-center">
              <span className="mr-2">📚</span>
              <p className="text-sm">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>
            </div>
          )}
  
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <p className="text-sm">
              <span className="font-medium">Location:</span> {book.location}
            </p>
          </div>
  
          <div className="flex items-center">
            <span className="mr-2">📞</span>
            <p className="text-sm">
              <span className="font-medium">Contact:</span> {book.phoneNo}
            </p>
          </div>
  
          {showOwnerDetails && book.owner && (
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="flex items-center">
                <span className="mr-2">👤</span>
                <p className="text-sm">
                  <span className="font-medium">Owner Name:</span> {book.owner.name}
                </p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                <p className="text-sm">
                  <span className="font-medium">Owner Email:</span> {book.owner.email}
                </p>
              </div>
            </div>
          )}
  
          {book.createdAt && (
            <div className="flex items-center text-xs text-gray-400 mt-2">
              <span className="mr-2">🕒</span>
              Listed on: {new Date(book.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default BookCard;