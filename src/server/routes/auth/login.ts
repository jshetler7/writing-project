import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import db_users from '../../database/queries/users';
import { jwt_config } from '../../config';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db_users.getbyEmail(email);

        if(!users) {
            res.status(401).json({ message: "No user found, unauthorized." });
            return;
        };

        const matched = bcrypt.compareSync(password, users.password);

        if(matched) {
            const token = jwt.sign({ id: users.id, role: users.role}, jwt_config.secret, { expiresIn: jwt_config.expiration });
            res.json({ message: "Match confirmed.", token });
        } else  {
            res.json({ message: "No match found." });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login request failed."})
    }
})

export default router;