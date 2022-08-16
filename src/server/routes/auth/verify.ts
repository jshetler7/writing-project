import * as express from 'express';
import { isUser } from '../../middlewares';

const router = express.Router();

router.get('/', isUser, async(req, res) => {
    res.json({ message: 'Made ya look.'});
});

export default router;