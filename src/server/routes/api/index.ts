import * as express from 'express';
import usersRoute from '../api/usersRoute';
import articlesRoute from '../api/articlesRoute';
import charactersRoute from '../api/charactersRoute';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/articles', articlesRoute);
router.use('/characters', charactersRoute);

export default router;