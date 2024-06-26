import express from 'express';

import { calculate, store } from '../controllers/root.js';

const router = express.Router();

router.post('/store-file', store);
router.post('/calculate', calculate);

export default router;
