import express from 'express';
import { sum } from '../controllers/root.js';

const router = express.Router();

router.post('/sum', sum);

export default router;
