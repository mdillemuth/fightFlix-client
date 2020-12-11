// Import components
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileForm from './profile-form';
import CustomAlert from '../common/CustomAlert';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileView = (props) => {
  const { onLogout } = props;

  const [formData, setFormData] = useState({
    newUsername: '',
    newEmail: '',
    newPassword: '',
    newPasswordConfirm: '',
    newBirthday: '',
  });
  const {
    newUsername,
    newEmail,
    newPassword,
    newPasswordConfirm,
    newBirthday,
  } = formData;

  const [isClientValidated, setIsClientValidated] = useState(false);
  const [isServerInvalidated, setIsServerInvalidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCloseAlert = () => {
    setIsServerInvalidated(false);
  };

  const handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    if (window.confirm('Are you sure you wish to remove your account?')) {
      axios
        .delete(`https://my-fight-flix.herokuapp.com/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('account deleted');
          onLogout();
        })
        .catch((e) => console.log('error'));
    } else {
      window.open('/profile', '_self');
    }
  };

  const handleUpdateAccount = (e) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const form = e.currentTarget;

    setIsLoading(true);

    if (newPassword !== newPasswordConfirm) {
      return alert('Passwords do not match');
    }

    if (!form.checkValidity()) {
      console.log('Invalid input, form not submitted');
      e.preventDefault();
      e.stopPropagation();
      setIsLoading(false);
    }
    setIsClientValidated(true);

    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (form.checkValidity()) {
      axios
        .put(
          `https://my-fight-flix.herokuapp.com/api/users/${username}`,
          {
            Username: newUsername,
            Password: newPassword,
            Email: newEmail,
            Birthday: newBirthday,
          },
          config
        )
        .then((res) => {
          console.log('Account Updated');
          setIsLoading(false);
          window.open('/', '_self');
          onLogout();
        })
        .catch((e) => {
          console.log('Update Error');
          setIsServerInvalidated(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <React.Fragment>
      <Container className='my-3'>
        <div className='w-100 d-flex flex-column align-items-center mb-3'>
          <Link to='/'>
            <Button className='btn btn-primary'>Back to Movies</Button>
          </Link>
        </div>
        <Col
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className='bg-white rounded p-3'
        >
          <div className='mb-2'>
            <h2 className='text-left h5 text-dark font-weight-bold mb-1'>
              Update Your Information
            </h2>
          </div>
          <LoadingSpinner show={isLoading} />
          <CustomAlert
            alertHeading='Update Error'
            alertBody='Username is already taken or there is already an account with this email address'
            isShowAlert={isServerInvalidated}
            onCloseAlert={handleCloseAlert}
          />
          <ProfileForm
            newUsernameValue={newUsername}
            newEmailValue={newEmail}
            newPasswordValue={newPassword}
            newPasswordConfirmValue={newPasswordConfirm}
            newBirthdayValue={newBirthday}
            isClientValidated={isClientValidated}
            onFormChange={handleFormChange}
            onUpdateAccount={handleUpdateAccount}
            onRemoveAccount={handleRemoveAccount}
          />
        </Col>
      </Container>
    </React.Fragment>
  );
};

ProfileView.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default ProfileView;
