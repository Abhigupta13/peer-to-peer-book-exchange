import express from 'express';
import {
  addBook,
  getAllBooks,
  updateBookStatus,
  rentBook,
  getRentedBooks,
  deleteBook
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', addBook);

router.get('/', getAllBooks);
router.post('/rent/:id',rentBook);
router.delete('/:id',deleteBook);
router.get('/rented/:seekerId', getRentedBooks); 
router.patch('/:id/status', updateBookStatus);

export default router;
