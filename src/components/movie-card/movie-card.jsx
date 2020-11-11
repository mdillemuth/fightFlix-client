import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class MovieCard extends Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div
        className='bg-light m-2 p-2 rounded'
        style={{ width: '200px', height: '300px' }}
      >
        {/* <img src={movie.ImagePath} /> */}
        <div>
          <p>{movie.Title}</p>
          {/* <p>{movie.Description}</p> */}
          <Button
            onClick={() => onClick(movie)}
            variant='primary'
            className='w-100'
          >
            View
          </Button>
        </div>
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
