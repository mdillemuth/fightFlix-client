import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const CustomAlert = (props) => {
  const { onShowAlert, onCloseAlert, alertHeading, alertBody } = props;

  if (onShowAlert) {
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
  onShowAlert: PropTypes.bool.isRequired,
  onCloseAlert: PropTypes.func.isRequired,
  alertHeading: PropTypes.string.isRequired,
  alertBody: PropTypes.string.isRequired,
};

export default CustomAlert;
