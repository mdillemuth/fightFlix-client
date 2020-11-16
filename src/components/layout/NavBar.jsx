import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NavBar = ({ handleLogout }) => {
  return (
    <React.Fragment>
      <Navbar
        bg='white'
        className='d-flex justify-content-between align-items-center px-3'
      >
        <Navbar.Brand className='text-dark font-italic h2 font-weight-bold p-0 m-0'>
          my<span className='text-primary'>Fight</span>Flix
        </Navbar.Brand>
        <div>
          <Button className='mr-1'>Profile</Button>
          <Button
            onClick={handleLogout}
            className='ml-1'
            variant='outline-primary'
          >
            Logout
          </Button>
        </div>
      </Navbar>
      <Navbar
        bg='dark'
        className='d-flex justify-content-center align-items center'
      >
        <div>
          <DropdownButton
            className='mr-2'
            id='dropdown-filter'
            title='Filter By'
          >
            <Dropdown.Item>Genre</Dropdown.Item>
            <Dropdown.Item>Director</Dropdown.Item>
          </DropdownButton>
        </div>

        <DropdownButton
          variant='outline-light'
          className='ml-2'
          id='dropdown-sort'
          title='Sort By'
        >
          <Dropdown.Item>Most Popular</Dropdown.Item>
          <Dropdown.Item>Least Popular</Dropdown.Item>
          <Dropdown.Item>Most Recent</Dropdown.Item>
          <Dropdown.Item>Oldest</Dropdown.Item>
          <Dropdown.Item>
            Title <span className='font-italic'>(A-to-Z)</span>
          </Dropdown.Item>
          <Dropdown.Item>
            Title <span className='font-italic'>(Z-to-A)</span>
          </Dropdown.Item>
        </DropdownButton>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
