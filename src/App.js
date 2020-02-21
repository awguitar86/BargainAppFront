import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './Components/MainHeader/MainHeader';
import MainFooter from './Components/MainFooter/MainFooter';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <MainFooter />
    </div>
  );
}

export default App;
