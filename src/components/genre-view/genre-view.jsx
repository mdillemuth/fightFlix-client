import React from 'react';
import MovieCard from './../movie-card/movie-card';

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

const GenreView = ({ movie, other }) => {
  return (
    <React.Fragment>
      <div className='container'>
        <div className='row bg-white rounded m-3 p-3'>
          <div className='col d-flex flex-column align-items-center justify-content-between'>
            <span className='h4 text-primary font-weight-semi-bold mb-2'>
              {movie.Genre.Name}
            </span>
            <span className='mb-3'>
              <span className='font-weight-bold'>Description:</span>{' '}
              {movie.Genre.Description}
            </span>
            <Link to='/'>
              <Button className='ml-auto btn btn-primary'>
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>

        <h2 className='h5 text-dark text-center mb-1 font-weight-semi-bold'>
          Other movies in the genre{' '}
          <span className='text-primary'>{movie.Genre.Name}</span>
        </h2>
        <div className='container d-flex flex-wrap justify-content-center'>
          {other.map((o) => (
            <MovieCard key={o._id} movie={o} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenreView;
