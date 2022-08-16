import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Maps } from '../Types';


const Maps = () => {
    const [maps, setMaps] = useState<Maps[]>([]);

    const nav = useNavigate();

    useEffect(() => {
        apiService('/api/maps')
        .then(data => setMaps(data))
        .catch(e => console.log(e));
    }, []);

    const TOKEN = localStorage.getItem('token');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const myFile = e.target.files[0];
        const data = new FormData();
        data.append('photo', myFile);

        try {
            const res = await fetch("/api/upload", {
                method: 'POST',
                headers: { authorization: `Bearer ${TOKEN}` },
                body: data
            });

            const uploadRes = await res.json();

            if(!res.ok) {
                console.error(uploadRes);
                alert(uploadRes.message);
            } else {
                alert('Check the console for data.');
                console.log(uploadRes);
            }

            apiService('/api/maps', 'POST', { title: 'New Map', description: 'New Map Description', url: uploadRes })
            .then(response => nav('/maps/'+ response.id))

        } catch (error) {
            alert('File Upload Failed.');
            console.log(error);
            
        }
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <form className="col-10 col-md-6 bg-light shadow-lg mt-5 py-2">
                    <h5 className='text-center'>Create a new map by uploading an image!</h5>
                    <div className="input-group">
                        <input type="file" className='form-control' onChange={handleFileUpload} />
                    </div>
                </form>
            </div>
            <div className="row justify-content-center mb-5">
                {maps.map(map => (
                    <Link to={'/maps/' + map.id} style={{textDecoration: 'none'}} className='col-12 col-md-6 text-dark my-2' key={map.id} >
                        <div className="card my-3 g-3 p-2 shadow-lg h-100">
                            <img src={`${map.url}`} className="card-img-top h-100" alt="map" />
                            <div className="card-body row d-flex align-items-end">
                                <h5 className="card-title col-12">{map.title}</h5>
                                <p className="card-text col-12">{map.description?.substring(0, 100)}...</p>
                            </div>
                    </div>
                  </Link>
                ))}
            </div>
        </div>
    )
}

export default Maps;