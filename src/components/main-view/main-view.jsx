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
    };
  }

  handleLoggedIn = (authData) => {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      user: null,
    });
  };

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://my-fight-flix.herokuapp.com/api/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { movies, user } = this.state;

    if (!movies) return <div className='main-view' />;

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
                <SubNavBar />
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
              <ProfileView handleLogout={this.handleLogout} />
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
