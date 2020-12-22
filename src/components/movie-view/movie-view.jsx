import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Favorite from '../common/Favorite';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// isFavorite={favoriteMovies.indexOf(match.params.movieId)}
// onToggleFavorite={this.handleToggleFavorite}

const MovieView = ({ movies, match }) => {
  const movie = movies.find((m) => m._id === match.params.movieId);

  return !movie ? (
    <div>Loading</div>
  ) : (
    <React.Fragment>
      <div className='container'>
        <div className='row bg-white rounded m-3 p-3'>
          <div className='col-lg-6 d-flex justify-content-center'>
            <img className='movie-poster rounded' src={movie.ImagePath || ''} />
          </div>
          <div className='col-lg-6 d-flex flex-column align-items-center justify-content-between'>
            <div className='movie-title d-flex justify-content-center align-items-center w-100 mb-2'>
              <span className='value h2 text-primary mr-2 font-weight-semi-bold'>
                {movie.Title || ''}
              </span>
              {/* <Favorite
                isFavorite={isFavorite}
                onClick={() => onToggleFavorite(movie._id)}
                movieId={movie._id}
              /> */}
            </div>
            <div className='text-left w-100 mb-3'>
              <div className='movie-genre'>
                <span className='label'>Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <span className='value'>{movie.Genre.Name || ''}</span>
                </Link>
              </div>
              <div className='movie-director'>
                <span className='label'>Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span className='value'>{movie.Director.Name || ''}</span>
                </Link>
              </div>
            </div>
            <div className='movie-description mb-2'>
              <span className='value'>{movie.Description || ''}</span>
            </div>
            <Link to='/'>
              <Button className='ml-auto btn btn-primary'>
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps)(MovieView);
