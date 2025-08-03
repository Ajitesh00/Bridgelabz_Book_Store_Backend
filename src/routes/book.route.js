import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public (authenticated) routes
router.get('/', userAuth, bookController.getAllBooks);
router.post('/', userAuth, bookController.addBook);

// Search books by query (public)
router.get('/search/query', userAuth, bookController.searchBooks);

// Sort books by price (public)
router.get('/sort', userAuth, bookController.sortBooks);

// Admin-only routes
router.get('/:id', userAuth, bookController.getBookById);
router.put('/:id', userAuth, bookController.updateBook);
router.delete('/:id', userAuth, bookController.deleteBook);

export default router;
