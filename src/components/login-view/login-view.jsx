import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../store/user';

// Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomAlert from '../common/CustomAlert';
import LoadingSpinner from '../common/LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const LoginView = ({ loginUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const [isClientValidated, setIsClientValidated] = useState(false);
  const [isServerInvalidated, setIsServerInvalidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCloseAlert = () => {
    setIsServerInvalidated(false);
  };

  // const handleLogin = (e) => {
  //   setIsLoading(true);

  //   const form = e.currentTarget;
  //   if (!form.checkValidity()) {
  //     console.log('Invalid input, form not submitted');
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setIsLoading(false);
  //   }
  //   setIsClientValidated(true);

  //   e.preventDefault();

  //   if (form.checkValidity()) {
  //     axios
  //       .post('https://my-fight-flix.herokuapp.com/api/login', {
  //         Username: username,
  //         Password: password,
  //       })
  //       .then((res) => {
  //         console.log('Account Logged In');
  //         handleLoggedIn(res.data);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         console.log('Invalid Username or Password');
  //         setIsServerInvalidated(true);
  //         setIsLoading(false);
  //       });
  //   }
  // };

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
          <LoadingSpinner show={isLoading} />
          {/* <CustomAlert
            alertHeading='Login Error'
            alertBody='Incorrect username or password. Please try again.'
            isShowAlert={isServerInvalidated}
            onCloseAlert={handleCloseAlert}
          /> */}
          <h2 className='text-left h6 text-dark font-weight-bold mb-2'>
            Login to Your Account
          </h2>
          <Form
            noValidate
            validated={isClientValidated}
            onSubmit={(e) => {
              e.preventDefault();
              loginUser(username, password);
            }}
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
    </React.Fragment>
  );
};

LoginView.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginView);
