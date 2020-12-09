import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from './../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import NavBar from '../common/NavBar';
import SubNavBar from '../common/SubNavBar';

import Button from 'react-bootstrap/Button';

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
    }
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

  // TODO
  handleAddFavorite = (movieId) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

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

  // TODO
  handleRemoveFavorite = (movieId) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

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

  render() {
    const { movies, user, userData, favoriteMovies } = this.state;

    if (!movies) return <div className='main-view' />;
    if (!userData) return <div className='main-view' />;
    if (!favoriteMovies) return <div className='main-view' />;

    return (
      <div>
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
            return (
              <React.Fragment>
                <NavBar handleLogout={this.handleLogout} />
                {/* <SubNavBar /> */}
                <h2 className='my-1 h5 text-dark text-center'>
                  Choose from{' '}
                  <span className='text-primary'>
                    {this.state.movies.length}
                  </span>{' '}
                  exciting movies
                </h2>
                <div className='container d-flex flex-wrap justify-content-center'>
                  {movies.map((m) => (
                    <MovieCard key={m._id} movie={m} />
                  ))}
                </div>
              </React.Fragment>
            );
          }}
        />
        <Route path='/register' render={() => <RegistrationView />} />
        <Route
          exact
          path='/profile'
          render={() => (
            <React.Fragment>
              <NavBar handleLogout={this.handleLogout} />
              <ProfileView handleLogout={this.handleLogout} movies={movies} />
              <div>
                <h3 className='text-dark text-center font-weight-bold h5 mt-4'>
                  My <span className='text-primary'>Favorite</span> Movies
                </h3>
                <div className='container d-flex flex-wrap justify-content-center'>
                  {favoriteMovies.map((movieId) => (
                    <div>
                      <MovieCard
                        key={movieId}
                        movie={movies.find((movie) => movie._id === movieId)}
                      />
                      <Button
                        size='sm'
                        className='btn btn-warning'
                        onClick={() => this.handleRemoveFavorite(movieId)}
                      >
                        Remove Favorite
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          )}
        />
        <Route
          exact
          path='/directors/:directorName'
          render={({ match }) => (
            <React.Fragment>
              <NavBar handleLogout={this.handleLogout} />
              <DirectorView
                movie={movies.find(
                  (m) => m.Director.Name === match.params.directorName
                )}
                other={movies.filter(
                  (m) => m.Director.Name === match.params.directorName
                )}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path='/genres/:genreName'
          render={({ match }) => (
            <React.Fragment>
              <NavBar handleLogout={this.handleLogout} />
              <GenreView
                movie={movies.find(
                  (m) => m.Genre.Name === match.params.genreName
                )}
                other={movies.filter(
                  (m) => m.Genre.Name === match.params.genreName
                )}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path='/movies/:movieId'
          render={({ match }) => (
            <React.Fragment>
              <NavBar handleLogout={this.handleLogout} />
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
                onAddFavorite={this.handleAddFavorite}
              />
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

export default MainView;
