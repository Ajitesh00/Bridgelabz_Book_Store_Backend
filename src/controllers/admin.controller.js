import HttpStatus from 'http-status-codes';
import * as AdminService from '../services/admin.service';

export const getAllAdmins = async (req, res, next) => {
  try {
    const data = await AdminService.getAllAdmins();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    req.body.role = 'admin';
    const result = await AdminService.registerAdmin(req.body);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Internal server error'
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const result = await AdminService.loginAdmin(req.body);
    res.status(result.code).json(result);
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      message: error.message || 'Internal server error',
      data: error.data || {}
    });
  }
};
