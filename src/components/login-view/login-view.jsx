import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Import Styles
import { Container, Col, Form, Button } from 'react-bootstrap';
import './login-view.scss';

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
    // const form = e.currentTarget;
    // if (!form.checkValidity()) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    // setValidated(true);

    // // Timer to remove validation styling
    // setTimeout(() => {
    //   setValidated(false);
    // }, 4000);
    e.preventDefault();

    // Send request to server for authentication
    axios
      .post('https://my-fight-flix.herokuapp.com/api/login', {
        Username: username,
        Password: password,
      })
      .then((res) => {
        const data = res.data;
        handleLoggedIn(data);
      })
      .catch((e) => console.log('invalid credentials'));
  };

  return (
    <Container className='my-3'>
      <Col
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
        className='bg-white rounded p-3'
      >
        <h1 className='text-dark text-center h3 mb-5'>
          Welcome to{' '}
          <span className='font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </span>
        </h1>

        <h2 className='text-left h6 text-dark font-weight-bold mb-2'>
          Login to Your Account
        </h2>
        <Form
          noValidate
          validated={validated}
          className='mb-2'
          onSubmit={handleSubmit}
        >
          <Form.Group className='mb-2' controlId='loginUsername'>
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
          <Form.Group controlId='loginPassword' className='mb-2'>
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
          <Button variant='primary' type='submit' className='w-100 btn-lg mb-3'>
            Login
          </Button>
        </Form>
        <small className='text-muted text-center d-block'>
          Not a member yet?
          <span onClick={onRegister} className='register text-primary ml-2'>
            Sign up for free
          </span>
        </small>
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
