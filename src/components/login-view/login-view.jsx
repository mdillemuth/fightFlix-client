import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

const LoginView = ({ handleLoggedIn, onRegister }) => {
  // State for form input
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  // State for form validation
  const [validated, setValidated] = useState(false);

  // Handler for form input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler for form submission (validation & login)
  const handleSubmit = (e) => {
    // Validation
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    // Timer to remove validation styling
    setTimeout(() => {
      setValidated(false);
    }, 3000);

    // Login
    handleLoggedIn(username);
  };

  return (
    <Container className='my-3'>
      <Col
        lg={{ span: 4, offset: 4 }}
        md={{ span: 6, offset: 3 }}
        sm={{ span: 8, offset: 2 }}
        xs={{ span: 10, offset: 1 }}
        className='bg-light rounded p-4'
      >
        <div className='text-center mb-4'>
          <p className='h3'>Welcome to</p>
          <p className='font-italic h3'>
            my<span className='text-primary'>Fight</span>Flix
          </p>
        </div>
        <Form
          noValidate
          validated={validated}
          className='mb-2'
          onSubmit={handleSubmit}
        >
          <Form.Group controlId='loginUsername'>
            <FontAwesomeIcon icon={faUser} className='mr-2' />
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please enter your username
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='loginPassword' className='mb-5'>
            <FontAwesomeIcon icon={faLock} className='mr-2' />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please enter your password
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100 btn-lg'>
            Log In
          </Button>
        </Form>
        <Button
          variant='outline-primary'
          type='button'
          onClick={onRegister}
          className='w-100 btn-lg'
        >
          Create an Account
        </Button>
      </Col>
    </Container>
  );
};

// PropTypes
LoginView.propTypes = {
  handleLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginView;
