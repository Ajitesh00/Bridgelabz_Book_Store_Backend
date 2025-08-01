// user.controller.js
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    req.body.role = 'user';
    const result = await UserService.registerUser(req.body);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Internal server error'
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await UserService.loginUser(req.body);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      message: error.message || 'Internal server error',
      data: error.data || {}
    });
  }
};
