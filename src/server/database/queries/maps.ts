import { Query } from "..";
import { Maps, NewMap, UpdateMap } from '../../types';

const getAll = (authorid: string) => Query<Maps[]>("SELECT * FROM maps WHERE authorid = ?", [authorid]);

const getOne = (id: string, authorid: string) => Query<Maps[]>("SELECT * FROM maps WHERE id = ? AND authorid = ?", [id, authorid]);

const create = (newMap: NewMap) => Query("INSERT INTO maps SET ?", [newMap]);

const update = (pizza: UpdateMap, id: string, authorid: string) => Query("UPDATE maps SET ? WHERE id = ? AND  authorid = ?", [pizza, id, authorid]);

const destroy = (id: string, authorid: string) => Query("DELETE FROM maps WHERE id = ? AND authorid = ?", [id, authorid]);


export default {
    getAll, 
    getOne,
    create,
    update,
    destroy
};