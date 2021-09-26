import { Router } from 'express';
import { postPost } from '../controllers/post.controller';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
const router = Router();

router.post('/', [
    validateJWT,
    check('description', 'The description is needed').not().isEmpty(),
    validateFields
], postPost);

export default router;