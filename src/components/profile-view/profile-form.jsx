import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProfileForm = (props) => {
  const {
    formInputs,
    isClientValidated,
    onFormChange,
    onUpdateAccount,
    onRemoveAccount,
  } = props;

  const {
    newUsername,
    newEmail,
    newPassword,
    newPasswordConfirm,
    newBirthday,
  } = formInputs;

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
            value={newUsername}
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
            value={newEmail}
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
            value={newPassword}
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
            value={newPasswordConfirm}
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
            value={newBirthday}
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
  formInputs: PropTypes.object.isRequired,
  isClientValidated: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onUpdateAccount: PropTypes.func.isRequired,
  onRemoveAccount: PropTypes.func.isRequired,
};

export default ProfileForm;
