// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { fetchMovies } from '../../store/movies';
import { fetchUser } from '../../store/user';

// UI Components
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from './../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import NavBar from '../common/NavBar';
import NotFound from '../not-found/not-found';

class MainView extends Component {
  componentDidMount() {
    const accessToken = localStorage.getItem('token');

    // Calls API for movies & user when auth token is present
    if (accessToken !== null) {
      this.props.fetchMovies();
      this.props.fetchUser();
    }
  }

  render() {
    const { user } = this.props;

    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/directors/:directorName' component={DirectorView} />
          <Route path='/genres/:genreName' component={GenreView} />
          <Route path='/movies/:movieId' component={MovieView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/register' component={RegistrationView} />
          <Route
            path='/'
            render={() => {
              // Shows login page unless there is a logged in user
              return !user ? <LoginView /> : <MoviesList />;
            }}
          />
          <Route path='/not-found' component={NotFound} />
          <Redirect to='/not-found' />
        </Switch>
      </BrowserRouter>
    );
  }
}

MainView.propTypes = {
  user: PropTypes.object,
};

// API calls for retrieving user & movies
const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMovies()),
  fetchUser: () => dispatch(fetchUser()),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

//   if (this.state.favoriteMovies.indexOf(movieId) > -1) {
//     return console.log('Movie already in favorites');
//   }

//   if (this.state.favoriteMovies.indexOf(movieId) === -1) {
//     return console.log('Movie not in favorites');
//   }
