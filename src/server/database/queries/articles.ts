import { Query } from '..';
import { NewArticle, UpdateArticle, Articles } from '../../types';

const getAll = (authorid: string) => 
    Query<Articles>('SELECT articles.*, users.username FROM articles JOIN users ON articles.authorid = users.id WHERE authorid = ?', [authorid]);

const getOne = (id: string, authorid: string) => 
    Query<Articles>('SELECT * FROM articles WHERE id = ? AND authorid = ?', [id, authorid]);

const create = (newArticle: NewArticle) => 
    Query('INSERT INTO articles SET ?', [newArticle]);

const update = (pizza: UpdateArticle, id: string, authorid: string) => 
    Query('UPDATE articles SET ? WHERE id = ? AND authorid = ?', [pizza, id, authorid]);

const destroy = (id:string, authorid: string) => 
    Query('DELETE FROM articles WHERE id = ? AND authorid = ?', [id, authorid]);


export default {
    getAll,
    getOne,
    create,
    update,
    destroy
}