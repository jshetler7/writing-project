import * as React from 'react';
import { Link } from 'react-router-dom';
import { BiWorld } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand">
                    <BiWorld size={28} />
                </Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link fs-5 text-dark" to={'/overview'} style={{textDecoration: 'none'}}>Overview</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5 text-dark" to={'/writing'} style={{textDecoration: 'none'}}>Writing</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5 text-dark" to={'/characters'} style={{textDecoration: 'none'}}>Characters</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5 text-dark" to={'/maps'} style={{textDecoration: 'none'}}>Maps</Link>
                    </li>
                </ul>

                <div className="nav-item">
                    <Link className='nav-link' to={'/profile'} style={{textDecoration: 'none', color: 'black'}}>
                        <FaUserCircle size={28} />
                    </Link>
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar;