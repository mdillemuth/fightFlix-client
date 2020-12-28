import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import BootstrapAlert from 'react-bootstrap/Alert';

const Alert = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <BootstrapAlert variant={alert.type}>
        <BootstrapAlert.Heading className='text-center'>
          {alert.message}
        </BootstrapAlert.Heading>
      </BootstrapAlert>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.list,
});

export default connect(mapStateToProps)(Alert);
