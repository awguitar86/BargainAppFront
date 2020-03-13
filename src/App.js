import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './Components/MainHeader/MainHeader';
import MainFooter from './Components/MainFooter/MainFooter';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <div className="main-body">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
      <MainFooter />
    </div>
  );
}

export default App;
