import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { fetchMovies } from '../../store/movies';

// UI Components
import MoviesView from '../movies-view/movies-view';
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
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      userData: {},
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
      this.props.fetchMovies(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://my-fight-flix.herokuapp.com/api/users/${username}`, config)
      .then((res) => {
        res.data.map((item) => {
          this.setState({
            userData: item,
          });
        });
        this.setState({
          favoriteMovies: this.state.userData.FavoriteMovies,
        });
      })
      .catch((e) => console.log('Error Retrieving User Data'));
  }

  getMovies(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('https://my-fight-flix.herokuapp.com/api/movies', config)
      .then((res) => {
        this.setState({ movies: res.data });
      })
      .catch((e) => console.log('error getting movies'));
  }

  handleLoggedIn = (authData) => {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.getMovies(authData.token);
    this.getUser(authData.token);
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      user: null,
    });
  };

  handleToggleFavorite = (movieId) => {
    const favoriteMovies = this.state.favoriteMovies;

    if (favoriteMovies.indexOf(movieId) === -1) {
      this.handleAddFavorite(movieId);
    } else {
      this.handleRemoveFavorite(movieId);
    }
  };

  handleAddFavorite = (movieId) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (this.state.favoriteMovies.indexOf(movieId) > -1) {
      return console.log('Movie already in favorites');
    }

    axios
      .post(
        `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(`Movie ${movieId} added to favorites`);
      })
      .catch((e) => console.log('Error Adding Favorite'));

    const favoriteMovies = [...this.state.favoriteMovies];
    favoriteMovies.push(movieId);
    this.setState({ favoriteMovies });
  };

  handleRemoveFavorite = (movieId) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    if (this.state.favoriteMovies.indexOf(movieId) === -1) {
      return console.log('Movie not in favorites');
    }

    axios
      .delete(
        `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log('favorite removed');
      })
      .catch((e) => console.log('error'));

    const favoriteMovies = [...this.state.favoriteMovies];
    const index = favoriteMovies.indexOf(movieId);
    favoriteMovies[index] = { ...favoriteMovies[index] };
    if (index > -1) {
      favoriteMovies.splice(index, 1);
    }
    this.setState({ favoriteMovies });
  };

  render() {
    const { movies, user, favoriteMovies } = this.state;

    return (
      <BrowserRouter>
        <NavBar onLogout={this.handleLogout} user={user} />
        <Switch>
          <Route path='/directors/:directorName' component={DirectorView} />
          <Route path='/genres/:genreName' component={GenreView} />
          <Route
            path='/movies/:movieId'
            render={({ match }) => (
              <MovieView
                isFavorite={favoriteMovies.indexOf(match.params.movieId)}
                movie={movies.find((m) => m._id === match.params.movieId)}
                onToggleFavorite={this.handleToggleFavorite}
              />
            )}
          />
          <Route
            path='/profile'
            render={() => (
              <div>
                <ProfileView onLogout={this.handleLogout} />
                <FavoritesView
                  favoriteMovies={favoriteMovies}
                  movies={movies}
                  onRemoveFavorite={this.handleRemoveFavorite}
                />
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
              return <MoviesView movies={movies} />;
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

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (token) => dispatch(fetchMovies(token)),
});

export default connect(null, mapDispatchToProps)(MainView);
