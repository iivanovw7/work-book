import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/validation';
import * as auth from '../controllers/auth.controller';
import { catchErrors } from '../utils';

const router = express.Router();

router.post('/login', validate(paramValidation.login), catchErrors(auth.login));
router.get('/login', validate(paramValidation.checkToken), catchErrors(auth.checkToken));
// Check if server application is alive
router.get('/check', (req, res) => res.send('OK'));

// eslint-disable-next-line import/prefer-default-export
export { router as authRoutes };
