import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', userAuth, wishlistController.addToWishlist);
router.get('/', userAuth, wishlistController.getWishlist);
router.delete('/', userAuth, wishlistController.removeWishlist); // Clear all
router.put('/:id', userAuth, wishlistController.updateWishlist); // Remove specific book

export default router;