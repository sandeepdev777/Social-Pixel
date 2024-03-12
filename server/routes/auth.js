import express from 'express';
import {login} from '../controllers/auth.js';

const router = express.Router();  //this actually creates new object(eg: instead of using app.use we can use router.use)

router.post('/login', login);

export default router;