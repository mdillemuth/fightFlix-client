import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import axios from 'axios';

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

  componentDidMount() {
    axios
      .get('https://my-fight-flix.herokuapp.com/api/movies')
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch((error) => console.log(error));
  }

  // Changes to MovieView (of selected movie) from MainView
  handleMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  // Returns to MainView from MovieView
  handleReturn = () => {
    this.setState({
      selectedMovie: null,
    });
  };

  // Updates 'user' in state on successful user login
  handleLoggedIn = (user) => {
    this.setState({
      user,
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
          handleLoggedIn={(user) => this.handleLoggedIn(user)}
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
          <div className='container d-flex flex-wrap justify-content-center'>
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onClick={() => this.handleMovieClick(movie)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MainView;
