export interface Users {
    id: string,
    password: string;
    email: string;
    name: string;
    username: string;
    role: string;
};

export interface NewUser {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
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
    characterid: string[];
    _created: Date|string;
    _updated: Date|string;
}

export interface NewArticle{
    id: string;
    authorid: string;
    title: string;
    content: string;
    characterid?: string[];
    _created: Date|string;
    _updated: Date|string;
}

export interface UpdateArticle {
    title: string;
    content: string;
    characterid: string[];
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
    info: string;
    _created: Date | string;
    _updated: Date | string;
}

export interface UpdateCharacter {
    name: string;
    info: string;
}

export interface Payload {
    id: string;
    role: string;
}