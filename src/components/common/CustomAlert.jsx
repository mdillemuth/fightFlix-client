import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const CustomAlert = ({ showAlert, alertHeading, alertBody }) => {
  const [closeAlert, setCloseAlert] = useState(true);

  if (closeAlert && showAlert === true) {
    return (
      <Alert variant='danger' onClose={() => setCloseAlert(false)} dismissible>
        <Alert.Heading>{alertHeading}</Alert.Heading>
        <p>{alertBody}</p>
      </Alert>
    );
  }

  return <React.Fragment></React.Fragment>;
};

CustomAlert.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  alertHeading: PropTypes.string.isRequired,
  alertBody: PropTypes.string.isRequired,
};

export default CustomAlert;
