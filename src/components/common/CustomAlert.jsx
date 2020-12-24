import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert variant={alert.type}>
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.list,
});

export default connect(mapStateToProps)(CustomAlert);
