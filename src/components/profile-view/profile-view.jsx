// Import components
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { deleteAccount, updateAccount } from '../../store/user';
import { setAlert } from '../../store/alerts';
// Components
import FavoritesView from '../favorites-view/favorites-view';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Loading from '../common/Loading';

const ProfileView = ({ user, deleteAccount, updateAccount, setAlert }) => {
  // Component state for form inputs
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

  // Handler for adding form input values to component state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form submission handler with validation
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Check passwords match
    if (newPassword !== newPasswordConfirm) {
      setAlert('Passwords do not match', 'danger');
      return;
    }

    // Update request to API with valid form
    if (form.checkValidity())
      updateAccount(newUsername, newPassword, newEmail, newBirthday);

    setValidated(true);
  };

  return !user ? (
    <div>loading</div>
  ) : (
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
              placeholder='New username'
              name='newUsername'
              value={newUsername}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Please enter a username
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-2' controlId='registerEmail'>
            <Form.Control
              type='email'
              placeholder='New email'
              name='newEmail'
              value={newEmail}
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
              placeholder='New password'
              name='newPassword'
              value={newPassword}
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
              placeholder='Confirm new password'
              name='newPasswordConfirm'
              value={newPasswordConfirm}
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
              Birthday
            </Form.Label>
            <Form.Control
              type='date'
              name='newBirthday'
              value={newBirthday}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              Birthday is required
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100 btn-lg'>
            Submit
          </Button>
        </Form>
        <small className='text-muted text-center d-block'>
          Or you can{' '}
          <Link to='/'>
            <span
              style={{ cursor: 'pointer' }}
              className='text-primary'
              onClick={deleteAccount}
            >
              remove your account
            </span>
          </Link>
        </small>
      </Col>
      <FavoritesView />
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object,
  deleteAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteAccount: () => dispatch(deleteAccount()),
  updateAccount: (newUsername, newPassword, newEmail, newBirthday) =>
    dispatch(updateAccount(newUsername, newPassword, newEmail, newBirthday)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
