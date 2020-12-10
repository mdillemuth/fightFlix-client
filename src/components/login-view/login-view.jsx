import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import Styles
import { Container, Col, Form, Button } from 'react-bootstrap';
import CustomAlert from '../common/CustomAlert';
import './login-view.scss';

const LoginView = ({ handleLoggedIn }) => {
  // State for form input
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;

  // State for client-side form validation
  const [validated, setValidated] = useState(false);

  // State for server-side form validation
  const [serverInvalidated, setServerInvalidated] = useState(false);

  // Handler for updating state on input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler for form submission (validation & login)
  const handleLogin = (e) => {
    // Handling Validation & UI Feedback
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      console.log('Invalid input, form not submitted');
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    // Submission & Logging in the User
    e.preventDefault();

    // Only calls API if form passes client-side validation
    if (form.checkValidity()) {
      axios
        .post('https://my-fight-flix.herokuapp.com/api/login', {
          Username: username,
          Password: password,
        })
        .then((res) => {
          const data = res.data;
          console.log('Account Logged In');
          handleLoggedIn(data);
        })
        .catch((e) => {
          console.log('Invalid Username or Password');
          setServerInvalidated(true);
        });
    }
  };

  return (
    <div>
      <Container className='my-3'>
        <Col
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className='bg-white rounded p-3'
        >
          <h1 className='text-dark text-center h3 mb-4'>
            Welcome to{' '}
            <span className='font-italic'>
              my<span className='text-primary'>Fight</span>Flix
            </span>
          </h1>
          <CustomAlert
            showAlert={serverInvalidated}
            alertHeading='Invalid Credentials'
            alertBody='Please try logging in again'
          />
          <h2 className='text-left h6 text-dark font-weight-bold mb-2'>
            Login to Your Account
          </h2>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleLogin}
            className='mb-2'
          >
            <Form.Group className='mb-2' controlId='loginUsername'>
              <Form.Control
                autoFocus
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onChange}
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
                onChange={onChange}
                required
                minLength='7'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Password must be at least 7 characters
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              className='w-100 btn-lg mb-3'
            >
              Login
            </Button>
          </Form>
          <small className='text-muted text-center d-block'>
            Not a member yet?
            <Link to='/register'>
              <span className='register text-primary ml-2'>
                Sign up for free
              </span>
            </Link>
          </small>
        </Col>
      </Container>
    </div>
  );
};

// PropTypes
LoginView.propTypes = {
  handleLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
