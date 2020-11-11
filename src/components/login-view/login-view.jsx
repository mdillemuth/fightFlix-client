import React, { useState } from 'react';

const LoginView = (props) => {
  // Initialize username/password with hooks
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    props.handleLoggedIn(username);
  };

  return (
    <div>
      <form>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='button' onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <button onClick={props.onRegister}>Register a new account</button>
    </div>
  );
};

export default LoginView;
