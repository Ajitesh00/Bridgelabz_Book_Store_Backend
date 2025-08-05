import sequelize, { DataTypes } from '../config/database.js';
const User = require('../models/user')(sequelize, DataTypes);
const Admin = require('../models/admin')(sequelize, DataTypes);
const Cart = require('../models/cart')(sequelize, DataTypes);
const Wishlist = require('../models/wishlist')(sequelize, DataTypes);
const Book = require('../models/book')(sequelize, DataTypes);

User.associate && User.associate({ Cart, Wishlist });
Book.associate && Book.associate({ Cart, Wishlist, Admin });
Cart.associate && Cart.associate({ User, Book });

// Add to cart
export const addToCart = async (role, userId, body) => {
  try {
    if (role !== 'user') {
      return { code: 403, message: 'Only users can add to cart', data: {} };
    }

    const { book_id, quantity } = body;

    if (typeof quantity !== 'number' || quantity <= 0) {
      return {
        code: 400,
        message: 'Quantity must be a valid number',
        data: {}
      };
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      return { code: 404, message: 'Book not found', data: {} };
    }

    if (quantity > book.quantity) {
      return {
        code: 400,
        message: `Only ${book.quantity} books available`,
        data: {}
      };
    }

    const price = book.discountPrice;
    const total = price * quantity;

    const payload = {
      book_id,
      price,
      quantity,
      total,
      user_id: userId
    };

    const cartItem = await Cart.create(payload);

    return {
      code: 201,
      message: 'Book added to cart',
      data: cartItem
    };
  } catch (error) {
    console.error('Add to Cart Error:', error);
    return {
      code: 500,
      message: 'Internal Server Error',
      data: {}
    };
  }
};

// Get cart items
export const getCart = async (role, userId) => {
  try {
    if (role !== 'user') {
      return { code: 403, message: 'Only users can view cart', data: [] };
    }

    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Book,
          attributes: ['bookName', 'description'],
        },
      ]
    });

    const formattedCart = cartItems.map(item => ({
      cartItemId: item.id,
      userName: `${item.User.firstName} ${item.User.lastName}`,
      bookName: item.Book.bookName,
      bookDescription: item.Book.description,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    return {
      code: 200,
      message: 'Cart retrieved successfully',
      data: formattedCart
    };
  } catch (error) {
    console.error('Get Cart Error:', error);
    return {
      code: 500,
      message: 'Internal Server Error',
      data: []
    };
  }
};

// Update cart quantity
export const updateCart = async (cartItemId, role, userId, body) => {
  try {
    if (role !== 'user') {
      return { code: 403, message: 'Only users can update cart', data: {} };
    }

    const cartItem = await Cart.findOne({ where: { id: cartItemId, user_id: userId } });

    if (!cartItem) {
      return {
        code: 404,
        message: 'Cart item not found or access denied',
        data: {}
      };
    }

    const { quantity } = body;

    if (typeof quantity !== 'number' || quantity <= 0) {
      return {
        code: 400,
        message: 'Quantity must be a valid number',
        data: {}
      };
    }

    const book = await Book.findByPk(cartItem.book_id);
    if (!book) {
      return { code: 404, message: 'Book not found', data: {} };
    }

    if (quantity > book.quantity) {
      return {
        code: 400,
        message: `Only ${book.quantity} books available`,
        data: {}
      };
    }

    cartItem.quantity = quantity;
    cartItem.total = quantity * cartItem.price;

    await cartItem.save();

    return {
      code: 200,
      message: 'Cart updated successfully',
      data: cartItem
    };

  } catch (error) {
    console.error('Update Cart Error:', error);
    return {
      code: 500,
      message: 'Internal Server Error',
      data: {}
    };
  }
};

// Remove from cart
export const removeFromCart = async (cartItemId, role, userId) => {
  try {
    if (role !== 'user') {
      return { code: 403, message: 'Only users can remove from cart', data: {} };
    }

    const cartItem = await Cart.findOne({ where: { id: cartItemId, user_id: userId } });
    if (!cartItem) {
      return {
        code: 404,
        message: 'Cart item not found or access denied',
        data: {}
      };
    }

    await cartItem.destroy();

    return {
      code: 200,
      message: 'Item removed from cart',
      data: {}
    };
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    return {
      code: 500,
      message: 'Internal Server Error',
      data: {}
    };
  }
};
