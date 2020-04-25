import React, { useState } from 'react';
import './mainHeader.scss';
import BargainLogo from '../../images/BargainLogo.svg';
import HamMenu from '../../images/hamMenu.svg';
import { Link } from 'react-router-dom';

function MainHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const handleHamMenu = () => {
    setShowMenu(!showMenu ? true : false);
  };

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
        <nav className="ham-menu">
          <button className="ham-menu-btn" onClick={handleHamMenu}>
            {!showMenu ? <img src={HamMenu} alt="hambuger menu" /> : <h1>X</h1>}
          </button>
        </nav>
      </div>
      <nav className={showMenu ? 'show-menu' : 'hide-menu'}>
        <Link to="/cars" onClick={handleHamMenu}>
          Cars
        </Link>
        <Link to="/items" onClick={handleHamMenu}>
          Classifieds
        </Link>
        <Link to="/sell" onClick={handleHamMenu}>
          Sell
        </Link>
      </nav>
    </div>
  );
}

export default MainHeader;
