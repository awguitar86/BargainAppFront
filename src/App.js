import React from 'react';
import './App.css';
import BargainLogo from './images/BargainLogo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={BargainLogo} alt="bargain logo" style={{width: "500px", height: "auto"}}/>
      </header>
    </div>
  );
}

export default App;
