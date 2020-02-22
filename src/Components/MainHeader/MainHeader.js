import React from 'react';
import './mainHeader.scss';
// import { Link } from 'react-router-dom';
import BargainLogo from '../../images/BargainLogo.svg';

function MainHeader() {
  return (
    <div className="main-header">
      <nav className="main-nav">
        <img src={BargainLogo} alt="bargain logo" className="bargain-logo" />
      </nav>
    </div>
  );
}

export default MainHeader;
