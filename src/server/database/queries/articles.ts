import { Query } from '..';
import { NewArticle, UpdateArticle, Articles, Tags, NewTags } from '../../types';

const getAll = (authorid: string) => 
    Query<Articles[]>('SELECT articles.*, users.username FROM articles JOIN users ON articles.authorid = users.id WHERE authorid = ?', [authorid]);

const getOne = (id: string, authorid: string) => 
    Query<Articles[]>('SELECT * FROM articles WHERE id = ? AND authorid = ?', [id, authorid]);

const create = (newArticle: NewArticle) => 
    Query('INSERT INTO articles SET ?', [newArticle]);

const update = (pizza: UpdateArticle, id: string, authorid: string) => 
    Query('UPDATE articles SET ? WHERE id = ? AND authorid = ?', [pizza, id, authorid]);

const destroy = (id:string, authorid: string) => 
    Query('DELETE FROM articles WHERE id = ? AND authorid = ?', [id, authorid]);

    // Below this point: Queries for Tags, which identify which characters appear in which articles.

const getAllTags = (authorid: string) => 
    Query(`SELECT * FROM tags WHERE authorid = ?`, [authorid]);

const getTagsForOneArticle = (article_id: string, authorid: string) => 
    Query<Tags>(`SELECT tags.*, characters.name FROM tags 
    INNER JOIN articles ON tags.article_id = articles.id 
    INNER JOIN characters ON characters.id = tags.character_id
    WHERE tags.article_id = ? AND articles.authorid = ?`, [article_id, authorid]);

const createTag = (articles_id: string, characters_id: string, authorid: string) => 
    Query(`INSERT INTO tags (article_id, character_id, authorid) VALUES (?, ?, ?)`, [articles_id, characters_id, authorid]);

const makeTag = (newTags: NewTags) => Query(`INSERT INTO tags SET ?`, [newTags]);
    // Get characters by author for specific article:
// const getTags = (id: string, authorid: string) => 
//     Query(`SELECT characters.name, characters.info, characters.id FROM articles 
//     INNER JOIN tags ON articles.id = tags.article_id 
//     INNER JOIN characters ON characters.id = tags.character_id WHERE articles.id = ? AND authorid = ?`, [id, authorid]);


export default {
    getAll,
    getOne,
    create,
    update,
    destroy,
    getAllTags, 
    getTagsForOneArticle,
    createTag,
    makeTag
}