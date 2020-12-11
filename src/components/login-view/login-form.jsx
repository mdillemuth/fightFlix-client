import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
  const {
    usernameValue,
    passwordValue,
    isClientValidated,
    onFormChange,
    onLogin,
  } = props;

  return (
    <React.Fragment>
      <Form
        noValidate
        validated={isClientValidated}
        onSubmit={onLogin}
        className='mb-2'
      >
        <Form.Group className='mb-2' controlId='loginUsername'>
          <Form.Control
            autoFocus
            type='text'
            placeholder='Username'
            name='username'
            value={usernameValue}
            onChange={onFormChange}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Please enter your username
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='loginPassword' className='mb-2'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={passwordValue}
            onChange={onFormChange}
            required
            minLength='7'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Password must be at least 7 characters
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit' className='w-100 btn-lg mb-3'>
          Login
        </Button>
      </Form>
      <small className='text-muted text-center d-block'>
        Not a member yet?
        <Link to='/register'>
          <span className='register text-primary ml-2'>Sign up for free</span>
        </Link>
      </small>
    </React.Fragment>
  );
};

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  isClientValidated: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
