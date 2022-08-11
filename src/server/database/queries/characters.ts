import { Query } from '..';
import { Characters, NewCharacter, UpdateCharacter } from '../../types';

const getAll = (authorid: string) => 
    Query<Characters>('SELECT * FROM characters WHERE authorid = ?', [authorid]);

const getOne = (id: string, authorid: string) => 
    Query<Characters>('SELECT * FROM characters WHERE id = ? AND authorid = ?', [id, authorid]);

const create = (newCharacter: NewCharacter) => 
    Query('INSERT INTO characters SET ?', [newCharacter]);

const update = (pizza: UpdateCharacter, id: string, authorid: string) => 
    Query('UPDATE characters SET ? WHERE id = ? AND authorid = ?', [pizza, id, authorid]);

const destroy = (id:string, authorid: string) => 
    Query('DELETE FROM characters WHERE id = ? AND authorid = ?', [id, authorid]);


export default {
    getAll,
    getOne,
    create,
    update,
    destroy
}