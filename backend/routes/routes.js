import express from 'express';
import { createEntry, getEntries, getAllEntries } from '../controllers/controllers';

const router = express.Router();

router.post('/createEntry', createEntry);
router.get('/getEntries', getEntries);
router.get('/getAllEntries', getAllEntries);

export default router;
