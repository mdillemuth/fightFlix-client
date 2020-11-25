// Import components
import React from 'react';
import NavBar from '../layout/NavBar';
import MovieCard from '../movie-card/movie-card';

// Import styling
import Button from 'react-bootstrap/Button';

// Import routing
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileView = ({ user, movies, handleLogout }) => {
  return (
    <div>
      <NavBar handleLogout={handleLogout} />
      <Link to='/'>
        <Button className='ml-auto btn btn-primary'>Back to Movies</Button>
      </Link>

      <h1>Profile View</h1>
      <p>Logged in as: {user.Username}</p>

      {user.FavoriteMovies.map((i) => (
        <React.Fragment>
          <MovieCard key={i} movie={movies.find((m) => m._id === i)} />
          <Button className='ml-auto btn btn-warning'>Remove Favorite</Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProfileView;
