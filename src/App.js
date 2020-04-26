import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './Components/MainHeader/MainHeader';
import MainFooter from './Components/MainFooter/MainFooter';
import Home from './Components/Home/Home';
import Cars from './Components/Cars/Cars';
import CarDetails from './Components/CarDetails/CarDetails';
import Items from './Components/Items/Items';
// import Sidebar from './Components/Sidebar/Sidebar';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import Sell from './Components/Sell/Sell';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <div className="main-body">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cars" component={Cars} />
          <Route exact path="/cars/:id" component={CarDetails} />
          <Route exact path="/items" component={Items} />
          <Route path="/items/:id" component={ItemDetails} />
          <Route path="/sell" component={Sell} />
        </Switch>
      </div>
      <MainFooter />
    </div>
  );
}

export default App;
