import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { setMoviesFilter } from '../../store/movies';

import Form from 'react-bootstrap/Form';

function FilterInput({ setMoviesFilter }) {
  return (
    <Form.Control
      onChange={(e) => setMoviesFilter(e.target.value)}
      placeholder='Filter Movies'
    />
  );
}

FilterInput.propTypes = {
  setMoviesFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setMoviesFilter: (input) => dispatch(setMoviesFilter(input)),
});

export default connect(null, mapDispatchToProps)(FilterInput);
