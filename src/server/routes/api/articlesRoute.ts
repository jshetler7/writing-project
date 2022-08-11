import * as express from 'express';
import db_articles from '../../database/queries/articles';
import { v4 as uuidv4} from 'uuid';
import { isUser } from '../../middlewares';

const router = express.Router();


router.get('/:id', isUser, async(req, res) => {
    const id = req.params.id;
    // @ts-ignore
    const authorid = req.authorid;
    try {
        const oneArticle = await db_articles.getOne(id, authorid);
        res.json(oneArticle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get article failed." });
    }
});

router.get('/', isUser, async(req, res) => {
    // @ts-ignore
    const authorid = req.authorid;
    try {
        const allArticles = await db_articles.getAll(authorid);
        res.json(allArticles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get all articles failed." });
    }
});

router.post('/', isUser, async(req, res) => {
    try {
        const newArticle = req.body;
        // @ts-ignore
        newArticle.authorid = req.authorid;
        // @ts-ignore
        console.log(req.authorid);
        newArticle.id = uuidv4();
        await db_articles.create(newArticle);
        res.status(200).json({ message: "Successfully added article.", id: newArticle.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create article failed." });
    }
});

router.put('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        // @ts-ignore
        const authorid = req.authorid;
        const { title, content, characterid } = req.body;
        await db_articles.update({ title, content, characterid }, id, authorid);
        res.status(200).json({ message: "Successfully updated article." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update article failed." });
    }
});

router.delete('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        // @ts-ignore
        const authorid = req.authorid;
        await db_articles.destroy(id, authorid);
        res.status(200).json({ message: "Successfully deleted article." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Delete article failed." });
    }
});


export default router;