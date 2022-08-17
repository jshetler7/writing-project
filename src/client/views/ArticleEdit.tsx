import * as React from 'react';
import Creatable from 'react-select/creatable';
import { useState, useEffect } from 'react';
import { v4 as uuid} from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Articles, Characters, ICharacterSelect, Tags } from '../Types';
import { OnChangeValue } from 'react-select/dist/declarations/src';

const ArticleEdit = () => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [charValue, setCharValue] = useState<ICharacterSelect[]>([]);
    const [characters, setCharacters] = useState<ICharacterSelect[]>([]);

    const { id } = useParams();
    const nav = useNavigate();

    const newTags = charValue.map(char => ([char.label, char.value, char.__isNew__]));

    useEffect(() => {
        apiService('/api/articles/' + id)
        .then(data => {
            setTitle(data.title);
            setContent(data.content);
        })
    }, []);

    useEffect(() => {
        apiService('/api/characters')
        .then(data => {
            const rename = data.map((character: Characters) => ({
                label: character.name,
                value: character.id,
            }))
            setCharacters(rename);
        })
        .catch(e => console.error(e))
    }, []);


    const handleChange = (value:OnChangeValue<ICharacterSelect, true>) => {
        setCharValue(value as ICharacterSelect[]);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!content) return alert('No one likes a blank page, fill out something in the content area!');
        if (!title) return alert('How will you find this article without a title? Go add one!');

        apiService('/api/articles/tags/', 'POST', { id, newTags })
        apiService('/api/articles/' + id, 'PUT', {title, content})
        .then(() => nav('/articles/'+ id))
        .catch(e => console.error(e));
    };


    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-12">
                    <form className='form-control'>
                        <div className='row mt-5'>
                            <label>Title:</label>
                            <input 
                            className="form-control shadow-lg"  
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <label>Characters</label>
                            <Creatable
                                isClearable
                                isMulti
                                onChange={(value) => handleChange(value)}
                                options={characters}
                                value={charValue}
                                className="px-1 shadow-lg"
                                />
                        </div>
                        <div className="row">
                            <label>Content: </label>
                            <textarea 
                            className="form-control shadow-lg" 
                            id="writing-input" 
                            rows={20}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            />
                            
                        </div>
                        <div className='row justify-content-end my-2 me-3'>
                            <button className='btn btn-dark col-3' onClick={handleSubmit}>Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ArticleEdit;