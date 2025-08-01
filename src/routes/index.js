import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import adminRoute from './admin.route';
import bookRoute from './book.route'
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/user', userRoute);
  router.use('/admin', adminRoute);
  router.use('/book', bookRoute);

  return router;
};

export default routes;
