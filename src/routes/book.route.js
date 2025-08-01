import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public (authenticated) routes
router.get('/', userAuth, bookController.getAllBooks);
router.get('/:id', userAuth, bookController.getBookById);

// Admin-only routes
router.post('/', userAuth, bookController.addBook);
router.put('/:id', userAuth, bookController.updateBook);
router.delete('/:id', userAuth, bookController.deleteBook);

export default router;
