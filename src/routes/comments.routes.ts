import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
import { postExistsByPublicId } from '../helpers/db-validators';
import { postComment } from '../controllers/comments.controller';

const router = Router();

router.post('/:public_id', [
    validateJWT,
    check("public_id").custom(postExistsByPublicId),
    check("comment", "The comment is required").not().isEmpty(),
    validateFields
], postComment)

export default router;