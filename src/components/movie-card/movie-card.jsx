import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

class MovieCard extends Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div className='movie-card bg-white m-3 p-3 rounded d-flex flex-column justify-content-between align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <img src={movie.ImagePath} className='movie-card-img rounded mb-2' />
          <p className='h4 text-center text-dark font-weight-bold'>
            {movie.Title}
          </p>
        </div>
        <p className='movie-card-description text-muted'>{movie.Description}</p>
        <Button
          onClick={() => onClick(movie)}
          variant='primary'
          className='w-100'
        >
          View
        </Button>
      </div>
    );
  }
}

// PropTypes
MovieCard.propTypes = {
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
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;
