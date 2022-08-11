import * as React from 'react';
import { apiService } from '../services/apiService';

const Profile = () => {

    

    apiService('/api/users/')

    return(
        <div className="container vh-100">
            <h1>Profile</h1>
        </div>
    )
}

export default Profile;