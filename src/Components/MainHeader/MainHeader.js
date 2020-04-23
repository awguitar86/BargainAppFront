import React from 'react';
import './mainHeader.scss';
import BargainLogo from '../../images/BargainLogo.svg';
import { Link } from 'react-router-dom';

function MainHeader() {
  return (
    <div className="main-header">
      <nav className="main-nav">
        <Link to="/">
          <img src={BargainLogo} alt="Bargain Logo" />
        </Link>
      </nav>
    </div>
  );
}

export default MainHeader;
