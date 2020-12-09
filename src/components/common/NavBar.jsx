import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

const NavBar = ({ handleLogout }) => {
  return (
    <React.Fragment>
      <Navbar
        bg='white'
        className='d-flex justify-content-between align-items-center px-3'
      >
        <Navbar.Brand className='text-dark font-italic h2 font-weight-bold p-0 m-0'>
          my<span className='text-primary'>Fight</span>Flix
        </Navbar.Brand>
        <div>
          <Link to='/profile'>
            <Button className='mr-1'>{localStorage.getItem('user')}</Button>
          </Link>
          <Link to='/'>
            <Button
              onClick={handleLogout}
              className='ml-1'
              variant='outline-primary'
            >
              Logout
            </Button>
          </Link>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
