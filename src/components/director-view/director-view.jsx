import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import MovieCard from './../movie-card/movie-card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const DirectorView = ({ movies, match }) => {
  const movie = movies.find(
    (m) => m.Director.Name === match.params.directorName
  );
  const otherMovies = movies.filter(
    (m) => m.Director.Name === match.params.directorName
  );

  return !movie ? (
    <div>Loading</div>
  ) : (
    <React.Fragment>
      <div className='container'>
        <div className='row bg-white rounded m-3 p-3'>
          <div className='col d-flex flex-column align-items-center justify-content-between'>
            <span className='h4 text-primary font-weight-semi-bold mb-2'>
              {movie.Director.Name}
            </span>
            <span className='mb-2'>Born in {movie.Director.Birth || ''}</span>
            <span className='mb-3'>
              <span className='font-weight-bold'>Biography:</span>{' '}
              {movie.Director.Bio}
            </span>
            <Link to='/'>
              <Button className='ml-auto btn btn-primary'>
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>

        <h2 className='h5 text-center text-dark mb-1 font-weight-semi-bold'>
          Movies from{' '}
          <span className='text-primary'>{movie.Director.Name}</span>
        </h2>
        <div className='row bg-light rounded m-1 p-1 d-flex align align-items-center justify-content-center'>
          {otherMovies.map((o) => (
            <MovieCard key={o._id} movie={o} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

export default connect(mapStateToProps)(DirectorView);
