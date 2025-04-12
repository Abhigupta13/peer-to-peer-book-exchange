import express from 'express';
import {
  addBook,
  getAllBooks,
  updateBookStatus,
  rentBook,
  getRentedBooks
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', addBook);

router.get('/', getAllBooks);
router.post('/rent/:id',rentBook);
router.get('/rented/:seekerId', getRentedBooks); 
router.patch('/:id/status', updateBookStatus);

export default router;
