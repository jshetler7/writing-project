import * as express from 'express';
import usersRoute from '../api/usersRoute';
import articlesRoute from '../api/articlesRoute';
import charactersRoute from '../api/charactersRoute';
import mapsRoute from '../api/mapRoute';
import uploadRoute from '../api/uploadRoute';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/articles', articlesRoute);
router.use('/characters', charactersRoute);
router.use('/maps', mapsRoute);
router.use('/upload', uploadRoute);

export default router;