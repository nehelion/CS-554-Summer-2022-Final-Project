import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';


const Navigation = () => {
  const nameEl = React.useRef(null);
  const {currentUser} = useContext(AuthContext);

  //does someone know how to do this better as it forces a page refresh
  const handleSubmit = e => {
    e.preventDefault();
    window.location.href = '/candies/' + nameEl.current.value
  }

  
  const NavigationAuth = () => {
    return (
      <nav className='navigation'>
        <NavLink className='weblink' to='/'>
					<img src={__dirname + '..\..\public\logo192.png'} alt="" />
        </NavLink>
        <div className='searchBar'>
        </div>
        <NavLink className='weblink' to='/home'>
          Home
        </NavLink>
        <NavLink className='weblink' to='/admin'>
          Admin
        </NavLink>
        <NavLink className='weblink' to='/signout'>
          Sign Out
        </NavLink>
      </nav>
    );
  };
  
  const NavigationNonAuth = () => {
    return (
      <nav className='navigation'>
        <NavLink className='weblink' to='/'>
        </NavLink>
        <div className='searchBar'>
        </div>
        <NavLink className='weblink' to='/signup'> 
          Sign-up
        </NavLink>
        <NavLink className='weblink' to='/signin'> 
          Sign-In
        </NavLink>
      </nav>
    );
  };

  return currentUser ? <NavigationAuth /> : <NavigationNonAuth />;
};
  
  export default Navigation;