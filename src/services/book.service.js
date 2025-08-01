import sequelize, { DataTypes } from '../config/database.js';
const Book = require('../models/book')(sequelize, DataTypes);

// Get all books
export const getAllBooks = async () => {
  try {
    const books = await Book.findAll();
    return {
      code: 200,
      message: 'Books retrieved successfully',
      data: books
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