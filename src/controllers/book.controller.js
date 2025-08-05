import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service.js';

// GET all books
export const getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await BookService.getAllBooks(page, limit);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Books fetched successfully with pagination'
    });
  } catch (error) {
    next(error);
  }
};


// GET book by ID
export const getBookById = async (req, res, next) => {
  try {
    const data = await BookService.getBookById(req.params.id);
    if (!data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: {},
        message: 'Book not found'
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

// POST add book (admin only)
export const addBook = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        data: {},
        message: 'Access denied'
      });
    }

    const bookBody = {
      ...req.body,
      admin_user_id: req.user.id // should now correctly get admin id
    };

    const data = await BookService.addBook(bookBody);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data,
      message: 'Book added successfully'
    });
  } catch (error) {
    next(error);
  }
};

// PUT update book by ID (admin only)
export const updateBook = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        data: {},
        message: 'Access denied'
      });
    }

    const data = await BookService.updateBook(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Book updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// DELETE book by ID (admin only)
export const deleteBook = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        data: {},
        message: 'Access denied'
      });
    }

    await BookService.deleteBook(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {},
      message: 'Book deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const searchBooks = async (req, res, next) => {
  try {
    const searchQuery = req.query.query;
    if (!searchQuery) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: {},
        message: 'Search query is required'
      });
    }

    const data = await BookService.searchBooks(searchQuery);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Books search completed successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const sortBooks = async (req, res, next) => {
  try {
    const sortBy = req.query.sortBy || 'relevance';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await BookService.getAllBooks(page, limit, sortBy);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Books sorted successfully'
    });
  } catch (error) {
    next(error);
  }
};
