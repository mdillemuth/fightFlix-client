import React from 'react';
import NavBar from '../layout/NavBar';
import MovieCard from '../movie-card/movie-card';

const ProfileView = ({ user, movies }) => {
  return (
    <div>
      <NavBar />
      <h1>Profile View</h1>
      <p>Logged in as: {user.Username}</p>

      {user.FavoriteMovies.map((i) => (
        <MovieCard key={i} movie={movies.find((m) => m._id === i)} />
      ))}
    </div>
  );
};

export default ProfileView;
