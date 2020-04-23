import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-wrap">
      <Link to="/cars" className="home-cars">
        Cars
      </Link>
      <Link to="items" className="home-items">
        Classifieds
      </Link>
    </div>
  );
}

export default Home;
