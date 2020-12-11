import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

const NavBar = ({ onLogout, user }) => {
  const username = localStorage.getItem('user');

  const renderButtons = (user) => {
    if (user !== null) {
      return (
        <div>
          <Link to='/profile'>
            <Button className='mr-1'>{username}</Button>
          </Link>
          <Link to='/'>
            <Button
              onClick={onLogout}
              className='ml-1'
              variant='outline-primary'
            >
              Logout
            </Button>
          </Link>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <Navbar
        bg='white'
        className='d-flex justify-content-between align-items-center px-3'
      >
        <Navbar.Brand className='text-dark font-italic h2 font-weight-bold p-0 m-0'>
          my<span className='text-primary'>Fight</span>Flix
        </Navbar.Brand>
        <div>{renderButtons(user)}</div>
      </Navbar>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.string,
};

export default NavBar;
