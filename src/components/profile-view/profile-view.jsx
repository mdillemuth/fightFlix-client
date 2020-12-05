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
    super(props);
    this.state = {
      formData: {
        username: '',
        email: '',
        password: '',
        birthday: '',
      },
      user: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://my-fight-flix.herokuapp.com/api/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          user: res.data,
        });
      })
      .catch((error) => console.log(error));
  }

  // [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   birthday: '',
  // });

  // { username, email, password, birthday } = formData;

  // State for form validation
  // [validated, setValidated] = useState(false);

  // const handleValidation = (e) => {
  //   // Validation
  //   const form = e.currentTarget;
  //   if (!form.checkValidity()) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   setValidated(true);

  //   // Timer to remove validation styling
  //   setTimeout(() => {
  //     setValidated(false);
  //   }, 8000);
  // };

  // Handler for form input
  // onChange = (e) =>
  //   this.setState({ formData: [...e.target.name, e.target.value] });

  // setFormData({ ...formData, [e.target.name]: e.target.value });

  removeAccount = () => {
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://my-fight-flix.herokuapp.com/api/users/${this.state.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log('account deleted');
      })
      .catch((e) => console.log('error'));
  };

  removeFavorite = (movieId) => {
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://my-fight-flix.herokuapp.com/api/users/${this.state.Username}/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log('favorite removed');
      })
      .catch((e) => console.log('error'));
  };

  // Does not work because the user information is lost
  handleUpdate = () => {
    // e.preventDefault();

    axios
      .put(
        `https://my-fight-flix.herokuapp.com/api/users/${this.state.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        }
      )
      .then((res) => {
        console.log('updated');
      })
      .catch((e) => console.log('update error'));
  };

  render() {
    const username = this.state.user.map((x) => x.Username);

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
                You are currently logged in as{' '}
                <span className='text-primary'>{username}</span>
              </small>
            </div>
            {/* <Form
              className='mb-2'
              noValidate
              validated={validated}
              onSubmit={handleUpdate}
            >
              <Form.Group className='mb-2' controlId='registerUsername'>
                <Form.Control
                  type='text'
                  placeholder='New username'
                  name='username'
                  value={username}
                  onChange={onChange}
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
                  name='email'
                  value={email}
                  onChange={onChange}
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
                  name='password'
                  value={password}
                  onChange={onChange}
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
                  name='birthday'
                  placeholder='New birthday'
                  value={birthday}
                  onChange={onChange}
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
              <span className='register text-primary' onClick={removeAccount}>
                remove your account
              </span> 
            </small> */}
          </Col>

          <h3 className='text-dark text-center font-weight-bold h5 mt-4'>
            My <span className='text-primary'>Favorite</span> Movies
          </h3>
          {/* <div className='container d-flex flex-wrap justify-content-center'>
            {this.state.FavoriteMovies.map((i) => (
              <div>
                <MovieCard  
                  key={i}
                  movie={this.props.movies.find((m) => m._id === i)}
                />
                <Button
                  size='sm'
                  className='btn btn-warning'
                  onClick={() => removeFavorite(i)}
                >
                  Remove Favorite
                </Button>
              </div>
            ))}
          </div> */}
        </Container>
      </React.Fragment>
    );
  }
}

export default ProfileView;
