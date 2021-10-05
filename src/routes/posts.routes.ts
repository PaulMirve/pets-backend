import { Router } from 'express';
import { getPosts, postPost, getPost, putPost, deletePost, getPostByUser, putLike, putDescription } from '../controllers/post.controller';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
import { validateFile } from '../middlewares/validate-file';
import { userHasRole } from '../middlewares/check-roles';
import { postExists, postExistsByPublicId, userExistsByUsername } from '../helpers/db-validators';
import validateExtensions from '../middlewares/validate-extensions';
const router = Router();

router.post('/', [
    validateJWT,
    validateFile,
    validateExtensions,
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

router.put('/c/:public_id', [
    validateJWT,
    check("public_id").custom(postExistsByPublicId),
    check("description", "The description is required").not().isEmpty(),
    validateFields
], putDescription);

router.delete('/:public_id', [
    validateJWT,
    check("public_id").custom(postExistsByPublicId),
    validateFields
], deletePost);

export default router;