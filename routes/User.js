import express from 'express';
import { register,verifyUser,login,myprofile, forgotPassword, resetPassword} from '../controllers/User.js';
import { isAuth } from '../middleware/isAuth.js';
import { addProgress, getYourProgress } from '../controllers/Courses.js';

const router = express.Router();
router.post('/user/register', register);
router.post('/user/verify', verifyUser);
router.post('/user/login', login)
router.get('/user/profile', isAuth, myprofile);
router.post('/user/forgot', forgotPassword);
router.post('/user/reset', resetPassword);
router.post('/user/progress', isAuth, addProgress);
router.get('/user/progress', isAuth, getYourProgress);
              
export default router;





























