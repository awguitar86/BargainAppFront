import React, { useState } from 'react';
import './sell.scss';
import NewCar from './NewCar';
import NewItem from './NewItem';

function Sell() {
  const [isCar, setIsCar] = useState(false);
  const [isItem, setIsItem] = useState(false);

  const handleIsCar = () => {
    setIsCar(!isCar ? true : false);
    setIsItem(false);
  };
  const handleIsItem = () => {
    setIsItem(!isItem ? true : false);
    setIsCar(false);
  };

  const style = {
    height: '100vh',
  };

  return (
    <div className="sell-wrap" style={isCar || isItem ? {} : style}>
      <div className="sell-type-btns">
        <button onClick={handleIsCar}>Car Listing</button>
        <button onClick={handleIsItem}>Classifieds Listing</button>
      </div>
      {isCar ? <NewCar /> : isItem ? <NewItem /> : null}
    </div>
  );
}

export default Sell;
