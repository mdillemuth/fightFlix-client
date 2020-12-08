// Import components
import React, { Component, useState } from 'react';
import MovieCard from '../movie-card/movie-card';

// Import styling
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

// Import routing
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProfileView extends Component {
  constructor(props) {
    console.log('constructor');

    super(props);
    this.state = {
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newBirthday: '',
      validated: false,
      favoriteMovies: [],
    };
  }

  async componentDidMount() {
    const favoriteMovies = await this.getFavoriteMovies();
    this.setState({
      favoriteMovies,
    });
    this.setState({
      userData: this.props.userData,
    });
  }

  getFavoriteMovies() {
    const favoriteMovies = this.props.userData.map((x) => x.FavoriteMovies)[0];
    return favoriteMovies;
  }

  formatFavoriteMovies = () => {
    const { movies } = this.props;
    const { favoriteMovies } = this.state;
    const numFavorites = favoriteMovies.length;

    if (numFavorites === 0) {
      return (
        <h3 className='text-dark text-center font-weight-bold h5 mt-4'>
          You Don't Have Any <span className='text-primary'>Favorite</span>{' '}
          Movies!
        </h3>
      );
    } else {
      return (
        <React.Fragment>
          <h3 className='text-dark text-center font-weight-bold h5 mt-4'>
            My <span className='text-primary'>{numFavorites} Favorite</span>{' '}
            Movies
          </h3>
          <div className='container d-flex flex-wrap justify-content-center'>
            {favoriteMovies.map((i) => (
              <div>
                <MovieCard key={i} movie={movies.find((m) => m._id === i)} />
                <Button
                  size='sm'
                  className='btn btn-warning'
                  onClick={() => this.handleRemoveFavorite(i)}
                >
                  Remove Favorite
                </Button>
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    }
  };

  // Adds input data to state
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Remove account and log out user, returning to loginView
  handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://my-fight-flix.herokuapp.com/api/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('account deleted');
      })
      .catch((e) => console.log('error'));

    this.props.handleLogout();
  };

  // Removes favorite movie
  // *****TODO****** Reload profileView with updated list of favorites
  handleRemoveFavorite = (movieId) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(
        `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log('favorite removed');
      })
      .catch((e) => console.log('error'));
  };

  // *** DOES NOT WORK ***
  // The authorization header is not getting received by the server
  // Seems to be related to pre-flight (OPTIONS) request
  // Access-Control-Allow-Headers does not accept the auth header for some reason
  handleUpdateAccount = (e) => {
    // Validation
    // const form = e.currentTarget;
    // if (!form.checkValidity()) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    // this.setState({
    //   validated: true,
    // });

    // // Timer to remove validation styling
    // setTimeout(() => {
    //   this.setState({
    //     validated: false,
    //   });
    // }, 8000);

    e.preventDefault();

    // Credentials to access API route
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Form data for new user information
    const { newUsername, newPassword, newEmail, newBirthday } = this.state;

    axios
      .put(`https://my-fight-flix.herokuapp.com/api/users/${username}`, {
        // ***The Authorization header is not getting through on pre-flight***
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthday,
        },
      })
      .then((res) => {
        console.log('updated');
        window.open('/', '_self');
      })
      .catch((e) => console.log('update error'));
  };

  render() {
    // Using data from state
    const { validated } = this.state;

    return (
      <React.Fragment>
        <Container className='my-3'>
          <Link to='/'>
            <Button className='btn btn-primary'>Back to Movies</Button>
          </Link>
          <Col
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
            className='bg-white rounded p-3'
          >
            <div className='mb-2'>
              <h2 className='text-left h5 text-dark font-weight-bold mb-1'>
                Update Your Information
              </h2>
              <small className='text-left text-dark font-italic'>
                You are currently logged in as{}
                <span className='text-primary'>{}</span>
              </small>
            </div>
            <Form
              className='mb-2'
              noValidate
              validated={validated}
              onSubmit={this.handleUpdateAccount}
            >
              <Form.Group className='mb-2' controlId='registerUsername'>
                <Form.Control
                  type='text'
                  placeholder='New username'
                  name='newUsername'
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please choose a username
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-2' controlId='registerEmail'>
                <Form.Control
                  type='email'
                  placeholder='New email'
                  name='newEmail'
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter a valid email address
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-2' controlId='registerPassword'>
                <Form.Control
                  type='password'
                  placeholder='New password'
                  name='newPassword'
                  onChange={this.handleInputChange}
                  required
                  minLength='7'
                />
                <Form.Control.Feedback type='invalid'>
                  Password must be at least 7 characters long
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='registerBirthday' className='mb-2 '>
                <Form.Label className='mb-1 text-muted font-weight-bold'>
                  Birthday
                </Form.Label>
                <Form.Control
                  type='date'
                  name='newBirthday'
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter your birthday
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Button variant='primary' type='submit' className='w-100 btn-lg'>
                Submit
              </Button>
            </Form>
            <small className='text-muted text-center d-block'>
              Or you can{' '}
              <Link to='/'>
                <span
                  className='register text-primary'
                  onClick={this.handleRemoveAccount}
                >
                  remove your account
                </span>
              </Link>
            </small>
          </Col>

          {this.formatFavoriteMovies()}
        </Container>
      </React.Fragment>
    );
  }
}

export default ProfileView;
