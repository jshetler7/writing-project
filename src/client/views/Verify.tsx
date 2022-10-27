import React, { useEffect } from 'react';
import { apiService } from '../services/apiService';
import { useLocation, useNavigate } from 'react-router-dom';

const Verify = () => {
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        apiService('/api/verify/email' + location.search)
        .then(() => {
            nav('/profile');
        })
        .catch(error => console.log(error))
    }, []);

    return(
        <div className="containter">
            <h1>hello</h1>
        </div>
    );
}

export default Verify;

// DB Query to update user as verified,.. set col = 1
// create auth route that verifies email token (15m)
// extract email from token
// if token verification = good, update user with that email
// useRouter hook react-router-dom, url as object with email, token as props
// send to backend
// resend on fail for expired token