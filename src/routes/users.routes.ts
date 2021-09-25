import { Router } from 'express';
import { check } from 'express-validator';
import { postUser, getUsers, getUser, putUser, deleteUser } from '../controllers/users.controllers';
import { validateFields } from '../middlewares/validate-fields';
import { validarJWT } from '../middlewares/validate-jwt';
const router = Router();

router.post('/', [], postUser);

router.get('/', [], getUsers);

router.get('/:id', [
    check('id', 'The id has to be a Mongo Id').isMongoId(),
    validateFields
], getUser);

router.put('/:id', [
    validarJWT,
    check('id', 'The id has to be a Mongo Id').isMongoId(),
    validateFields
], putUser);

router.delete('/:id', [
    check('id', 'The id has to be a Mongo Id').isMongoId(),
    validateFields
], deleteUser);

export default router;