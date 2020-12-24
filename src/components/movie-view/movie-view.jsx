import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/user';
// Components & styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './movie-view.scss';

class MovieView extends Component {
  // Handles how the star is displayed (empty or filled)
  renderClasses = () => {
    const movie = this.props.movies.find(
      (m) => m._id === this.props.match.params.movieId
    );

    let classes = 'text-warning fa fa-star';
    return !this.props.favorites.includes(movie._id)
      ? (classes += '-o')
      : classes;
  };

  // Handler for clicking on the star
  toggleFavorite = () => {
    const movie = this.props.movies.find(
      (m) => m._id === this.props.match.params.movieId
    );

    return !this.props.favorites.includes(movie._id)
      ? this.props.addFavorite(movie._id)
      : this.props.removeFavorite(movie._id);
  };

  render() {
    const { movies, match } = this.props;

    const movie = movies.find((m) => m._id === match.params.movieId);

    return !movie ? (
      <div>Loading</div>
    ) : (
      <Container>
        <div className='row bg-white rounded m-3 p-3'>
          <div className='col-lg-6 d-flex justify-content-center'>
            <img className='rounded' src={movie.ImagePath || ''} />
          </div>
          <div className='col-lg-6 d-flex flex-column align-items-center justify-content-between'>
            <div className='d-flex justify-content-center align-items-center w-100 mb-2'>
              <span className='h2 text-primary mr-2 font-weight-semi-bold'>
                {movie.Title || ''}
              </span>
              <i
                style={{ cursor: 'pointer', fontSize: '24px' }}
                onClick={this.toggleFavorite}
                className={this.renderClasses()}
              />
            </div>
            <div className='text-left w-100 mb-3'>
              <div>
                <span className='label'>Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <span>{movie.Genre.Name || ''}</span>
                </Link>
              </div>
              <div>
                <span className='label'>Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span>{movie.Director.Name || ''}</span>
                </Link>
              </div>
            </div>
            <div className='description mb-2'>
              <span>{movie.Description || ''}</span>
            </div>
            <Link to='/'>
              <Button className='ml-auto btn btn-primary'>
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  favorites: state.user.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (id) => dispatch(addFavorite(id)),
  removeFavorite: (id) => dispatch(removeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieView);
