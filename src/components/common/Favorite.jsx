import React from 'react';

const Favorite = (props) => {
  let classes = 'text-warning fa fa-star';
  if (!props.isFavorite) classes += '-o';

  return (
    <i
      style={{ cursor: 'pointer', fontSize: '24px' }}
      onClick={props.onClick}
      className={classes}
      aria-hidden='true'
    />
  );
};

export default Favorite;
