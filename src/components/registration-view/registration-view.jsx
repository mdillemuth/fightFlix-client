import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import './registration-view.scss';

import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistrationView = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthday: '',
  });

  const { username, email, password, birthday } = formData;

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post('https://my-fight-flix.herokuapp.com/api/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((res) => {
        const data = res.data;
        window.open('/', '_self');
      })
      .catch((e) => console.log('registration error'));
  };

  // Handler for form input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container className='my-3'>
      <Col
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
        className='bg-white rounded p-3'
      >
        <h1 className='text-center text-dark h3 mb-4'>
          Welcome to{' '}
          <span className='font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </span>
        </h1>

        <h2 className='text-left h6 text-dark font-weight-bold mb-3'>
          Join{' '}
          <span className='font-italic'>
            my<span className='text-primary'>Fight</span>Flix
          </span>{' '}
          for free
        </h2>
        <Form className='mb-2' onSubmit={handleRegister}>
          <Form.Group className='mb-2' controlId='registerUsername'>
            <Form.Control
              autoFocus
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
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
          </Form.Group>
          <Form.Group className='mb-2' controlId='registerPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minLength='7'
            />
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
          </Form.Group>

          <Button variant='primary' type='submit' className='w-100 btn-lg mb-3'>
            Sign Up
          </Button>
        </Form>
        <small className='text-muted text-center d-block'>
          Already a member?
          <Link to='/'>
            <span className='return text-primary ml-2'>Login here</span>
          </Link>
        </small>
      </Col>
    </Container>
  );
};

export default RegistrationView;
