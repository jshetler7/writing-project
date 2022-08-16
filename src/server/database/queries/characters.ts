import { Query } from '..';
import { Characters, CharacterTagSpec, NewCharacter, UpdateCharacter } from '../../types';

const getAll = (authorid: string) => 
    Query<Characters[]>('SELECT * FROM characters WHERE authorid = ?', [authorid]);

const getOne = (id: string, authorid: string) => 
    Query<Characters[]>('SELECT * FROM characters WHERE id = ? AND authorid = ?', [id, authorid]);

const create = (newCharacter: NewCharacter) => 
    Query('INSERT INTO characters SET ?', [newCharacter]);

const update = (pizza: UpdateCharacter, id: string, authorid: string) => 
    Query('UPDATE characters SET ? WHERE id = ? AND authorid = ?', [pizza, id, authorid]);

const destroy = (id:string, authorid: string) => 
    Query('DELETE FROM characters WHERE id = ? AND authorid = ?', [id, authorid]);

const getCharacterTags = (id: string, authorid: string) => 
    Query<CharacterTagSpec[]>(`SELECT tags.*, articles.title FROM tags JOIN articles ON articles.id = tags.article_id WHERE character_id = ? AND tags.authorid = ?`, [id, authorid]);

const destroyTag = (id: string, authorid: string) => 
    Query(`DELETE FROM tags WHERE character_id = ? AND authorid = ?`, [id, authorid]);

export default {
    getAll,
    getOne,
    create,
    update,
    destroy,
    getCharacterTags,
    destroyTag
}