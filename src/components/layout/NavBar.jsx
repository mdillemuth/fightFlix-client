import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NavBar = () => {
  return (
    <React.Fragment>
      <Navbar
        bg='white'
        className='d-flex justify-content-between align-items-center px-3'
      >
        <Navbar.Brand className='text-dark font-italic h2 font-weight-bold p-0 m-0'>
          my<span className='text-primary'>Fight</span>Flix
        </Navbar.Brand>
        <Button>Profile</Button>
      </Navbar>
      <Navbar
        bg='dark'
        className='d-flex justify-content-center align-items center'
      >
        <DropdownButton
          size='sm'
          className='mr-2'
          id='dropdown-filter'
          title='Filter'
        >
          <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
          <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          size='sm'
          variant='outline-light'
          className='ml-2'
          id='dropdown-sort'
          title='Sort'
        >
          <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
          <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
        </DropdownButton>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
