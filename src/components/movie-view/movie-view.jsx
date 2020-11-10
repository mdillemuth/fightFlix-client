import React, { Component } from 'react';

class MovieView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onReturn } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <img className='movie-poster' src={movie.ImagePath} />
        <div className='movie-content'>
          <div className='movie-title'>
            <span className='label'>Title: </span>
            <span className='value'>{movie.Title}</span>
          </div>
          <div className='movie-description'>
            <span className='label'>Description: </span>
            <span className='value'>{movie.Description}</span>
          </div>

          <div className='movie-genre'>
            <span className='label'>Genre: </span>
            <span className='value'>{movie.Genre.Name}</span>
          </div>
          <div className='movie-director'>
            <span className='label'>Director: </span>
            <span className='value'>{movie.Director.Name}</span>
          </div>
        </div>
        {/* <button onClick={onPrevious}>Previous</button> */}
        <button onClick={onReturn}>Back to Movies</button>
        {/* <button onClick={onNext}>Next</button> */}
      </div>
    );
  }
}

export default MovieView;
