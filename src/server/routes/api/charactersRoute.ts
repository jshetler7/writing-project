import * as express from 'express';
import db_characters from '../../database/queries/characters';
import { v4 as uuidv4} from 'uuid';
import { isUser } from '../../middlewares';

const router = express.Router();


router.get('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        const oneCharacter = await db_characters.getOne(id, authorid);
        res.json(oneCharacter[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get character failed." });
    }
});

router.get('/', isUser, async(req, res) => {
    try {

    const authorid = req.authorid;
        const allCharacters = await db_characters.getAll(authorid);
        res.json(allCharacters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get all characters failed." });
    }
});

router.post('/', isUser, async(req, res) => {
    try {
        const newCharacter = req.body;
        newCharacter.authorid = req.authorid;
        console.log(req.authorid);
        newCharacter.id = uuidv4();
        await db_characters.create(newCharacter);
        res.status(200).json({ message: "Successfully added character.", id: newCharacter.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create character failed." });
    }
});

router.put('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        const { name, descriptor, info } = req.body;
        await db_characters.update({ name, descriptor, info }, id, authorid);
        res.status(200).json({ message: "Successfully updated character." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update character failed." });
    }
});

router.delete('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        await db_characters.destroy(id, authorid);
        res.status(200).json({ message: "Successfully deleted character and its tags." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Delete character failed." });
    }
});

router.get('/tags/:id', isUser, async (req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        const oneCharacterTags = await db_characters.getCharacterTags(id, authorid);
        res.json(oneCharacterTags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get character tags failed." });
    }
})

// router.delete('/tags/:id', isUser, async (req, res) => {
// try {
//     const id = req.params.id;
//     const authorid = req.authorid;
//     await db_characters.destroyTag(id, authorid);
//     res.status(200).json({ message: 'Deleted tags'});
// } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Delete tags failed." });
// }
// })


export default router;