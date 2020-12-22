import React from 'react';
import spinner from './../../assets/img/spinner.gif';

const LoadingSpinner = (props) => {
  const { show } = props;

  if (show) {
    return (
      <div>
        <img
          src={spinner}
          style={{ width: '75px', margin: 'auto', display: 'block' }}
          alt='Loading...'
        />
      </div>
    );
  } else {
    return null;
  }
};

export default LoadingSpinner;
