import * as express from 'express';
import { isUser } from '../../middlewares';
import * as jwt from 'jsonwebtoken';
import db_users from '../../database/queries/users';
import { jwt_config } from '../../config';
import { sendVerificationEmail } from '../../utils/mailgun';

const router = express.Router();

router.get('/', isUser, async(req, res) => {
    res.json({ message: 'Made ya look.'});
});

router.get('/email', async (req, res) => {
    const { user, token } = req.query as unknown as QueryParamz;
    try {
        if(!token) {
            return res.json({ message: 'Missing token.'})
        }
        const { email } = jwt.verify(token, jwt_config.secret) as {  email: string };
        await db_users.verified(email);
        res.status(200).json({ message: 'Account verified!'})
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized.'});
        sendVerificationEmail(user);
    }
});

interface QueryParamz { user: string; token: string }



export default router;

// /api/verify/email?spaghetti=large&sauce=marinara
