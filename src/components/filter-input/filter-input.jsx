import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import {
  setMoviesFilter,
  setGenreFilter,
  setDirectorFilter,
  setMoviesSort,
} from '../../store/movies';
// Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';

function FilterInput({
  movies,
  setMoviesFilter,
  setGenreFilter,
  setDirectorFilter,
  setMoviesSort,
}) {
  // Create dropdown menu for genres
  const renderGenreDropdown = (movies) => {
    // Creates array of unique genre names
    let genreSet = new Set();
    for (let i = 0; i < movies.length; i++) {
      genreSet.add(movies[i].Genre.Name);
    }
    let genres = [...genreSet];

    // Maps array to dropdown items to set filter from
    return genres.map((genre) => (
      <Dropdown.Item key={genre} onClick={() => setGenreFilter(genre)}>
        {genre}
      </Dropdown.Item>
    ));
  };

  // Create dropdown menu for directors
  const renderDirectorDropdown = (movies) => {
    // Creates array of unique genre names
    let directorSet = new Set();
    for (let i = 0; i < movies.length; i++) {
      directorSet.add(movies[i].Director.Name);
    }
    let directors = [...directorSet].sort();

    // Maps array to dropdown items to set filter from
    return directors.map((director) => (
      <Dropdown.Item key={director} onClick={() => setDirectorFilter(director)}>
        {director}
      </Dropdown.Item>
    ));
  };

  return (
    <Container className='px-0 py-2'>
      <Row className='justify-content-center'>
        <Col sm={10} md={8} lg={4} className='mb-2'>
          <Form.Control
            onChange={(e) => setMoviesFilter(e.target.value)}
            placeholder='Search by title'
          />
        </Col>
        <Col
          sm={12}
          className='justify-content-center align-items-center d-flex'
        >
          <div>
            <DropdownButton
              id='genre-filter'
              title='Filter Genres'
              className='mr-2 filter-dropdown'
              size='sm'
            >
              <Dropdown.Item onClick={() => setGenreFilter('')}>
                All Genres
              </Dropdown.Item>
              {renderGenreDropdown(movies)}
            </DropdownButton>
          </div>
          <div>
            <DropdownButton
              id='director-filter'
              title='Filter Directors'
              className='mx-2 filter-dropdown'
              size='sm'
            >
              <Dropdown.Item onClick={() => setDirectorFilter('')}>
                All Directors
              </Dropdown.Item>
              {renderDirectorDropdown(movies)}
            </DropdownButton>
          </div>
          <Button
            className='ml-2'
            size='sm'
            variant='outline-primary'
            onClick={() => setMoviesSort('asc')}
          >
            Sort A - Z
          </Button>
          <Button
            className='ml-2'
            size='sm'
            variant='outline-primary'
            onClick={() => setMoviesSort('desc')}
          >
            Sort Z - A
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

FilterInput.propTypes = {
  setMoviesFilter: PropTypes.func.isRequired,
  setGenreFilter: PropTypes.func.isRequired,
  setDirectorFilter: PropTypes.func.isRequired,
  setMoviesSort: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

const mapDispatchToProps = (dispatch) => ({
  setMoviesFilter: (input) => dispatch(setMoviesFilter(input)),
  setGenreFilter: (genre) => dispatch(setGenreFilter(genre)),
  setDirectorFilter: (director) => dispatch(setDirectorFilter(director)),
  setMoviesSort: (direction) => dispatch(setMoviesSort(direction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);
