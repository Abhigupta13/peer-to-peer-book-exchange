import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

export const addBook = async (req, res) => {
  const { title, author, genre, location, phoneNo, ownerId } = req.body;

  if (!title || !author || !location || !phoneNo || !ownerId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findById(ownerId);
    if (!user || user.role !== 'Owner') {
      return res.status(403).json({ message: 'Only Owners can add books' });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      location,
      phoneNo,
      owner: ownerId,
    });

    await newBook.save();

    res.status(201).json({
      message: 'Book added successfully',
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllBooks = async (req, res) => {
  const { title, location } = req.query;

  let filter = {};

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  try {
    const books = await Book.find(filter).populate('owner', 'name email mobile');
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
};

export const updateBookStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.status = status;
    await book.save();

    res.status(200).json({ message: 'Book status updated', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error });
  }
};
