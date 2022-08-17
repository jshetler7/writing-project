import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Characters, CharacterTagSpec } from '../Types';

const CharacterSpec = () => {

    const [character, setCharacter] = useState<Characters>();
    const [tags, setTags] = useState<CharacterTagSpec[]>([]);
    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        apiService('/api/characters/' + id)
        .then(data => setCharacter(data))
        .catch(e => console.error(e));
    }, []);

    useEffect(() => {
        apiService('/api/characters/tags/' + id)
        .then(data => setTags(data))
        .catch(e => console.error(e));
    }, []);

    const handleDelete = () => {
        if (!confirm("Are you SURE you want to delete this character?")) return;
        apiService('/api/characters/'+ character?.id, 'DELETE')
        .then(() => nav('/characters'))
        .catch(e => console.error(e));
    };

    return(
        <div className='container vh-100'>
            <div className="row justify-content-center">
                <div className="card col-12 col-md-10 mt-5">
                    <div className="card-title">
                        <h1>{character?.name}</h1>
                        <div className="card-subtitle">
                            <h4>Class: {character?.descriptor}</h4>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className='card-text fs-5'>{character?.info}</p>
                        <div className="card-footer">
                            <p>Appears In: </p>
                            {tags.map(tag => (
                                <Link to={'/articles/' + tag.article_id} style={{textDecoration: 'none'}} className='btn btn-outline-primary me-2 col-6 col-md-3' key={tag.article_id}>{tag.title}</Link>
                            ))}
                        </div>
                        <div className="row mt-5">
                            <Link to={'/characters/edit/'+ character?.id} style={{textDecoration: 'none'}} className='btn btn-outline-warning col-3 col-md-2 me-2'>Edit</Link>
                            <button className='btn btn-outline-danger col-4 col-md-2' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterSpec;