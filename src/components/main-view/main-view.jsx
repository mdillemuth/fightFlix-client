import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import axios from 'axios';
import NavBar from './../layout/NavBar';

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      hasAccount: true,
    };
  }

  // componentDidMount() {
  //   axios
  //     .get('https://my-fight-flix.herokuapp.com/api/movies')
  //     .then((res) => {
  //       this.setState({
  //         movies: res.data,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  // Authentication
  // Updates 'user' in state on successful user login
  handleLoggedIn = (authData) => {
    console.log(authData);

    this.setState({
      user: authData.user.Username,
    });

    // Storing token in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  };

  // Changes to MovieView (of selected movie) from MainView
  handleMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
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

  // Returns to MainView from MovieView
  handleReturn = () => {
    this.setState({
      selectedMovie: null,
    });
  };

  // Handler to navigate to RegistrationView from LoginView
  handleRegister = () => {
    this.setState({
      hasAccount: false,
    });
  };

  // Handler to return to LoginView from RegistrationView
  handleReturnLogin = () => {
    this.setState({
      hasAccount: true,
    });
  };

  // Logout
  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
      user: null,
    });
  };

  render() {
    // State
    const { movies, selectedMovie, user, hasAccount } = this.state;

    // Goes to RegistrationView on click of 'Register new account' btn
    if (!hasAccount) {
      return <RegistrationView onReturnLogin={this.handleReturnLogin} />;
    }

    // Renders LoginView if no user
    // If there is a user, user details are passed as a prop to LoginView
    if (!user)
      return (
        <LoginView
          handleLoggedIn={(data) => this.handleLoggedIn(data)}
          onRegister={this.handleRegister}
        />
      );

    // Before movies have loaded
    if (!movies) return <div className='main-view' />;

    return (
      <div>
        {selectedMovie ? (
          <MovieView movie={selectedMovie} onReturn={this.handleReturn} />
        ) : (
          <React.Fragment>
            <NavBar handleLogout={this.handleLogout} />
            <div className='container d-flex flex-wrap justify-content-center'>
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={() => this.handleMovieClick(movie)}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MainView;
