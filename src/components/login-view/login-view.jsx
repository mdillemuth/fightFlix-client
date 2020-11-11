import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginView = (props) => {
  // Initialize username/password with hooks
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    props.handleLoggedIn(username);
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
            <label htmlFor='loginUsername' className='mb-1'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group mb-4'>
            <FontAwesomeIcon icon={faLock} className='mr-1' />
            <label htmlFor='loginPassword' className='mb-1'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='login-password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          onClick={props.onRegister}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default LoginView;
