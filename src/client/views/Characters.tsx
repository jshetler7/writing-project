import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Characters } from '../Types';

const Characters = () => {

    const [characters, setCharacters ] = useState<Characters[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        apiService('/api/characters')
        .then(data => setCharacters(data))
        .catch(e => console.error(e));
    }, []);

    const handleNewCharacter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/api/characters', 'POST', { name: 'New Character', descriptor: 'Affiliations, role, etc.', info: 'New Character Info'})
        .then((response) => {
            nav('/characters/edit/' + response.id);
        })
    }
    

    return(
        <div className="container">
            <h1 className='text-center mt-5'>Characters</h1>
            <div className="row justify-content-center">
                <button className='btn btn-primary mt-3 col-6 col-md-3' onClick={handleNewCharacter}>Create New Character?</button>
            </div>
            <div className="row justify-content-center mt-4 pb-5">
                {characters.map((c) => (
                <div className="card shadow-lg col-10 col-md-3 mx-2 mt-4"  key={c.id}>
                    <Link to={`/characters/${c.id}`} style={{textDecoration: 'none'}}>
                        <div className="card-title text-center text-dark">
                            <h3>{c.name}</h3>
                            <div className="card-subtitle text-dark">
                                {c.descriptor}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-text text-center text-dark">
                                <p>{c.info}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                ))}   
            </div>
        </div>
    )
}

export default Characters;