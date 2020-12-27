import React from 'react';
// Redux
import { connect } from 'react-redux';
import { setFilter } from '../../store/movies';

import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SubNavBar = ({ movies, setFilter }) => {
  return (
    <Navbar bg='dark'>
      <InputGroup>
        <Form.Control
          onChange={(e) => setFilter(e.target.value)}
          // value={props.visibilityFilter}
          placeholder='Filter Movies'
          aria-label='Movies Filter'
        />
      </InputGroup>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (input) => dispatch(setFilter(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubNavBar);

{
  /* <div>
<DropdownButton className='mr-2' id='dropdown-filter' title='Filter By'>
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
</DropdownButton> */
}
