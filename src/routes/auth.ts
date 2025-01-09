import express from 'express';
import { signupHandler } from '../controllers/auth.js';


const router = express.Router();
router.post('/signup', signupHandler); // Handles user signup



  
export default router;
