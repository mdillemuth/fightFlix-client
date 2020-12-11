import React, { useState } from 'react';
import RegistrationForm from './registration-form';
import CustomAlert from './../common/CustomAlert';
import LoadingSpinner from '../common/LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const RegistrationView = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birthday: '',
  });

  const { username, email, password, passwordConfirm, birthday } = formData;
  const [isClientValidated, setIsClientValidated] = useState(false);
  const [isServerInvalidated, setIsServerInvalidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCloseAlert = () => {
    setIsServerInvalidated(false);
  };

  const handleRegistration = (e) => {
    setIsLoading(true);

    if (password !== passwordConfirm) {
      return alert('Passwords do not match');
    }

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      console.log('Invalid input, form not submitted');
      e.preventDefault();
      e.stopPropagation();
      setIsLoading(false);
    }
    setIsClientValidated(true);

    e.preventDefault();

    if (form.checkValidity()) {
      axios
        .post('https://my-fight-flix.herokuapp.com/api/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((res) => {
          console.log('Account Registered');
          setIsLoading(false);
          window.open('/', '_self');
        })
        .catch((e) => {
          console.log('Registration Error');
          setIsServerInvalidated(true);
          setIsLoading(false);
        });
    }
  };

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
        <LoadingSpinner show={isLoading} />
        <CustomAlert
          alertHeading='Registration Error'
          alertBody='Username is already taken or there is already an account with this email address'
          isShowAlert={isServerInvalidated}
          onCloseAlert={handleCloseAlert}
        />
        <RegistrationForm
          usernameValue={username}
          emailValue={email}
          passwordValue={password}
          passwordConfirmValue={passwordConfirm}
          birthdayValue={birthday}
          isClientValidated={isClientValidated}
          onFormChange={handleFormChange}
          onRegistration={handleRegistration}
        />
      </Col>
    </Container>
  );
};

export default RegistrationView;
