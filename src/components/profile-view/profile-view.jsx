// Import components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      userData: {},
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newConfirmPassword: '',
      newBirthday: '',
      validated: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.getUser(token);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://my-fight-flix.herokuapp.com/api/users/${username}`, config)
      .then((res) => {
        res.data.map((item) => {
          this.setState({
            userData: item,
          });
        });
      })
      .catch((e) => console.log('Error Retrieving User Data'));
  }

  // Handler for form input
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Remove account and log out user, return to loginView
  handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    if (window.confirm('Are you sure you wish to remove your account?')) {
      axios
        .delete(`https://my-fight-flix.herokuapp.com/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('account deleted');
        })
        .catch((e) => console.log('error'));

      this.props.handleLogout();
    } else {
      window.open('/profile', '_self');
    }
  };

  // Update account and log out user, return to loginView
  handleUpdateAccount = (e) => {
    const form = e.currentTarget;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const {
      newUsername,
      newPassword,
      newConfirmPassword,
      newEmail,
      newBirthday,
    } = this.state;

    // Returns if passwords do not match
    if (newPassword !== newConfirmPassword) {
      return alert('Passwords do not match');
    }

    // Validates form inputs
    if (!form.checkValidity()) {
      console.log('Invalid input, form not submitted');
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({
      validated: true,
    });

    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Only calls API if form passes client-side validation
    if (form.checkValidity()) {
      axios
        .put(
          `https://my-fight-flix.herokuapp.com/api/users/${username}`,
          {
            Username: newUsername,
            Password: newPassword,
            Email: newEmail,
            Birthday: newBirthday,
          },
          config
        )
        .then((res) => {
          console.log('Account Updated');
          window.open('/', '_self');
          this.props.handleLogout();
        })
        .catch((e) => console.log('Update Error'));
    }
  };

  render() {
    const { userData, validated } = this.state;
    if (!userData) return null;

    return (
      <React.Fragment>
        <Container className='my-3'>
          <div className='w-100 d-flex flex-column align-items-center mb-3'>
            <Link to='/'>
              <Button className='btn btn-primary'>Back to Movies</Button>
            </Link>
          </div>
          <Col
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
            className='bg-white rounded p-3'
          >
            <div className='mb-2'>
              <h2 className='text-left h5 text-dark font-weight-bold mb-1'>
                Update Your Information
              </h2>
            </div>
            <Form
              noValidate
              validated={validated}
              className='mb-2'
              onSubmit={this.handleUpdateAccount}
            >
              <Form.Group className='mb-2' controlId='registerUsername'>
                <Form.Control
                  autoFocus
                  type='text'
                  placeholder='New username'
                  name='newUsername'
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Please enter a username
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-2' controlId='registerEmail'>
                <Form.Control
                  type='email'
                  placeholder='New email'
                  name='newEmail'
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Please enter a valid email address
                </Form.Control.Feedback>
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Password must be at least 7 characters
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-2' controlId='registerConfirmPassword'>
                <Form.Control
                  type='password'
                  placeholder='Confirm new password'
                  name='newConfirmPassword'
                  onChange={this.handleInputChange}
                  required
                  minLength='7'
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Password must be at least 7 characters
                </Form.Control.Feedback>
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  Birthday is required
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant='primary' type='submit' className='w-100 btn-lg'>
                Submit
              </Button>
            </Form>
            <small className='text-muted text-center d-block'>
              Or you can{' '}
              <Link to='/'>
                <span
                  style={{ cursor: 'pointer' }}
                  className='register text-primary'
                  onClick={this.handleRemoveAccount}
                >
                  remove your account
                </span>
              </Link>
            </small>
          </Col>
        </Container>
      </React.Fragment>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default ProfileView;
