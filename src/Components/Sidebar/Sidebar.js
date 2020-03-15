import React, { useState, useEffect } from 'react';
import './sidebar.scss';
import BargainLogo from '../../images/BargainLogo.svg';

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={BargainLogo} alt="bargain logo" className="bargain-logo" />
    </div>
  );
}

export default Sidebar;
