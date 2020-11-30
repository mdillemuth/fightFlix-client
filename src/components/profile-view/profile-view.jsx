// Import components
import React, { useState } from 'react';
import NavBar from '../layout/NavBar';
import MovieCard from '../movie-card/movie-card';

// Import styling
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

// Import routing
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileView = ({ user, movies, handleLogout }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthday: '',
  });

  const { username, email, password, birthday } = formData;

  // State for form validation
  const [validated, setValidated] = useState(false);

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

  const token = localStorage.getItem('token');

  // Handler for form input
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const removeAccount = () => {
    axios
      .delete(
        `https://my-fight-flix.herokuapp.com/api/users/${user.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log('account deleted');
      })
      .catch((e) => console.log('error'));
  };

  const handleUpdate = () => {
    // e.preventDefault();

    axios
      .put(`https://my-fight-flix.herokuapp.com/api/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${token}` },
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((res) => {
        console.log('updated');
      })
      .catch((e) => console.log('update error'));
  };

  return (
    <div>
      <NavBar handleLogout={handleLogout} />

      <Container className='my-3'>
        <Col
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className='bg-white rounded p-3'
        >
          {/* Update User Information  */}
          <div className='mb-2'>
            <h2 className='text-left h5 text-dark font-weight-bold mb-1'>
              Update Your Information
            </h2>
            <small className='text-left text-dark font-italic'>
              You are currently logged in as{' '}
              <span className='text-primary'>{user.Username}</span>
            </small>
          </div>
          <Form
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
          </small>
        </Col>
      </Container>

      <h3 className='text-dark h5'>My Favorite Movies</h3>
      <div className='container d-flex flex-wrap justify-content-center'>
        {user.FavoriteMovies.map((i) => (
          <MovieCard key={i} movie={movies.find((m) => m._id === i)} />
        ))}
      </div>

      {/* <Button className='ml-auto btn btn-warning'>Remove Favorite</Button> */}

      {/* <Link to='/'> */}
      {/* <Button className='ml-auto btn btn-primary'>Back to Movies</Button> */}
      {/* </Link> */}
    </div>
  );
};

export default ProfileView;
