import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = (props) => {
  const { formInputs, isClientValidated, onFormChange, onLogin } = props;
  const { username, password } = formInputs;

  return (
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
          value={username}
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
          value={password}
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
  );
};

LoginForm.propTypes = {
  formInputs: PropTypes.object.isRequired,
  isClientValidated: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
