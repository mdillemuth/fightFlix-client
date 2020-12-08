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
import NavBar from './../layout/NavBar';
import SubNavBar from './../layout/SubNavBar';

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      userData: [],
    };
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

  async componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      await this.getMovies(accessToken);
      await this.getUser(accessToken);
    }
  }

  async getMovies(token) {
    const { data: movies } = await axios.get(
      'https://my-fight-flix.herokuapp.com/api/movies',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ movies });
  }

  async getUser(token) {
    const username = localStorage.getItem('user');

    const { data: userData } = await axios.get(
      `https://my-fight-flix.herokuapp.com/api/users/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ userData });
  }

  getUserFavoriteMovies() {}

  render() {
    const { movies, user, userData } = this.state;

    if (!movies || !userData) return <div className='main-view' />;

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
          path='/profile'
          render={() => (
            <React.Fragment>
              <NavBar handleLogout={this.handleLogout} />
              <ProfileView
                handleLogout={this.handleLogout}
                getUserData={this.getUser}
                userData={userData}
                movies={movies}
              />
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
              />
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

export default MainView;
