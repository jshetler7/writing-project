import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';

const CharacterEdit = () => {

    const [name, setName] = useState<string>('');
    const [descriptor, setDescriptor] = useState<string>('');
    const [info, setInfo] = useState<string>('');

    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        apiService('/api/characters/'+ id)
        .then(data => {
            setName(data.name);
            setDescriptor(data.descriptor);
            setInfo(data.info);
        })
        .catch(e => console.error(e));
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!name) return alert('Everyone deserves a name, go ahead and give this character one!');
        if (!descriptor) return alert('Add a short description first!');
        if (!info) return alert('Tell us a bit about this character first!');

        apiService('/api/characters/'+ id, 'PUT', { name, descriptor, info})
        .then(() => nav('/characters/' + id))
        .catch(e => console.error(e));
    };

    return(
        <div className="container vh-100">
            <div className="row mt-5">
                <div className="col-12">
                    <form className="form-control">
                        <div className='row mt-5'>
                            <label>Name:</label>
                            <input 
                            className="form-control shadow-lg" 
                            type="text" 
                            name="name" 
                            placeholder='Concerning Hobbits'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='row mt-5'>
                            <label>Descriptor:</label>
                            <input 
                            className="form-control shadow-lg" 
                            type="text" 
                            name="descriptor" 
                            placeholder='Concerning Hobbits'
                            value={descriptor}
                            onChange={e => setDescriptor(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <label>Info: </label>
                            <textarea 
                            className="form-control shadow-lg" 
                            name="info" 
                            id="writing-input" 
                            rows={20} 
                            placeholder="In a hole in the ground, there lived a hobbit..."
                            value={info}
                            onChange={e => setInfo(e.target.value)}
                            />
                            
                        </div>
                        <div className='row justify-content-end my-2 me-3'>
                            <button className='btn btn-dark col-1' onClick={handleSubmit}>Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CharacterEdit;