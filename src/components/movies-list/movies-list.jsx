import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';

class MoviesList extends Component {
  render() {
    const { movies } = this.props;
    const count = movies.length;

    return !movies ? (
      <div>Loading Movies</div>
    ) : (
      <div>
        <h2 className='my-1 h3 text-dark text-center'>
          Choose from <span className='text-primary'>{count}</span> exciting
          movies
        </h2>
        <div className='container d-flex flex-wrap justify-content-center'>
          {movies.map((m) => (
            <MovieCard key={m._id} movie={m} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps)(MoviesList);
