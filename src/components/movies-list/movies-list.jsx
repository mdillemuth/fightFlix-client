import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import MovieCard from '../movie-card/movie-card';
import FilterInput from '../filter-input/filter-input';

const MoviesList = ({ movies, moviesFilter, genreFilter, directorFilter }) => {
  let filteredMovies = movies;

  // Filters movies by genre
  if (genreFilter !== '') {
    filteredMovies = movies.filter((m) => m.Genre.Name === genreFilter);
  }

  // Filters movies by director
  if (directorFilter !== '') {
    filteredMovies = movies.filter((m) => m.Director.Name === directorFilter);
  }

  // Filters movies by title (from user input)
  if (moviesFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.includes(moviesFilter));
  }

  return !movies ? (
    <div>Loading Movies</div>
  ) : (
    <div>
      <FilterInput moviesFilter={moviesFilter} genreFilter={genreFilter} />
      <h2 className='my-1 h3 text-dark text-center'>
        Choose from{' '}
        <span className='text-primary'>{filteredMovies.length}</span> exciting
        movies
      </h2>
      <div className='container d-flex flex-wrap justify-content-center'>
        {filteredMovies.map((m) => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </div>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  moviesFilter: PropTypes.string,
};

const mapStateToProps = (state) => ({
  movies: state.movies.list,
  moviesFilter: state.movies.moviesFilter,
  genreFilter: state.movies.genreFilter,
  directorFilter: state.movies.directorFilter,
});

export default connect(mapStateToProps)(MoviesList);
