import express from 'express';

import {  authenticateToken } from '../controllers/jwtControllers.js'
import { getToken, createNewAdmin } from '../controllers/jwtControllers.js'

const router = express.Router();

// signup route
router.post("/signup", createNewAdmin);

// get Token
router.post('/gettoken', getToken)

export default router;