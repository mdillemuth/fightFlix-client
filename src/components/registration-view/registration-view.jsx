import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import './registration-view.scss';

const RegistrationView = ({ onReturnLogin }) => {
  // State for form input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    birthday: '',
  });

  const { username, email, password, password2, birthday } = formData;

  // State for form validation
  const [validated, setValidated] = useState(false);

  // Handler for form submission (validation & registration)
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
    }, 8000);
  };

  // Handler for form input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler to return to LoginView
  const onReturn = () => onReturnLogin();

  return (
    <Container className='my-3'>
      <Col md={{ span: 6, offset: 3 }} className='bg-white rounded p-3'>
        <h1 className='text-center h3 mb-5'>
          Welcome to{' '}
          <span className='font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </span>
        </h1>

        <h2 className='text-left h5 text-dark font-weight-bold mb-3'>
          Join{' '}
          <span className='font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </span>{' '}
          for free
        </h2>
        <Form
          className='mb-2'
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className='mb-2' controlId='registerUsername'>
            <Form.Control
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please choose a username
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2' controlId='registerEmail'>
            <Form.Control
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid email address
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2' controlId='registerPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minlength='7'
            />
            <Form.Control.Feedback type='invalid'>
              Password must be at least 7 characters long
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2' controlId='registerPassword2'>
            <Form.Control
              type='password'
              placeholder='Re-type password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
              minlength='7'
            />
            <Form.Control.Feedback type='invalid'>
              Password must be at least 7 characters long
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='registerBirthday' className='mb-2 '>
            <Form.Label className='mb-1 text-muted font-weight-bold'>
              Please enter your birthday
            </Form.Label>
            <Form.Control
              type='date'
              name='birthday'
              placeholder='Birthday'
              value={birthday}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please enter your birthday
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Button variant='primary' type='submit' className='w-100 btn-lg mb-3'>
            Sign Up
          </Button>
        </Form>
        <p className='text-muted text-center'>
          Already a member?
          <span onClick={onReturn} className='return text-primary ml-2'>
            Login here
          </span>
        </p>
      </Col>
    </Container>
  );
};

// PropTypes
RegistrationView.propTypes = {
  onReturnLogin: PropTypes.func.isRequired,
};

export default RegistrationView;
