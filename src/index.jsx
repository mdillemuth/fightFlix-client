import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className='fightFlix'>
        <div>¡Buenos días!</div>
      </div>
    );
  }
}

const root = document.getElementById('root');

ReactDOM.render(React.createElement(App), root);

export default App;
