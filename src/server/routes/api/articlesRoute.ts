import * as express from 'express';
import db_articles from '../../database/queries/articles';
import db_characters from '../../database/queries/characters';
import { stringify, v4 as uuidv4} from 'uuid';
import { isUser } from '../../middlewares';

const router = express.Router();


router.get('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        const oneArticle = await db_articles.getOne(id, authorid);
        res.json(oneArticle[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get article failed." });
    }
});


router.get('/', isUser, async(req, res) => {
    try {
        const authorid = req.authorid;
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
        newArticle.authorid = req.authorid;
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
        const authorid = req.authorid;
        const { title, content } = req.body;
        await db_articles.update({ title, content }, id, authorid);
        res.status(200).json({ message: "Successfully updated article." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update article failed." });
    }
});

router.delete('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        await db_articles.destroy(id, authorid);
        res.status(200).json({ message: "Successfully deleted article." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Delete article failed." });
    }
});

// Tag Routes from here on

router.get('/tags/:id', isUser, async(req, res) => {
    try {
        const article_id = req.params.id;
        const authorid = req.authorid;
        const tags = await db_articles.getTagsForOneArticle(article_id, authorid);
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get tags failed." });
    }
});

router.get('/tags', isUser, async (req, res) => {
    try {
        const authorid = req.authorid;
        const allTags = await db_articles.getAllTags(authorid);
        res.json(allTags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Get all tags failed.'})
    }
})


router.post('/tags', isUser, async (req, res) => {
    try {
        const { id, newTags } = req.body;
        newTags.authorid = req.authorid;
        // @ts-ignore
        const existingCharacters = newTags.filter(char => !char[2]);
        // @ts-ignore
        const newCharacters = newTags.filter(char => char[2]);

        for await (const existingCharacter of existingCharacters) {
            await db_articles.makeTag({ article_id: id, character_id: existingCharacter[1], authorid: newTags.authorid });
        }

        for await (const newCharacter of newCharacters) {
            const character_id = uuidv4();

            await db_characters.create({ id: character_id, authorid: req.authorid, name: newCharacter[0], descriptor: 'Affiliations, role, etc.', info: "What's this character like?"});
            await db_articles.makeTag({ article_id: id, character_id: character_id, authorid: req.authorid });
        }

        res.status(200).json({ message: 'Create successful!'});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create tag(s) failed." });
    }
})


export default router;