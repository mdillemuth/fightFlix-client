import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

class MovieView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onReturn } = this.props;

    if (!movie) return null;

    return (
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
              <p className='h4 text-dark ml-2'>
                <i className='heart fa fa-heart-o'></i>
              </p>
            </div>
            <div className='text-left w-100 mb-3'>
              <div className='movie-genre'>
                <span className='label'>Genre: </span>
                <span className='value'>{movie.Genre.Name || ''}</span>
              </div>
              <div className='movie-director'>
                <span className='label'>Director: </span>
                <span className='value'>{movie.Director.Name || ''}</span>
              </div>
            </div>
            <div className='movie-description mb-2'>
              <span className='value'>{movie.Description || ''}</span>
            </div>

            <button className='ml-auto btn btn-primary' onClick={onReturn}>
              Back to Movies
            </button>
          </div>
        </div>
      </div>
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
  onReturn: PropTypes.func.isRequired,
};

export default MovieView;
