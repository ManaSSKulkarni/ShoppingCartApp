import React from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import cartlogo from './cartlogo.png';

const headerStyle = {
    background : 'skyblue',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoTextContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const imgStyle = {
  height: '120px',
  width: '120px',
  marginRight: '20px', 
  border: '5px solid #ffcc00', 
  borderRadius: '50%', // Rounded image
  boxShadow: '0px 0px 10px yellow', // Glowing shadow
  cursor: 'pointer'
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const h1Style = {
  color: '#ffcc00', 
  fontFamily: 'Roboto, sans-serif',
  fontSize: '36px', 
  fontWeight: '700', 
  textTransform: 'uppercase',
  letterSpacing: '2px', 
  textShadow: '2px 2px 4px blue', 
  margin: '0', 
};

const h2Style = {
  color: 'darkblue',
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '18px', 
  fontStyle: 'italic',
  margin: '5px 0 0 0', 
  letterSpacing: '1px', 
  textDecoration: 'none', // no underline is present
};

function Header(props) {

  const navigate=useNavigate()
  const handleClick = () => {
    navigate('/mycart');
  };

  return (
    <header style={headerStyle}>
      <div style={logoTextContainerStyle}>
        <img src={cartlogo} style={imgStyle} className="App-logo" alt="logo" onClick={handleClick}/>
        <div style={textContainerStyle}>
          <h1 style={h1Style}>MYCART</h1>
          <h2 style={h2Style}>{props.title}</h2>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

Header.defaultProps = {
  title: 'PAGE TITLE',
};

export default Header;
