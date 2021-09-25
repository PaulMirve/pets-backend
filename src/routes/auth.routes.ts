import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);

export default router;