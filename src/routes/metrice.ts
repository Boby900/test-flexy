import express from 'express';
import { getMetrics } from '../controllers/metrice.js';
// import { validateSessionTokenHandler } from '../controllers/auth.js';
// TODO: was getting an error when using the middleware that token validation failed.
const router = express.Router();

router.get('/', getMetrics);

export default router;
