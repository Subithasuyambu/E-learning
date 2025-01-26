import express from 'express'
import { fetchLectures, getallcourses, getsinglecourse,fetchLecture, getMyCourses, checkout, paymentVerification } from '../controllers/Courses.js';
import { isAuth } from '../middleware/isAuth.js'

const router = express.Router();

router.get('/course/all', getallcourses);
router.get('/course/:id', getsinglecourse);
router.get('/lectures/:id', isAuth, fetchLectures);    
router.get('/lecture/:id', isAuth, fetchLecture); 
router.get('/mycourse', isAuth, getMyCourses);  
router.post('/course/checkout/:id', isAuth, checkout);
router.post('/verification/:id',isAuth,paymentVerification)                              

export default router;  











      
             