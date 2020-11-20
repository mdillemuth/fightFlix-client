import React from 'react';
import NavBar from './../layout/NavBar';
import Button from 'react-bootstrap/Button';
import MovieCard from './../movie-card/movie-card';

import { Link } from 'react-router-dom';

const GenreView = ({ movie, other }) => {
  return (
    <React.Fragment>
      <NavBar />
      <h1>{movie.Genre.Name}</h1>
      <h2>{movie.Genre.Description}</h2>
      <h3>Other movies with this genre:</h3>
      {other.map((o) => (
        <MovieCard key={o._id} movie={o} />
      ))}
      <Link to='/'>
        <Button className='ml-auto btn btn-primary'>Back to Movies</Button>
      </Link>
    </React.Fragment>
  );
};

export default GenreView;
