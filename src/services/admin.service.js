import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const Admin = require('../models/admin')(sequelize, DataTypes);

export const getAllAdmins = async () => {
  const data = await Admin.findAll();
  return data;
};


export const registerAdmin = async (body) => {
  try {
    const existingAdmin = await Admin.findOne({ where: { email: body.email } });
    if (existingAdmin) {
      return {
        code: 400,
        data: {},
        message: 'Admin already exists'
      };
    }

    console.log(body);

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newAdmin = await Admin.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      role: body.role
    });

    return {
      code: 201,
      data: { newAdmin},
      message: 'Admin registered successfully'
    };
  } catch (error) {
    return {
      code: error.code || 500,
      data: {},
      message: error.message || 'Registration failed'
    };
  }
};

export const loginAdmin = async (body) => {
  try {
    const admin = await Admin.findOne({ where: { email: body.email } });
    if (!admin) {
      return {
        code: 404,
        message: 'Admin not found',
        data: {}
      };
    }

    const isPasswordValid = await bcrypt.compare(body.password, admin.password);
    if (!isPasswordValid) {
      return {
        code: 401,
        message: 'Invalid password',
        data: {}
      };
    }

    const adminData = admin.toJSON();
    delete adminData.password;

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return {
      code: 200,
      message: 'Admin logged in successfully',
      data: { token, admin: adminData }
    };
  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Login failed',
      data: {}
    };
  }
};