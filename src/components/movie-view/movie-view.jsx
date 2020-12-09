import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Favorite from '../common/Favorite';
import './movie-view.scss';
import { Link } from 'react-router-dom';

class MovieView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movie, onAddFavorite } = this.props;

    if (!movie) return null;

    return (
      <React.Fragment>
        <div className='container'>
          <div className='row bg-white rounded m-3 p-3'>
            <div className='col-lg-6 d-flex justify-content-center'>
              <img
                className='movie-poster rounded'
                src={movie.ImagePath || ''}
              />
            </div>
            <div className='col-lg-6 d-flex flex-column align-items-center justify-content-between'>
              <div className='movie-title d-flex justify-content-center align-items-center w-100 mb-2'>
                <span className='value h2 text-primary mr-2 font-weight-semi-bold'>
                  {movie.Title || ''}
                </span>
                <Favorite
                  onClick={() => onAddFavorite(movie._id)}
                  movieId={movie._id}
                  // isFavorite={userData..liked}
                />
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
  }
}

// PropTypes
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieView;
