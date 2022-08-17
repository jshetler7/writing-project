import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiWorld } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { apiService } from '../../services/apiService';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [active, setActive] = useState(true);
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if(loc.pathname !== '/' && loc.pathname !== '/register' && loc.pathname !== '/login') {
            apiService('/auth/verify')
            .then(() => setIsLoggedIn(true))
            .catch(() => {
                setIsLoggedIn(false);
                nav('/login');
            })
        }
    }, [loc.pathname]);

    const handleExpand = () => {
        setActive(!active);
    }

    const handleCollapse = () => {
        if(active) {
            return;
        } else {
            setActive(!active);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        nav('/login');
    }

    return(
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand" onClick={handleCollapse}>
                        <BiWorld size={28} />
                    </Link>

                    <button className='btn navbar-toggle collapsed' id='menuButton' type='button' onClick={handleExpand}>
                        <FiMenu size={28}/>
                    </button>
                    <div className={`${active === true && "collapse"} navbar-collapse`} id='navbarDropdown' onBlur={() => setActive(false)}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 text-dark" to={'/overview'} style={{textDecoration: 'none'}} onClick={handleExpand}>Overview</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5 text-dark" to={'/articles'} style={{textDecoration: 'none'}} onClick={handleExpand}>Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5 text-dark" to={'/characters'} style={{textDecoration: 'none'}} onClick={handleExpand}>Characters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5 text-dark" to={'/maps'} style={{textDecoration: 'none'}} onClick={handleExpand}>Maps</Link>
                        </li>
                    </ul>

                    {!isLoggedIn && <> 
                    <div className="nav-item">
                        <Link className='btn btn-success text-light me-2' to={'/login'} style={{textDecoration: 'none'}} onClick={handleExpand}>Login</Link>
                    </div>

                    <div className="nav-item">
                        <Link className='btn btn-warning text-light' to={'/register'} style={{textDecoration: 'none'}} onClick={handleExpand}>Register</Link>
                    </div>
                    </>}

                    {isLoggedIn && <>
                    <div className="nav-item">
                        <button className='btn btn-outline-primary' onClick={handleLogout}>Logout</button>
                    </div>
                    </>}

                    <div className="nav-item">
                        <Link className='nav-link' to={'/profile'} style={{textDecoration: 'none', color: 'black'}} onClick={handleExpand}>
                            <FaUserCircle size={28} />
                        </Link>
                    </div>
                    </div>
            </div>
        </nav>
    )
}

export default Navbar;