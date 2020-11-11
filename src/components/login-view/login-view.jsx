import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginView = ({ handleLoggedIn, onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    handleLoggedIn(username);
  };

  return (
    <div className='container'>
      <div className='col-sm-8 col-md-6 col-lg-4 mx-auto bg-light rounded mt-3 p-4'>
        <div className='mb-4'>
          <p className='text-center h3'>Welcome to</p>
          <p className='text-center h3 font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </p>
        </div>
        <form>
          <div className='form-group'>
            <FontAwesomeIcon icon={faUser} className='mr-1' />
            <label htmlFor='login-username' className='mb-1'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='login-username'
              className='form-control'
              placeholder='Username'
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group mb-5'>
            <FontAwesomeIcon icon={faLock} className='mr-1' />
            <label htmlFor='login-password' className='mb-1'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='login-password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button
            className='btn btn-lg w-100 mb-3 btn-primary'
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
        <button
          className='btn btn-lg w-100 btn-outline-danger'
          onClick={onRegister}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

// PropTypes
LoginView.propTypes = {
  handleLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginView;
