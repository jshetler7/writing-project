import { Query } from "..";
import { Users, NewUser, UpdateUser } from '../../types';

const getAll = () => Query<Users>("SELECT * FROM Users");

const getOne = (id: string) => Query<Users>("SELECT * FROM Users WHERE id = ?", [id]);

const getbyEmail = (email: string) => Query<Users[]>("SELECT * FROM Users WHERE email = ?", [email]);

const create = (newUser: NewUser) => Query("INSERT INTO Users SET ?", [newUser]);

const update = (id: string, pizza: UpdateUser) => Query("UPDATE Users SET ? WHERE id = ?", [pizza, id]);

const destroy = (id: string) => Query("DELETE FROM Users WHERE id = ?", [id]);


export default {
    getAll, 
    getOne,
    getbyEmail,
    create,
    update,
    destroy
};