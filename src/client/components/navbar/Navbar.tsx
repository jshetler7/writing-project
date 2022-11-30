import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineWbSunny } from 'react-icons/md';
import { RiMoonLine } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { apiService } from '../../services/apiService';

const Navbar = () => {

    const [isDark, setIsDark] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [active, setActive] = useState(true);
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
      if (isDark) {
        document.body.className = ('dark bg-gray-900');
      } else {
        document.body.className = ('bg-slate-100');
      }
    }, [isDark]);

    const handleTheme = () => {
        setIsDark(!isDark);
    }

    useEffect(() => {
      apiService('/auth/verify')
      .then(() => setIsLoggedIn(true))
      .catch(() => {
          setIsLoggedIn(false);
          if(loc.pathname !== '/' && loc.pathname !== '/register' && loc.pathname !== '/login') {
              nav('/login');
          }
      })
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
    
    const styleDark = { color: "white", fontSize: "1.5em" }
    const styleLight = { color: "black", fontSize: "1.5em" }

    return(
        <div className={`${isDark && 'dark'} grid-cols-4 flex pb-5 w-auto md:w-full justify-between ml-2 mr-2 md:m-0 md:justify-center md:gap-x-10 pt-5`} id="navbar">
            {/* <Link to={'/'} className="flex-row place-self-center justify-end dark:inline-block">
              <AiOutlineHome size={20} style={} id= "home" />
            </Link> */}
            <Link to={'/home'} className="flex text-2xl ml-2 md:m-0 text-black dark:text-white hover:font-semibold hover:underline hover:underline-offset-8 hover:decoration-blue-300">
                    Home
            </Link>
            <Link to={'/about'} className="flex text-2xl ml-2 md:m-0 text-black dark:text-white hover:font-semibold hover:underline hover:underline-offset-8 hover:decoration-blue-300">
                    About
            </Link>
            <Link to={'/news'} className="flex text-2xl text-black dark:text-white hover:font-semibold hover:underline hover:underline-offset-8 hover:decoration-blue-300">
                    News
            </Link>
            <Link to={'/explore'} className="flex text-2xl mr-2 md:m-0 text-black dark:text-white hover:font-semibold hover:underline hover:underline-offset-8 hover:decoration-blue-300">
                    Explore
            </Link>
            <button className="flex-row place-self-center justify-end dark:hidden" id="toggleDark" onClick={handleTheme}>
                <RiMoonLine size={20} style={styleLight} />
            </button>
            <button className="flex-row place-self-center justify-end hidden dark:inline-block" onClick={handleTheme}>
                <MdOutlineWbSunny size={20} style={styleDark} />
            </button>
        </div>
    )
}

export default Navbar;