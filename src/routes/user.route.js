import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

// //route to create a new user
// router.post('', newUserValidator, userController.newUser);

// //route to get a single user by their user id
// router.get('/:id', userAuth, userController.getUser);

// //route to update a single user by their user id
// router.put('/:id', userController.updateUser);

// //route to delete a single user by their user id
// router.delete('/:id', userController.deleteUser);

// route to register a new user
router.post('/register',userController.registerUser);

// route to login a user
router.post('/login', userController.loginUser);

export default router;
