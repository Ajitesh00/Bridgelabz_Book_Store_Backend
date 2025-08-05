import sequelize, { DataTypes } from '../config/database.js';
const Wishlist = require('../models/wishlist')(sequelize, DataTypes);
const Cart = require('../models/cart')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Admin = require('../models/admin')(sequelize, DataTypes);
const Book = require('../models/book')(sequelize, DataTypes);

User.associate && User.associate({ Wishlist, Cart });
Book.associate && Book.associate({ Wishlist, Cart, Admin });
Wishlist.associate && Wishlist.associate({ User, Book });

export const addToWishlist = async (role, userId, body) => {
  try {
    if (role !== 'user'){ 
        return { code: 403, message: 'Only users can add to wishlist', data: {} };
    }

    const { book_id } = body;

    const book = await Book.findByPk(book_id);
    if (!book) {
        return { code: 404, message: 'Book not found', data: {} };
    }

    const alreadyExists = await Wishlist.findOne({ where: { user_id: userId, book_id } });
    if (alreadyExists) {
        return { code: 400, message: 'Book already in wishlist', data: {} };
    }

    const item = await Wishlist.create({ user_id: userId, book_id });

    return { 
        code: 201, 
        message: 'Book added to wishlist', 
        data: item 
    };
  } catch (err) {
    console.error('Add Wishlist Error:', err);
    return { 
        code: 500, 
        message: 'Internal Server Error', 
        data: {} 
    };
  }
};

export const getWishlist = async (role, userId) => {
  try {
    if (role !== 'user') {
        return { code: 403, message: 'Only users can view wishlist', data: [] };
    }

    const items = await Wishlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        { 
          model: Book, 
          attributes: ['bookName', 'description'] 
        },
      ]
    });

    const formatted = items.map(item => ({
      wishlistItemId: item.id,
      userName: `${item.User.firstName} ${item.User.lastName}`,
      bookName: item.Book.bookName,
      bookDescription: item.Book.description,
      createdAt: item.createdAt,
    }));

    return { 
        code: 200, 
        message: 'Wishlist fetched successfully', 
        data: formatted 
    };
  } catch (err) {
    console.error('Get Wishlist Error:', err);
    return { 
        code: 500, 
        message: 'Internal Server Error', 
        data: [] 
    };
  }
};

export const updateWishlist = async (wishlistId, role, userId) => {
  try {
    if (role !== 'user') {
        return { code: 403, message: 'Only users can update wishlist', data: {} };
    }

    const item = await Wishlist.findOne({ where: { id: wishlistId, user_id: userId } });
    if (!item) {
        return { 
            code: 404, 
            message: 'Wishlist item not found', 
            data: {} 
        };
    }
    await item.destroy();
    return { 
        code: 200, 
        message: 'Book removed from wishlist', 
        data: {} 
    };
  } catch (err) {
    console.error('Update Wishlist Error:', err);
    return { 
        code: 500, 
        message: 'Internal Server Error', 
        data: {} 
    };
  }
};

export const removeWishlist = async (role, userId) => {
  try {
    if (role !== 'user') {
        return { code: 403, message: 'Only users can clear wishlist', data: {} };
    }

    await Wishlist.destroy({ where: { user_id: userId } });
    return { 
        code: 200, 
        message: 'Wishlist cleared', 
        data: {} 
    };
  } catch (err) {
    console.error('Remove Wishlist Error:', err);
    return { 
        code: 500, 
        message: 'Internal Server Error', 
        data: {} 
    };
  }
};