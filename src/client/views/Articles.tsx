import * as React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Articles } from '../Types';

const CreateArticle = () => {

    const [articles, setArticles] = useState<Articles[]>([]);
    const [load, setLoad] = useState<boolean>(false);

    const nav = useNavigate();
    const eKey: number = articles.length - 1;

    useEffect(() => {
        apiService('/api/articles')
        .then(data => setArticles(data))
        .catch(e => console.error(e));
    }, []);

    const handleNewArticle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/api/articles', 'POST', { title: 'New Article', content: 'New Article Content'})
        .then((response) => {
            nav('/articles/edit/' + response.id);
        })
    }


    return(
        <div className="container">
            <div className="row justify-content-center">
                <button className='btn btn-primary mt-5 col-6 col-md-3' onClick={handleNewArticle}>Create New Article?</button>
            </div>
            <div className="row mt-5">
                {articles.map(a => (
                    <Accordion key={a.id}>
                        <Accordion.Item eventKey={eKey.toString()}>
                            <Accordion.Header>{a.title}</Accordion.Header>
                            <Accordion.Body>
                                {a.content}
                                <div className="row justify-content-center mt-5">
                                    <Link className='btn btn-outline-success col-4' to={'/articles/' + a.id} style={{textDecoration: 'none'}}>View Details</Link>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default CreateArticle;