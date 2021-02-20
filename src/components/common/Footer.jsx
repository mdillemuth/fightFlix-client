import React from 'react';

export default function Footer() {
  return (
    <div className='footer bg-secondary p-3'>
      <h6 className='text-center text-light my-0'>
        Copyright &copy; 2021 | Matt Dillemuth
      </h6>
      <div className='text-center my-0'>
        <a
          className='text-primary'
          href='https://mattdillemuth.com'
          target='_blank'
          rel='noreferrer'
        >
          mattdillemuth.com
        </a>
      </div>
    </div>
  );
}
