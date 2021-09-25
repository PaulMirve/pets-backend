import { Router } from 'express';
import { check } from 'express-validator';
import { postUser, getUsers, getUser, putUser, deleteUser } from '../controllers/users.controllers';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { userHasRole } from '../middlewares/validate-roles';
import { userExists } from '../helpers/db-validators';
const router = Router();

router.post('/', [
    check("name", "The name is required").not().isEmpty(),
    check("lastName", "The last name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    validateFields
], postUser);

router.get('/', [], getUsers);

router.get('/:id', [
    check('id', 'The id has to be a Mongo Id').isMongoId(),
    check('id').custom(userExists),
    validateFields
], getUser);

router.put('/:id', [
    validateJWT,
    check('id', 'The id has to be a Mongo Id').isMongoId(),
    check('id').custom(userExists),
    validateFields
], putUser);

router.delete('/:id', [
    validateJWT,
    userHasRole(['ADMIN_ROLE']),
    check('id', 'The id has to be a Mongo Id').isMongoId(),
    check('id').custom(userExists),
    validateFields
], deleteUser);

export default router;