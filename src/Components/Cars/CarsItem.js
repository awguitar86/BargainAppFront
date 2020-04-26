import React from 'react';
import './cars.scss';
import { Link } from 'react-router-dom';

function CarsItem(props) {
  const {
    id,
    imageUrls,
    imageUrl,
    year,
    make,
    model,
    price,
    mileage,
    location,
  } = props;

  return (
    <Link to={`/cars/${id}`} className="car-item">
      <div className="car-image-wrap">
        <img
          src={`http://localhost:8080/${imageUrls ? imageUrls[0] : imageUrl}`}
          alt="car"
          className="car-img"
        />
      </div>
      <ul className="car-info">
        <li className="car-info-item car-title">{`${year} ${make} ${model}`}</li>
        <li className="car-info-item car-price">${price}</li>
        <li className="car-info-item car-mileage">Mileage: {mileage}</li>
        <li className="car-info-item car-location">{location}</li>
      </ul>
    </Link>
  );
}

export default CarsItem;
