import { Router } from 'express';
import { getPosts, postPost, getPost, putPost, deletePost, getPostByUser } from '../controllers/post.controller';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';
import { validateFile } from '../middlewares/validate-file';
import { userHasRole } from '../middlewares/check-roles';
import { postExists } from '../helpers/db-validators';
const router = Router();

router.post('/', [
    validateJWT,
    validateFile,
    check('description', 'The description is needed').not().isEmpty(),
    validateFields
], postPost);

router.get('/', [], getPosts);

router.get('/:id', [
    check("id", "The id is not a valid id").isMongoId(),
    check("id").custom(postExists)
], getPost);

router.get('/u/:username', [], getPostByUser);

router.put('/:id', [
    validateJWT,
    userHasRole(["ADMIN_ROLE"]),
    check("id", "The id is not a valid id").isMongoId(),
    check("id").custom(postExists),
    check('description', 'The description is requried').not().isEmpty(),
    validateFields
], putPost);

router.delete('/:id', [
    validateJWT,
    check("id", "The id is not a valid id").isMongoId(),
    check("id").custom(postExists),
    validateFields
], deletePost);

export default router;