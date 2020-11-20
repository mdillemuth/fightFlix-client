import React, { Component } from 'react';
import NavBar from './../layout/NavBar';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

class DirectorView extends Component {
  render() {
    const { movie } = this.props;

    return (
      <React.Fragment>
        <NavBar />
        <h1>{movie.Director.Name}</h1>
        <p>{movie.Director.Bio}</p>
        <Link to='/'>
          <Button className='ml-auto btn btn-primary'>Back to Movies</Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default DirectorView;
