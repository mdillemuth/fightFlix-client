import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import axios from 'axios';

class MainView extends Component {
  constructor() {
    super();
    // Initialize state
    this.state = {
      movies: null,
      selectedMovie: null,
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  render() {
    // State
    const { movies, selectedMovie } = this.state;

    // Before movies have loaded
    if (!movies) return <div className='main-view' />;

    return (
      // Returns either movie's list or movie view
      <div className='main-view'>
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
