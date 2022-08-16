import * as React from 'react';
import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Articles, Characters, Maps, User } from '../Types';
import { GiPerson } from 'react-icons/gi';
import { BsBook, BsMapFill } from 'react-icons/bs';


const Profile = () => {

    const [user, setUser] = useState<User>();
    const [articles, setArticles] = useState<Articles[]>([]);
    const [characters, setCharacters] = useState<Characters[]>([]);
    const [maps, setMaps] = useState<Maps[]>([]);


    useEffect(() => {
        apiService('/api/users/:id')
        .then(data => setUser(data))
        .then(() => {
            apiService('/api/articles')
            .then(data => setArticles(data))
        })
        .then(() => {
            apiService('/api/characters')
            .then(data => setCharacters(data))
        })
        .then(() => {
            apiService('/api/maps')
            .then(data => setMaps(data))
        })
        .catch(e => console.log(e));
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="row justify-content-center mt-5">
                        <div className="col-12">
                            <div className="card border-light rounded-3">
                                <div className="card-body text-center">
                                    <h1 className='card-header text-center mb-3'>Profile:</h1>
                                    <h5 className="card-title mb-2">Username: {user?.username}</h5>
                                    <h5 className="card-subtitle mb-2">Name: {user?.name}</h5>
                                    <h5 className="card-subtitle">Email: {user?.email}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-8">
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                        <GiPerson size={56} id='characterCount' className='align-self-bottom'/>
                                        </div>
                                        <div className="col-6">
                                        <h1 className='text-center'>{characters.length}</h1>
                                        <h5 className="text-muted text-center">Characters Created</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-md-6">
                            <div className="card h-100 ">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                        <BsBook size={56} id='characterCount' className='align-self-bottom'/>
                                        </div>
                                        <div className="col-6">
                                        <h1 className='text-center'>{articles.length}</h1>
                                        <h5 className="text-muted text-center">Articles Created</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center my-5">
                        <div className="col-12 col-md-6">
                            <div className="card h-100 ">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                        <BsMapFill size={56} id='characterCount' className='align-self-bottom'/>
                                        </div>
                                        <div className="col-6">
                                        <h1 className='text-center'>{maps.length}</h1>
                                        <h5 className="text-muted text-center">Maps Created</h5>
                                        </div>
                                    </div>
                                    <div className="row">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;