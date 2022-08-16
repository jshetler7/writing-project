import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../services/apiService';


const MapEdit = () => {

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

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!title) return alert('Every great work of art deserves a title!');

        apiService('/api/maps/' + id, 'PUT', { title, description })
        .then(() => nav('/maps/'+ id))
        .catch(e => console.log(e));
    };

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <form>
                        <div className="card mt-5 p-3 shadow-lg">
                            <img src={url} className="card-img-top shadow-sm" alt="map" />
                            <div className="card-body">
                                <div className="row">
                                    <label>Title: </label>
                                    <input 
                                    type="text" 
                                    className='form-control col-12 mb-3' 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)} 
                                    />
                                    
                                    <label>Description: </label>
                                    <textarea 
                                    rows={20} 
                                    className='form-control col-12' 
                                    value={description} 
                                    onChange={e => setDescription(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center my-5">
                            <button className='btn btn-success text-light col-2' onClick={handleSave}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MapEdit;