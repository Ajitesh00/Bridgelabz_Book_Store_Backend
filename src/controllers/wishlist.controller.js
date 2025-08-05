import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service.js';

export const addToWishlist = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;
    const data = await WishlistService.addToWishlist(role, userId, req.body);
    res.status(data.code).json(data);
  } catch (err) {
    next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;
    const data = await WishlistService.getWishlist(role, userId);
    res.status(data.code).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateWishlist = async (req, res, next) => {
  try {
    const wishlistId = req.params.id;
    const role = req.user.role;
    const userId = req.user.id;
    const data = await WishlistService.updateWishlist(wishlistId, role, userId);
    res.status(data.code).json(data);
  } catch (err) {
    next(err);
  }
};

export const removeWishlist = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.user.id;
    const data = await WishlistService.removeWishlist(role, userId);
    res.status(data.code).json(data);
  } catch (err) {
    next(err);
  }
};