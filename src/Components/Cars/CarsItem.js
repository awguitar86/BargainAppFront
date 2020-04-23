import React from 'react';
import './cars.scss';
import { Link } from 'react-router-dom';

function CarsItem(props) {
  const { id, imageUrls, title, price, mileage, location } = props;

  return (
    <Link to={`/cars/${id}`} className="car-item">
      <div className="car-image-wrap">
        <img
          src={`http://178.128.180.91:8080/${imageUrls[0]}`}
          alt="car"
          className="car-img"
        />
      </div>
      <ul className="car-info">
        <li className="car-info-item car-title">{title}</li>
        <li className="car-info-item car-price">${price}</li>
        <li className="car-info-item car-mileage">Mileage: {mileage}</li>
        <li className="car-info-item car-location">{location}</li>
      </ul>
    </Link>
  );
}

export default CarsItem;
