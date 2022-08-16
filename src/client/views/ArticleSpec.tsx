import * as React from 'react';
import * as moment from 'moment'
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Articles, TagsWithName } from '../Types';

const ArticleSpec = () => {

    const [article, setArticle] = useState<Articles>();
    const [characterTags, setCharacterTags] = useState<TagsWithName[]>([]);

    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        apiService('/api/articles/' + id)
        .then(data => setArticle(data))
        .catch(e => console.error(e));
    }, []);

    useEffect(() => {
        apiService('/api/articles/tags/' + id)
        .then(data => setCharacterTags(data))
    }, []);

    const handleDelete = () => {
        apiService('/api/articles/' + article?.id, 'DELETE')
        .then(() => nav('/articles'))
        .catch(e => console.error(e));
    };

    return(
        <div className="container vh-100">
            <div className="row justify-content-center mt-5">
                <div className="card col-10">
                    <div className="card-body">
                        <h1 className="card-title">{article?.title}</h1>
                        <h5 className='card-subtitle mb-5'>{moment(article?._created).format('MMM DD YYYY')}</h5>
                        <p className='card-text'>{article?.content}</p>
                        <div className="row mt-3">
                        {characterTags.map(char => (
                            <Link  
                            to={'/characters/'+ char.character_id} 
                            style={{textDecoration: 'none'}} 
                            key={`${char.character_id}`} 
                            className='btn btn-secondary btn-sm rounded-pill text-dark fs-8 col-2 mb-1'>
                                {'\n\n' + char.name}
                            </Link>
                        ))}
                        </div>
                        <div className="card-footer mt-2">
                            <Link className='btn btn-warning me-3' to={'/articles/edit/' + article?.id} style={{textDecoration: 'none'}}>Edit</Link>
                            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleSpec;