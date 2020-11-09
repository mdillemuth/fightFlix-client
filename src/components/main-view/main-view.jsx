import React, { Component } from 'react';
import axios from 'axios';

class MainView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios
      .get('https://my-fight-flix.herokuapp.com/api/movies')
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { movies } = this.state;

    if (!movies) return <div className='main-view' />;

    return (
      <div className='main-view'>
        {movies.map((movie) => (
          <div className='movie-card' key={movie._id}>
            {movie.Title}
          </div>
        ))}
      </div>
    );
  }
}

export default MainView;
