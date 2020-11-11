import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

const RegistrationView = () => {
  // State for form input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthday: '',
  });

  const { username, email, password, birthday } = formData;

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
    }, 3000);

    // Create account logic
    // ***** TODO *****
  };

  // Handler for form input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
          <p className='h3'>Sign Up for</p>
          <p className='font-italic h3'>
            my<span className='text-primary'>Fight</span>Flix
          </p>
        </div>
        <Form
          className='mb-2'
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId='registerUsername'>
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
              Please choose a username
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='registerEmail'>
            <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
            <Form.Label>Email</Form.Label>
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
            <Form.Text className='text-muted'>
              We'll never share your email or send you spam.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='registerPassword'>
            <FontAwesomeIcon icon={faLock} className='mr-2' />
            <Form.Label>Password</Form.Label>
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
          <Form.Group controlId='registerBirthday' className='mb-5'>
            <FontAwesomeIcon icon={faBirthdayCake} className='mr-2' />
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              name='birthday'
              value={birthday}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please enter your birthday
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100 btn-lg'>
            Create Account
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default RegistrationView;
