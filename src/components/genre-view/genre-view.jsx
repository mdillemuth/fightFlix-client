import React from 'react';
import NavBar from './../layout/NavBar';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

const GenreView = ({ movie }) => {
  return (
    <React.Fragment>
      <NavBar />
      <h1>{movie.Genre.Name}</h1>
      <h2>{movie.Genre.Description}</h2>
      <Link to='/'>
        <Button className='ml-auto btn btn-primary'>Back to Movies</Button>
      </Link>
    </React.Fragment>
  );
};

export default GenreView;
