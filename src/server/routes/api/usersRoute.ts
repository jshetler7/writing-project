import * as express from 'express';
import db_users from '../../database/queries/users';
import { isUser } from '../../middlewares';
import { v4 as uuidv4} from 'uuid';

const router = express.Router();


router.get('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const user = await db_users.getOne(id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get user failed." });
    }
});

router.get('/', isUser, async(req, res) => {
    try {
        const allUsers = await db_users.getAll();
        res.json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get all users failed." });
    }
});

router.put('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const { name, username, email, password } = req.body;
        await db_users.update(id, { name, username, email, password });
        res.status(200).json({ message: "Successfully updated user." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update user failed." });
    }
});

router.post('/', isUser, async(req, res) => {
    try {
        const newUser = req.body;
        await db_users.create(newUser);
        res.status(200).json({ message: "Successfully added user.", id: uuidv4() });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create user failed." });
    }
});

router.delete('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        await db_users.destroy(id);
        res.status(200).json({ message: "Successfully deleted user." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Delete user failed." });
    }
});


export default router;