import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';

const RegistrationView = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthday: '',
  });

  const { username, email, password, birthday } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='container'>
      <div className='col-sm-8 col-md-6 col-lg-4 mx-auto bg-light rounded mt-3 p-4'>
        <div className='mb-4'>
          <p className='text-center h3'>Register for</p>
          <p className='text-center h3 font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </p>
        </div>
        <form>
          <div className='form-group'>
            <FontAwesomeIcon icon={faUser} className='mr-1' />
            <label htmlFor='register-username' className='mb-1'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              name='username'
              id='register-username'
              placeholder='Username'
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <FontAwesomeIcon icon={faEnvelope} className='mr-1' />
            <label htmlFor='register-email' className='mb-1'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              id='register-email'
              placeholder='Email'
              value={email}
              onChange={onChange}
              required
            />
            <small class='form-text text-muted font-italic'>
              We will <span className='text-primary'>never</span> share your
              email or send you spam
            </small>
          </div>
          <div className='form-group'>
            <FontAwesomeIcon icon={faLock} className='mr-1' />
            <label htmlFor='register-password' className='mb-1'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              id='register-password'
              placeholder='Password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group mb-5'>
            <FontAwesomeIcon icon={faBirthdayCake} className='mr-1' />
            <label htmlFor='register-birthday' className='mb-1'>
              Birthday
            </label>
            <input
              type='date'
              className='form-control'
              name='birthday'
              id='register-birthday'
              value={birthday}
              onChange={onChange}
              required
            />
          </div>
          <button className='btn btn-lg w-100 mb-3 btn-primary'>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationView;
