import React from 'react';
import './mainHeader.scss';
import BargainLogo from '../../images/BargainLogo.svg';
import { Link } from 'react-router-dom';

function MainHeader() {
  return (
    <div className="main-header">
      <div className="main-header-wrap">
        <Link to="/" className="bargain-logo">
          <img src={BargainLogo} alt="Bargain Logo" />
        </Link>
        <nav className="main-nav">
          <Link to="/cars">Cars</Link>
          <Link to="/items">Classifieds</Link>
          <Link to="/sell">Sell</Link>
        </nav>
      </div>
    </div>
  );
}

export default MainHeader;
