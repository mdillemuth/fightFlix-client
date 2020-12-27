import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import spinner from './../../assets/img/spinner.gif';

const Loading = ({ loading }) => {
  if (loading) {
    return (
      <div>
        <img
          src={spinner}
          style={{ width: '75px', margin: 'auto', display: 'block' }}
          alt='Loading...'
        />
      </div>
    );
  } else {
    return null;
  }
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps)(Loading);
