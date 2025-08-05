import sequelize, { DataTypes } from '../config/database.js';
const Book = require('../models/book')(sequelize, DataTypes);
import { Op } from 'sequelize';

// Get all books
export const getAllBooks = async (page, limit, sortBy) => {
  try {
    const offset = (page - 1) * limit;

    let order = [];
    
    switch (sortBy) {
      case 'price_low_to_high':
        order = [['discountPrice', 'ASC']];
        break;
      case 'price_high_to_low':
        order = [['discountPrice', 'DESC']];
        break;
      case 'newest_arrivals':
        order = [['createdAt', 'DESC']];
        break;
      default:
        order = [['id', 'ASC']]; // Default sort: relevance
    }

    const { count, rows } = await Book.findAndCountAll({
      offset,
      limit,
      order
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalRecords: count,
      books: rows
    };
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to retrieve books',
      data: []
    };
  }
};

// Get a book by ID
export const getBookById = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return {
        code: 404,
        message: 'Book not found',
        data: {}
      };
    }
    return {
      code: 200,
      message: 'Book retrieved successfully',
      data: book
    };
  } catch (error) {
    console.error('Error in getBookById:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to retrieve book',
      data: {}
    };
  }
};

// Add a new book
export const addBook = async (bookBody) => {
  try {
    const newBook = await Book.create(bookBody);
    return {
      code: 201,
      message: 'Book added successfully',
      data: newBook
    };
  } catch (error) {
    console.error('Error in addBook:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to add book',
      data: {}
    };
  }
};

// Update a book by ID
export const updateBook = async (id, bookBody) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return {
        code: 404,
        message: 'Book not found',
        data: {}
      };
    }
    await book.update(bookBody);
    return {
      code: 200,
      message: 'Book updated successfully',
      data: book
    };
  } catch (error) {
    console.error('Error in updateBook:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to update book',
      data: {}
    };
  }
};

// Delete a book by ID
export const deleteBook = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return {
        code: 404,
        message: 'Book not found',
        data: {}
      };
    }
    await book.destroy();
    return {
      code: 200,
      message: 'Book deleted successfully',
      data: {}
    };
  } catch (error) {
    console.error('Error in deleteBook:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to delete book',
      data: {}
    };
  }
};

export const searchBooks = async (searchQuery) => {
  try {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { bookName: { [Op.like]: `%${searchQuery}%` } },
          { description: { [Op.like]: `%${searchQuery}%` } },
          { author: { [Op.like]: `%${searchQuery}%` } }
        ]
      }
    });

    return {
      count: books.length,
      results: books
    };
  } catch (error) {
    console.error('Error in searchBooks:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to search books',
      data: []
    };
  }
};

export const sortBooks = async (sortBy) => {
  try {
    let orderClause = [];

    switch (sortBy) {
      case 'price_low_to_high':
        orderClause.push(['price', 'ASC']);
        break;
      case 'price_high_to_low':
        orderClause.push(['price', 'DESC']);
        break;
      case 'newest_arrivals':
        orderClause.push(['createdAt', 'DESC']);
        break;
      // relevance = no specific order
    }

    const books = await Book.findAll({
      order: orderClause
    });

    return {
      sortBy,
      count: books.length,
      results: books
    };
  } catch (error) {
    console.error('Error in sortBooks:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to sort books',
      data: []
    };
  }
};