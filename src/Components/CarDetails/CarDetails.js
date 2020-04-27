import React, { useState, useEffect } from 'react';
import './carDetails.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CarDetails(props) {
  const [carData, setCarData] = useState();

  useEffect(() => {
    axios
      .get(`http://178.128.180.91:8080/cars/${props.match.params.id}`)
      .then((res) => {
        console.log(res);
        setCarData(res.data.car);
      });
  }, [props.match.params.id]);

  console.log(carData);

  // const displayImages = !imageUrls
  //   ? null
  //   : imageUrls.map((image) => {
  //       return (
  //         <img src={`http://localhost:8080/${image}`} alt="car" key={} />
  //       );
  //     });

  if (carData) {
    const {
      _id,
      bodyType,
      color,
      condition,
      cylinders,
      description,
      doorCount,
      driveType,
      fuelType,
      location,
      make,
      mileage,
      model,
      price,
      sellerName,
      sellerPhone,
      titleType,
      transmission,
      vin,
      year,
      imageUrls,
      imageUrl,
    } = carData;

    return (
      <div className="car-details-wrap">
        <div className="car-left">
          <img
            src={`http://178.128.180.91:8080/${
              imageUrl ? imageUrl : imageUrls[0]
            }`}
            alt="car"
          />
          <div className="car-left-text">
            <h1>{`${year} ${make} ${model}`}</h1>
            <h2>${price}</h2>
            <h3>
              Seller Name:{' '}
              <span style={{ fontWeight: 'normal' }}>{sellerName}</span>
            </h3>
            <h3>
              Seller Phone:{' '}
              <span style={{ fontWeight: 'normal' }}>{sellerPhone}</span>
            </h3>
            <h3>{location}</h3>
            <h3>
              Description:{' '}
              <span style={{ fontWeight: 'normal' }}>{description}</span>
            </h3>
          </div>
        </div>
        <div className="car-specs">
          <h2>Specifications</h2>
          <div>
            <h3>Year:</h3>
            <p>{year}</p>
          </div>
          <div>
            <h3>Make:</h3>
            <p>{make}</p>
          </div>
          <div>
            <h3>Model:</h3>
            <p>{model}</p>
          </div>
          <div>
            <h3>Body:</h3>
            <p>{bodyType}</p>
          </div>
          <div>
            <h3>Mileage:</h3>
            <p>{mileage}</p>
          </div>
          <div>
            <h3>VIN:</h3>
            <p>{vin.toUpperCase()}</p>
          </div>
          <div>
            <h3>Title Type:</h3>
            <p>{titleType}</p>
          </div>
          <div>
            <h3>Color:</h3>
            <p>{color}</p>
          </div>
          <div>
            <h3>Transmission:</h3>
            <p>{transmission}</p>
          </div>
          <div>
            <h3>Cylinders:</h3>
            <p>{cylinders}</p>
          </div>
          <div>
            <h3>Fuel Type:</h3>
            <p>{fuelType}</p>
          </div>
          <div>
            <h3>Number of Doors:</h3>
            <p>{doorCount}</p>
          </div>
          <div>
            <h3>Condition:</h3>
            <p>{condition}</p>
          </div>
          <div>
            <h3>Drive Type:</h3>
            <p>{driveType}</p>
          </div>
          <div className="edit-btn-wrap">
            <Link to={`/edit-car/${_id}`}>Edit Car</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <h3>No Data</h3>;
  }
}

export default CarDetails;
