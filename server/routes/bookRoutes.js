import express from 'express';
import {
  addBook,
  getAllBooks,
  updateBookStatus,
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', addBook);

router.get('/', getAllBooks);

router.patch('/:id/status', updateBookStatus);

export default router;
