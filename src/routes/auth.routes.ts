import { Router } from 'express';
import { check } from 'express-validator';
import { login, isAuthenticated } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.post('/login', [
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);

router.post('/', [validateJWT, validateFields], isAuthenticated);

export default router;