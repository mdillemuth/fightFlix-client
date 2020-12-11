import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const CustomAlert = (props) => {
  const { alertHeading, alertBody, isShowAlert, onCloseAlert } = props;

  if (isShowAlert) {
    return (
      <Alert variant='danger' onClose={onCloseAlert} dismissible>
        <Alert.Heading className='h6 font-weight-bold'>
          {alertHeading}
        </Alert.Heading>
        <p>{alertBody}</p>
      </Alert>
    );
  } else {
    return null;
  }
};

CustomAlert.propTypes = {
  alertHeading: PropTypes.string.isRequired,
  alertBody: PropTypes.string.isRequired,
  isShowAlert: PropTypes.bool.isRequired,
  onCloseAlert: PropTypes.func.isRequired,
};

export default CustomAlert;
