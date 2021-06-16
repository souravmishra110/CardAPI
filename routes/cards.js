import express from 'express';

import {  authenticateToken } from '../controllers/jwtControllers.js'
import { getCards, createCard , getCardsById , updateCard , deleteCard , getCardsByLanguage, getCardsByFramework } from '../controllers/cardsControllers.js';

const router = express.Router();

router.get('/', authenticateToken,getCards);
router.get('/:id', authenticateToken,getCardsById);
router.get('/language/:language', authenticateToken,getCardsByLanguage);
router.get('/framework/:framework', authenticateToken,getCardsByFramework);

router.post('/', authenticateToken,createCard);

router.delete('/:id', authenticateToken,deleteCard);

router.patch('/:id', authenticateToken,updateCard);

export default router;