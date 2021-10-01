import { Router } from 'express';
import { getPosts, postPost, getPost, putPost, deletePost, getPostByUser, putLike } from '../controllers/post.controller';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
import { validateFile } from '../middlewares/validate-file';
import { userHasRole } from '../middlewares/check-roles';
import { postExists, postExistsByPublicId, userExistsByUsername } from '../helpers/db-validators';
const router = Router();

router.post('/', [
    validateJWT,
    validateFile,
    check('description', 'The description is needed').not().isEmpty(),
    validateFields
], postPost);

router.get('/', [], getPosts);

router.get('/:public_id', [
    check("public_id").custom(postExistsByPublicId),
    validateFields
], getPost);

router.get('/u/:username', [
    check('username').custom(userExistsByUsername),
    validateFields
], getPostByUser);


router.put('/:public_id', [
    validateJWT,
    userHasRole(["ADMIN_ROLE"]),
    check("public_id").custom(postExistsByPublicId),
    validateFields
], putPost);

router.put('/like/:public_id', [
    validateJWT,
    check("public_id").custom(postExistsByPublicId),
    validateFields
], putLike);

router.delete('/:id', [
    validateJWT,
    check("id", "The id is not a valid id").isMongoId(),
    check("id").custom(postExists),
    validateFields
], deletePost);

export default router;