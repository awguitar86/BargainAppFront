import React from 'react';
import './items.scss';
import { Link } from 'react-router-dom';

function ItemsItem(props) {
  const { id, imageUrl, title, price, location } = props;

  return (
    <Link to={`/items/${id}`} className="items-item">
      <div className="item-image-wrap">
        <img
          src={`http://localhost:8080/${imageUrl}`}
          alt="item"
          className="item-img"
        />
      </div>
      <ul className="item-info">
        <li className="item-info-item item-title">{title}</li>
        <li className="item-info-item item-price">${price}</li>
        <li className="item-info-item item-location">{location}</li>
      </ul>
    </Link>
  );
}

export default ItemsItem;
