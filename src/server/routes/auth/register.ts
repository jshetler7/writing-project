import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4} from 'uuid';
import db_users from '../../database/queries/users';
import { jwt_config } from '../../config';
import { sendVerificationEmail } from '../../utils/mailgun';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, username, email, password} = req.body;
        if (!name||!username||!email||!password) {
            return res.status(400).json({ message: 'All fields not filled out.'})
        }
        const id = uuidv4();
        const hash = bcrypt.hashSync(password, 12);
        await db_users.create({ id, name, username, email, password: hash });
        await sendVerificationEmail(email);
        const token = jwt.sign({id: id, role: 'user', email: email, userIsVerified: false}, jwt_config.secret, { expiresIn: jwt_config.expiration });
        res.status(201).json({ message: "New user created.", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to register new user." })
    }
})


export default router;