declare global {
    namespace Express {
        interface Request {
            authorid: string;
            email: string;
            userIsVerified: boolean;
        }
    }
}


export interface Users {
    id: string,
    password: string;
    email: string;
    name: string;
    username: string;
    role: string;
    verified: boolean;
};

export interface GetUser {
    id: string;
    email: string;
    name: string;
    username: string;
}

export interface NewUser {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role?: string;
}

export interface UpdateUser {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface Articles {
    id: string;
    authorid: string;
    title: string;
    content: string;
    _created: Date|string;
    _updated: Date|string;
}

export interface NewArticle{
    id: string;
    authorid: string;
    title: string;
    content: string;
    _created: Date|string;
    _updated: Date|string;
}

export interface UpdateArticle {
    title: string;
    content: string;
}

export interface Characters {
    id: string;
    authorid: string;
    name: string;
    info: string;
    _created: Date | string;
    _updated: Date | string;
}

export interface NewCharacter {
    id: string;
    authorid: string;
    name: string;
    descriptor: string;
    info: string;
}

export interface UpdateCharacter {
    name: string;
    descriptor: string;
    info: string;
}

export interface Maps {
    id: string;
    authorid: string;
    title: string;
    description?: string;
    url: string;
    file_size: number;
    _created: Date | string;
}

export interface NewMap {
    id: string;
    authorid: string;
    title: string;
    url: string;
}

export interface UpdateMap {
    title: string;
    description?: string;
}

export interface Tags {
    article_id: string;
    character_id: string;
    authorid: string;
}

export interface CharacterTagSpec extends Tags{
    title: string;
}

export interface NewTags {
    article_id: string;
    character_id: string;
    authorid: string;
}

export interface Payload {
    id: string;
    role: string;
    email: string;
}