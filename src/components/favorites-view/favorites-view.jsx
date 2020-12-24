import React from 'react';
// Redux
import { connect } from 'react-redux';
import { removeFavorite } from '../../store/user';
// Components
import MovieCard from '../movie-card/movie-card';
import Button from 'react-bootstrap/Button';

const FavoritesView = ({ movies, favorites, removeFavorite }) => {
  return (
    <div>
      <h3 className='text-dark text-center font-weight-bold h5 mt-4'>
        My <span className='text-primary'>Favorite</span> Movies
      </h3>
      <div className='container d-flex flex-wrap justify-content-center mb-5'>
        {favorites.map((movieId) => (
          <div key={movieId} className='d-flex flex-column align-items-center'>
            <MovieCard movie={movies.find((movie) => movie._id === movieId)} />
            <Button
              size='sm'
              variant='warning'
              className='w-75'
              onClick={() => removeFavorite(movieId)}
            >
              Remove Favorite
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  favorites: state.user.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (id) => dispatch(removeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesView);
