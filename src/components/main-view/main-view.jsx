import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

// Import views
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

  // Authentication and adding 'user' to state
  handleLoggedIn = (authData) => {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  };

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

  // Logout
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

  render() {
    // State
    const { movies, user } = this.state;

    // Before movies have loaded
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
              <div>
                <NavBar handleLogout={this.handleLogout} />
                <SubNavBar />
                <div className='container d-flex flex-wrap justify-content-center'>
                  {movies.map((m) => (
                    <MovieCard key={m._id} movie={m} />
                  ))}
                </div>
              </div>
            );
          }}
        />
        <Route path='/register' render={() => <RegistrationView />} />
        <Route path='/profile' render={() => <ProfileView />} />
        <Route
          exact
          path='/directors/:directorName'
          render={({ match }) => (
            <DirectorView
              movie={movies.find(
                (m) => m.Director.Name === match.params.directorName
              )}
            />
          )}
        />
        <Route
          exact
          path='/genres/:genreName'
          render={({ match }) => (
            <GenreView
              movie={movies.find(
                (m) => m.Genre.Name === match.params.genreName
              )}
            />
          )}
        />
        <Route
          exact
          path='/movies/:movieId'
          render={({ match }) => (
            <MovieView
              movie={movies.find((m) => m._id === match.params.movieId)}
            />
          )}
        />
      </div>
    );
  }
}

export default MainView;
