import { Router } from 'express';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
import { commentExists, postExistsByPublicId } from '../helpers/db-validators';
import { postComment, putLikeComment } from '../controllers/comments.controller';

const router = Router();

router.post('/:public_id', [
    validateJWT,
    check("public_id").custom(postExistsByPublicId),
    check("comment", "The comment is required").not().isEmpty(),
    validateFields
], postComment)

router.put('/like/:public_id', [
    validateJWT,
    check('public_id').custom(commentExists),
    validateFields
], putLikeComment);

export default router;