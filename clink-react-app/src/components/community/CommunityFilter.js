import React, { useState } from 'react';
import '../../styles/CommunityFilter.scss';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function CommunityFilter({ filter, setFilter }) {
  return (
    <div className="CommunityFilterContainer">
      <DropdownButton
        variant="outline-primary"
        size="sm"
        title={filter === 1 ? '최신순' : '인기순'}
        id="bg-nested-dropdown"
        menuProps={{ className: 'community-filter-dropdown' }}
      >
        <Dropdown.Item eventKey="1" onClick={() => setFilter(1)}>
          최신순
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => setFilter(2)}>
          인기순
        </Dropdown.Item>
      </DropdownButton>
      <div className="CommunityTagList">
        <Button variant="primary" size="sm">
          #안녕
        </Button>{' '}
        <Button variant="primary" size="sm">
          #집가고싶다
        </Button>{' '}
        <Button variant="primary" size="sm">
          #안녕
        </Button>{' '}
      </div>
    </div>
  );
}
