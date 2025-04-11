import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { BASE_URL } from '../config/baseUrl';

const SeekerDashboard = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        genre: '',
        location: '',
        status: ''
    });

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/book/`);
            setBooks(res.data.books || []);
            setFilteredBooks(res.data.books || []);
        } catch (error) {
            console.error("Error fetching books:", error.message);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = () => {
        const results = books.filter(book => {
            const searchMatch = !searchTerm || 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.location.toLowerCase().includes(searchTerm.toLowerCase());

            const genreMatch = !filters.genre || 
                book.genre.toLowerCase() === filters.genre.toLowerCase();

            const locationMatch = !filters.location || 
                book.location.toLowerCase().includes(filters.location.toLowerCase());

            const statusMatch = !filters.status || 
                book.status.toLowerCase() === filters.status.toLowerCase();

            return searchMatch && genreMatch && locationMatch && statusMatch;
        });

        setFilteredBooks(results);
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, filters, books]);

    const uniqueGenres = [...new Set(books.map(book => book.genre).filter(Boolean))];
    const uniqueLocations = [...new Set(books.map(book => book.location).filter(Boolean))];
    
    const statusOptions = [
        'Available',
        'Rented',
        'Exchanged'
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Book Exchange</h1>
                

                <div className="mb-6 flex flex-wrap justify-center items-center gap-4">
            
                    <input 
                        type="text" 
                        placeholder="Search books (Title, Author, Genre, Location)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select 
                        value={filters.genre}
                        onChange={(e) => setFilters(prev => ({...prev, genre: e.target.value}))}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Genres</option>
                        {uniqueGenres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>

                    <select 
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Locations</option>
                        {uniqueLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>

                    <select 
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Statuses</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <BookCard 
                                key={book._id} 
                                book={book} 
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No books match your search criteria
                        </p>
                    )}
                </div>

                <div className="mt-4 text-center text-gray-600">
                    {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                </div>
            </div>
        </div>
    )
}

export default SeekerDashboard;