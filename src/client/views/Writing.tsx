import * as React from 'react';
import Creatable from 'react-select/creatable';
import { OnChangeValue } from 'react-select/dist/declarations/src';
import { ICharacterSelect } from '../Types';
import { useState } from 'react';

const characters: ICharacterSelect[] = [
    {
        label: 'Character A',
        value: 1
    },
    {
        label: 'Character B',
        value: 2
    },
    {
        label: 'Character C',
        value: 3
    },
    {
        label: 'Character D',
        value: 4
    },
];

const Writing = () => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [charValue, setCharValue] = useState<ICharacterSelect[]>([]);

    const handleChange = (value:OnChangeValue<ICharacterSelect, true>) => {
        setCharValue(value as ICharacterSelect[]);

        // __isNew__ : filter and map for a new id, insert into DB, assign req.user
    }

    return(
        <div className="container vh-100">
            <div className="row mt-5">
                <div className="col-12">
                    <form className="form-control">
                        <div className='row mt-5'>
                            <label>Title:</label>
                            <input 
                            className="form-control shadow-lg" 
                            type="text" 
                            name="title" 
                            placeholder='Concerning Hobbits'
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
                            name="content" 
                            id="writing-input" 
                            rows={20} 
                            placeholder="In a hole in the ground, there lived a hobbit..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            />
                            
                        </div>
                        <div className='row justify-content-end my-2 me-3'>
                            <button className='btn btn-dark col-1'>Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Writing;