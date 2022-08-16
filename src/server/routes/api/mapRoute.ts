import * as express from 'express';
import db_maps from '../../database/queries/maps';
import { isUser } from '../../middlewares';
import { v4 as uuid } from 'uuid';

const router = express.Router();


router.get('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        const oneMap = await db_maps.getOne(id, authorid);
        res.json(oneMap[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get article failed." });
    }
});


router.get('/', isUser, async(req, res) => {
    try {
        const authorid = req.authorid;
        const allMaps = await db_maps.getAll(authorid);
        res.json(allMaps);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Get all maps failed." });
    }
});


router.post('/', isUser, async(req, res) => {
    try {
        const newMap = req.body;
        newMap.authorid = req.authorid;
        newMap.id = uuid();
        await db_maps.create(newMap);
        res.status(200).json({ message: "Successfully added map.", id: newMap.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Create map failed." });
    }
});

router.put('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        const { title, description } = req.body;
        await db_maps.update({ title, description }, id, authorid);
        res.status(200).json({ message: "Successfully updated map." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Update map failed." });
    }
});

router.delete('/:id', isUser, async(req, res) => {
    try {
        const id = req.params.id;
        const authorid = req.authorid;
        await db_maps.destroy(id, authorid);
        res.status(200).json({ message: "Successfully deleted map." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Delete map failed." });
    }
});
export default router;