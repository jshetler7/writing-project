import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import  Gallery  from '../components/Gallery';
import moment from 'moment';
import { Articles, Characters } from '../Types';

const Overview = () => {

    const [articles, setArticles] = useState<Articles[]>([]);
    const [characters, setCharacters] = useState<Characters[]>([]);

    useEffect(() => {
        apiService('/api/articles')
        .then(data => setArticles(data))
        .then(() => {
            apiService('/api/characters')
            .then(data => setCharacters(data))
        })
        .catch(e => console.log(e));
    }, []);

    return(
        <div className='container'>
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
                {articles.map(article => (
                <Link to={'/articles/'+ article.id} style={{textDecoration: 'none'}} key={article.id} className='text-dark'>
                <div className="col">
                    <div className="card h-100 shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.content.substring(0, 100)}...</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">{moment(article._created).format('MMM DD YYYY')}</small>
                        </div>
                    </div>
                </div>
                </Link>
                ))}
            </div>

            <div className="row justify-content-center my-5">
                <div className="col-12 col-md-6">
                    <Gallery />
                </div>
            </div>
        </div>
    )
}

export default Overview;