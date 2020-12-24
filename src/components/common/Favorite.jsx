import React from 'react';

// Redux
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/user';

const Favorite = ({ favorites, movieId, addFavorite, removeFavorite }) => {
  // Shows a filled star when movie is in user's favorites
  const renderClasses = () => {
    let classes = 'text-warning fa fa-star';
    return !favorites.includes(movieId) ? (classes += '-o') : classes;
  };

  // Lets user add or remove favorite on consecutive clicks
  const toggleFavorite = (movieId) => {
    return !favorites.includes(movieId)
      ? addFavorite(movieId)
      : removeFavorite(movieId);
  };

  return (
    <i
      style={{ cursor: 'pointer', fontSize: '24px' }}
      onClick={() => toggleFavorite(movieId)}
      className={renderClasses()}
      aria-hidden='true'
    />
  );
};

const mapStateToProps = (state) => ({
  favorites: state.user.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (movieId) => dispatch(addFavorite(movieId)),
  removeFavorite: (movieId) => dispatch(removeFavorite(movieId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
