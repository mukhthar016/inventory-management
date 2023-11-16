import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ toggleDeleteItem }) => {
  const buttonStyle = {
    width: '150px', // Set the desired width
    height: '40px', // Set the desired height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <ul className='list'>
      <li>
        <button style={buttonStyle}>
          <Link to="/" className="nav-button">Inventory</Link>
        </button>
      </li>
      <li>
        <button style={buttonStyle}>
          <Link to="/add" className="nav-button">Add Item</Link>
        </button>
      </li>
      <li>
        <button style={buttonStyle}>
          <Link to="/purchases" className="nav-button">Customer Purchases</Link>
        </button>
      </li>
    </ul>
  );
};

export default Navigation;

