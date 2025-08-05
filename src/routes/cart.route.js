import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', userAuth, cartController.addToCart); // Add to cart
router.get('/', userAuth, cartController.getCart);    // Get all cart items
router.put('/:id', userAuth, cartController.updateCart); // Update quantity in cart
router.delete('/:id', userAuth, cartController.removeFromCart); // Remove from cart

export default router;