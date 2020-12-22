import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBar = ({ user, logoutUser }) => {
  const renderButtons = () => {
    return user === null ? (
      <div></div>
    ) : (
      <div>
        <Link to='/profile'>
          <Button className='mr-1'>{user.Username}</Button>
        </Link>
        <Link to='/'>
          <Button
            onClick={logoutUser}
            className='ml-1'
            variant='outline-primary'
          >
            Logout
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Navbar
        bg='white'
        className='d-flex justify-content-between align-items-center px-3'
      >
        <Link to='/'>
          <Navbar.Brand className='text-dark font-italic h2 font-weight-bold p-0 m-0'>
            my<span className='text-primary'>Fight</span>Flix
          </Navbar.Brand>
        </Link>
        <div>{renderButtons()}</div>
      </Navbar>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
