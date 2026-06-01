import { Router } from 'express';
import upload from '../middleware/upload.js';
import { generatePortfolio, getPortfolio } from '../controllers/portfolioController.js';

const router = Router();

router.post('/generate', upload.single('resume'), generatePortfolio);
router.get('/:id', getPortfolio);

export default router;
