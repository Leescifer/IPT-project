import express from 'express';
import {getAllUsers, getUserById, updateUserById, deletedUserById} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/update:id', updateUserById);
router.delete('/delete:id',deletedUserById);

export default router;