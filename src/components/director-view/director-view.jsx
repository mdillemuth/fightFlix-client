import React, { Component } from 'react';
import NavBar from './../layout/NavBar';
import Button from 'react-bootstrap/Button';
import MovieCard from './../movie-card/movie-card';

import { Link } from 'react-router-dom';

class DirectorView extends Component {
  render() {
    const { movie, other } = this.props;

    console.log(other);

    return (
      <React.Fragment>
        <NavBar />
        <h1>{movie.Director.Name}</h1>
        <p>Born in {movie.Director.Birth}</p>
        <p>Bio: {movie.Director.Bio}</p>
        <h2>Some movies from this director:</h2>
        {other.map((o) => (
          <MovieCard key={o._id} movie={o} />
        ))}
        <Link to='/'>
          <Button className='ml-auto btn btn-primary'>Back to Movies</Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default DirectorView;
