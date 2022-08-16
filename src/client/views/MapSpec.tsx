import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Maps } from '../Types';


const MapSpec = () => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [url, setUrl] = useState<string>('');


    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        apiService('/api/maps/' + id)
        .then(data => {
            setTitle(data.title);
            setDescription(data.description);
            setUrl(data.url);
        })
        .catch(e => console.log(e))
    }, []);

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-12 col-md-10 mt-5 p-3 shadow-lg">
                    <img src={url} className="card-img-top shadow-sm" alt="map" />
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
                <div className="row justify-content-center my-5">
                    <Link to={'/maps/edit/' + id} style={{textDecoration: 'none'}} className='btn btn-warning col-2 me-5'>Edit</Link>
                    <button className='btn btn-danger col-2'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default MapSpec;