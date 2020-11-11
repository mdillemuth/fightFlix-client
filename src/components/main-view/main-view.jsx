import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import axios from 'axios';

class MainView extends Component {
  constructor() {
    super();
    // Initialize state
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
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

  render() {
    // State
    const { movies, selectedMovie, user } = this.state;

    // Renders LoginView if no user
    // If there is a user, user details are passed as a prop to LoginView
    if (!user)
      return <LoginView handleLoggedIn={(user) => this.handleLoggedIn(user)} />;

    // Before movies have loaded
    if (!movies) return <div className='main-view' />;

    return (
      // Returns either movie's list or movie view
      <div className='main-view'>
        {selectedMovie ? (
          <MovieView movie={selectedMovie} onReturn={this.handleReturn} />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => this.handleMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
