import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Components
import Button from 'react-bootstrap/Button';
import MovieCard from './../movie-card/movie-card';

const GenreView = ({ movies, match }) => {
  const movie = movies.find((m) => m.Genre.Name === match.params.genreName);
  const otherMovies = movies.filter(
    (m) => m.Genre.Name === match.params.genreName
  );

  return !movie ? (
    <div>Loading</div>
  ) : (
    <React.Fragment>
      <div className='container'>
        <div className='row bg-white rounded m-3 p-3'>
          <div className='col d-flex flex-column align-items-center justify-content-between'>
            <span className='h4 text-primary font-weight-semi-bold mb-2'>
              {movie.Genre.Name}
            </span>
            <span className='mb-3'>
              <span className='font-weight-bold'>Description:</span>{' '}
              {movie.Genre.Description}
            </span>
            <Link to='/'>
              <Button className='ml-auto btn btn-primary'>
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>

        <h2 className='h5 text-dark text-center mb-1 font-weight-semi-bold'>
          Movies in the genre{' '}
          <span className='text-primary'>{movie.Genre.Name}</span>
        </h2>
        <div className='container d-flex flex-wrap justify-content-center'>
          {otherMovies.map((o) => (
            <MovieCard key={o._id} movie={o} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

export default connect(mapStateToProps)(GenreView);
