import express from 'express';
import { createCollection } from '../controllers/collection.js';
import { validateSessionTokenHandler } from '@/controllers/auth.js';
const router = express.Router();

router.post('/', validateSessionTokenHandler, createCollection);


export default router;
