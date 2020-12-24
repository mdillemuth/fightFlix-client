import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';

const MoviesList = ({ movies }) => {
  return !movies ? (
    <div>Loading Movies</div>
  ) : (
    <div>
      <h2 className='my-1 h3 text-dark text-center'>
        Choose from <span className='text-primary'>{movies.length}</span>{' '}
        exciting movies
      </h2>
      <div className='container d-flex flex-wrap justify-content-center'>
        {movies.map((m) => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </div>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps)(MoviesList);
