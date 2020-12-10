import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ showAlert, alertHeading, alertBody }) => {
  // Internal state for when user closes the alert
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

export default CustomAlert;
