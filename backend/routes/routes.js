import express from 'express';
import { home, createEntry, getEntries, getAllEntries } from '../controllers/controllers.js';

const router = express.Router();

router.get('/api', home);
router.post('/api/createEntry', createEntry);
router.post('/api/getEntries', getEntries);
router.get('/api/getAllEntries', getAllEntries);

export default router;
