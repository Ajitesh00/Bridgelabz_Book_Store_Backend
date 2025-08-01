import express from 'express';
import * as adminController from '../controllers/admin.controller';

const router = express.Router();

// route to get all admins
router.get('', adminController.getAllAdmins);

// route to register a new admin
router.post('/register', adminController.registerAdmin);

// route to login an admin
router.post('/login', adminController.loginAdmin);

export default router;
