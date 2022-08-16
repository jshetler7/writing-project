import * as express from 'express';
import loginRoute from '../auth/login';
import registerRoute from '../auth/register';
import verifyRoute from '../auth/verify';

const router = express.Router();

router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/verify', verifyRoute);

export default router;