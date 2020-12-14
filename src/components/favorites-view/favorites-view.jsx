import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import Button from 'react-bootstrap/Button';

export default class FavoritesView extends Component {
  render() {
    const { favoriteMovies, movies, onRemoveFavorite } = this.props;

    return (
      <div>
        <h3 className='text-dark text-center font-weight-bold h5 mt-4'>
          My <span className='text-primary'>Favorite</span> Movies
        </h3>
        <div className='container d-flex flex-wrap justify-content-center mb-5'>
          {favoriteMovies.map((movieId) => (
            <div
              key={movieId}
              className='d-flex flex-column align-items-center'
            >
              <MovieCard
                movie={movies.find((movie) => movie._id === movieId)}
              />
              <Button
                size='sm'
                variant='warning'
                className='w-75'
                onClick={() => onRemoveFavorite(movieId)}
              >
                Remove Favorite
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
