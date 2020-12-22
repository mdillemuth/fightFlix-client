import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { fetchMovies } from '../../store/movies';
import { fetchUser } from '../../store/user';

// UI Components
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from './../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import FavoritesView from '../favorites-view/favorites-view';
import NavBar from '../common/NavBar';
import NotFound from '../not-found/not-found';

class MainView extends Component {
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    if (accessToken !== null) {
      this.props.fetchMovies(accessToken);
      this.props.fetchUser(accessToken, username);
    }
  }

  handleLoggedIn = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.props.fetchMovies(authData.token);
    this.props.fetchUser(authData.token, authData.user.Username);
  };

  // handleToggleFavorite = (movieId) => {
  //   const favoriteMovies = this.state.favoriteMovies;

  //   if (favoriteMovies.indexOf(movieId) === -1) {
  //     this.handleAddFavorite(movieId);
  //   } else {
  //     this.handleRemoveFavorite(movieId);
  //   }
  // };

  // handleAddFavorite = (movieId) => {
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');

  //   if (this.state.favoriteMovies.indexOf(movieId) > -1) {
  //     return console.log('Movie already in favorites');
  //   }

  //   axios
  //     .post(
  //       `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(`Movie ${movieId} added to favorites`);
  //     })
  //     .catch((e) => console.log('Error Adding Favorite'));

  //   const favoriteMovies = [...this.state.favoriteMovies];
  //   favoriteMovies.push(movieId);
  //   this.setState({ favoriteMovies });
  // };

  // handleRemoveFavorite = (movieId) => {
  //   const token = localStorage.getItem('token');
  //   const username = localStorage.getItem('user');

  //   if (this.state.favoriteMovies.indexOf(movieId) === -1) {
  //     return console.log('Movie not in favorites');
  //   }

  //   axios
  //     .delete(
  //       `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then((res) => {
  //       console.log('favorite removed');
  //     })
  //     .catch((e) => console.log('error'));

  //   const favoriteMovies = [...this.state.favoriteMovies];
  //   const index = favoriteMovies.indexOf(movieId);
  //   favoriteMovies[index] = { ...favoriteMovies[index] };
  //   if (index > -1) {
  //     favoriteMovies.splice(index, 1);
  //   }
  //   this.setState({ favoriteMovies });
  // };

  render() {
    const { user } = this.props;

    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/directors/:directorName' component={DirectorView} />
          <Route path='/genres/:genreName' component={GenreView} />
          <Route path='/movies/:movieId' component={MovieView} />
          <Route
            path='/profile'
            render={() => (
              <div>
                <ProfileView />
                {/* <FavoritesView
                  favoriteMovies={favoriteMovies}
                  onRemoveFavorite={this.handleRemoveFavorite}
                /> */}
              </div>
            )}
          />
          <Route path='/register' render={() => <RegistrationView />} />
          <Route
            exact
            path='/'
            render={() => {
              if (!user) {
                return (
                  <LoginView
                    handleLoggedIn={(user) => this.handleLoggedIn(user)}
                  />
                );
              }
              return <MoviesList />;
            }}
          />
          <Route path='/not-found' component={NotFound} />
          <Redirect from='/movies' to='/' />
          <Redirect to='/not-found' />
        </Switch>
      </BrowserRouter>
    );
  }
}

MainView.propTypes = {
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (token) => dispatch(fetchMovies(token)),
  fetchUser: (token, username) => dispatch(fetchUser(token, username)),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
