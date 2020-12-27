import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../store/user';

// Components
import Loading from '../common/Loading';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const LoginView = ({ loginUser }) => {
  // Component state for form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;

  // Handler for adding form input values to component state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form submission handler with validation
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Login request to API with valid form
    if (form.checkValidity()) loginUser(username, password);

    setValidated(true);
  };

  return (
    <React.Fragment>
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
          <Loading />
          <h2 className='text-left h6 text-dark font-weight-bold mb-2'>
            Login to Your Account
          </h2>
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => handleSubmit(e)}
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
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please enter your password
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
    </React.Fragment>
  );
};

LoginView.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLoginRequested: () => dispatch(userLoginRequested()),
  loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginView);
