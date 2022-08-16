export interface ICharacterSelect {
    __isNew__?: boolean;
    label: string;
    value:string;
};

export interface Characters {
    id: string;
    authorid: string;
    name: string;
    info: string;
    descriptor: string;
    _created: Date | string;
    _updated: Date | string;
}

export interface CharacterTagSpec extends Tags{
    title: string;
}

export interface Articles {
    id: string;
    authorid: string;
    title: string;
    content: string;
    _created: Date | string;
    _updated: Date | string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
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

export interface Tags {
    article_id: string;
    character_id: string;
    authorid: string;
}

export interface TagsWithName extends Tags{
    name: string;
}