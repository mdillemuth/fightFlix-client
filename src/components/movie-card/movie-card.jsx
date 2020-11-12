import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

class MovieCard extends Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div className='movie-card bg-light m-2 p-3 rounded d-flex flex-column justify-content-between align-items-center'>
        <img src={movie.ImagePath} className='movie-card-img rounded' />
        <div className='mw-100'>
          <p className='h4 text-center font-weight-semi-bold'>{movie.Title}</p>
          <p className='movie-card-description text-muted'>
            {movie.Description}
          </p>
        </div>
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
