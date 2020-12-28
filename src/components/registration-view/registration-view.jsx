import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { registerAccount } from '../../store/user';
import { setAlert } from '../../store/alerts';
// Components
import Loading from '../common/Loading';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const RegistrationView = ({ registerAccount, setAlert }) => {
  // Component state for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birthday: '',
  });
  const { username, email, password, passwordConfirm, birthday } = formData;

  // Handler for adding form input values to component state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form submission handler with validation
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Check passwords match
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
      return;
    }

    // Registration request to API with valid form
    if (form.checkValidity())
      registerAccount(username, password, email, birthday);

    setValidated(true);
  };
  // };

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
        <Loading />
        <Form
          noValidate
          validated={validated}
          className='mb-2'
          onSubmit={(e) => handleSubmit(e)}
        >
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
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please choose a username
            </Form.Control.Feedback>
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
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please enter a valid email address
            </Form.Control.Feedback>
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
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Password must be at least 7 characters
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2' controlId='registerConfirmPassword'>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={onChange}
              required
              minLength='7'
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Password must be at least 7 characters
            </Form.Control.Feedback>
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
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Birthday is required
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100 btn-lg mb-3'>
            Sign Up
          </Button>
        </Form>
        <small className='text-muted text-center d-block'>
          Already a member?
          <Link to='/'>
            <span style={{ cursor: 'pointer' }} className='text-primary ml-2'>
              Login here
            </span>
          </Link>
        </small>
      </Col>
    </Container>
  );
};

RegistrationView.propTypes = {
  registerAccount: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  registerAccount: (username, password, email, birthday) =>
    dispatch(registerAccount(username, password, email, birthday)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

export default connect(null, mapDispatchToProps)(RegistrationView);
