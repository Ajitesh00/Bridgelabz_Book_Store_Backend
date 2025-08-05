import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service.js';

// Add book to cart
export const addToCart = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    const data = await CartService.addToCart(role, userId, req.body);

    res.status(data.code).json({
      code: data.code,
      message: data.message,
      data: data.data
    });
  } catch (error) {
    next(error);
  }
};

// Get all items in cart
export const getCart = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    const data = await CartService.getCart(role, userId);

    res.status(data.code).json({
      code: data.code,
      message: data.message,
      data: data.data
    });
  } catch (error) {
    next(error);
  }
};

// Update cart item
export const updateCart = async (req, res, next) => {
  try {
    const cartItemId = req.params.id;
    const role = req.user.role;
    const userId = req.user.id;

    const data = await CartService.updateCart(cartItemId, role, userId, req.body);

    res.status(data.code).json({
      code: data.code,
      message: data.message,
      data: data.data
    });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const cartItemId = req.params.id;
    const role = req.user.role;
    const userId = req.user.id;

    const data = await CartService.removeFromCart(cartItemId, role, userId);

    res.status(data.code).json({
      code: data.code,
      message: data.message,
      data: data.data
    });
  } catch (error) {
    next(error);
  }
};