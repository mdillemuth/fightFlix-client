import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProfileForm = (props) => {
  const {
    newUsernameValue,
    newEmailValue,
    newPasswordValue,
    newPasswordConfirmValue,
    newBirthdayValue,
    isClientValidated,
    onFormChange,
    onUpdateAccount,
    onRemoveAccount,
  } = props;

  return (
    <React.Fragment>
      <Form
        noValidate
        validated={isClientValidated}
        className='mb-2'
        onSubmit={onUpdateAccount}
      >
        <Form.Group className='mb-2' controlId='registerUsername'>
          <Form.Control
            autoFocus
            type='text'
            placeholder='New username'
            name='newUsername'
            value={newUsernameValue}
            onChange={onFormChange}
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
            value={newEmailValue}
            onChange={onFormChange}
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
            value={newPasswordValue}
            onChange={onFormChange}
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
            value={newPasswordConfirmValue}
            onChange={onFormChange}
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
            value={newBirthdayValue}
            onChange={onFormChange}
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
            onClick={onRemoveAccount}
          >
            remove your account
          </span>
        </Link>
      </small>
    </React.Fragment>
  );
};

ProfileForm.propTypes = {
  newUsernameValue: PropTypes.string.isRequired,
  newPasswordValue: PropTypes.string.isRequired,
  newPasswordConfirmValue: PropTypes.string.isRequired,
  newEmailValue: PropTypes.string.isRequired,
  newBirthdayValue: PropTypes.string.isRequired,
  isClientValidated: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onUpdateAccount: PropTypes.func.isRequired,
  onRemoveAccount: PropTypes.func.isRequired,
};

export default ProfileForm;
