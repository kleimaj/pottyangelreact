import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUser, faToiletPaper, faPlus } from '@fortawesome/free-solid-svg-icons'
import './Header.css';

const Header = (props) => {
    const size = useWindowSize();
    const [show, setShow] = useState(false);
    const render = (size.width > 980) ? renderDesktop(props) : renderMobile(props) ;
    return render;
}
const renderDesktop = (props) => {
    return (
        <header>
            {props.loggedIn ? 
            <div className="desktop">
                <div className="left">
                  <Link to='/'>
                    <h2>Potty Angel</h2>
                  </Link>
                </div>
                <div className="right">
                  {/* <Link to='/settings'>
                    <h2>Settings</h2>
                  </Link> */}
                  {/* <Link to='/logout'> */}
                  <button className="logout"
                          onClick={() => {
                            props.logout()
                          }}>
                    <h2>Logout</h2>
                  </button>
                  {/* </Link> */}
                </div>
            </div>
            :
            <div className="desktop">
                <div className="left">
                  <Link to='/'>
                    <h2>Potty Angel</h2>
                  </Link>
                </div>
                <div className="right">
                  {/* <Link to='/settings'>
                    <h2>Settings</h2>
                  </Link> */}
                  <Link to='signup'>
                  <h2>Sign-up</h2>
                  </Link>
                </div>
            </div>    
        }
        </header>
    )
}
const renderMobile = (props) => {
    return (
        <header>
            {props.loggedIn ? 
            <div className="icons">
               <div className="left">
                  <Link to='/'>
                    <h2>Potty Angel</h2>
                  </Link>
                </div>
                <div className="right">
                  <button className="logout"
                          onClick={() => {
                            props.logout()
                          }}>
                    <h2>Logout</h2>
                  </button>
                </div>
            </div>    
            :
            <div className="icons">
               <div className="left">
                  <Link to='/'>
                    <h2>Potty Angel</h2>
                  </Link>
                </div>
                <div className="right">
                  {/* <Link to='/settings'>
                    <h2>Settings</h2>
                  </Link> */}
                  <Link to='signup'>
                  <h2>Sign-up</h2>
                  </Link>
                </div>
                </div>
        }
        </header>
    )
}
const useWindowSize = () => {
    const isClient = typeof window === 'object';
  
    const getSize = () => {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
  
    useEffect(() => {
      if (!isClient) {
        return false;
      }
      
      function handleResize() {
        setWindowSize(getSize());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return windowSize;
  }

export default Header;