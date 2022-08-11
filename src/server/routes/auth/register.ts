import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4} from 'uuid';
import db_users from '../../database/queries/users';
import { jwt_config } from '../../config';


const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        newUser.password = bcrypt.hashSync(newUser.password, 12);
        newUser.id = uuidv4();
        await db_users.create(newUser);
        const token = jwt.sign({id: newUser.id,  role: 'user'}, jwt_config.secret, { expiresIn: jwt_config.expiration });
        res.status(201).json({ message: "New user created.", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to register new user." })
    }
})


export default router;