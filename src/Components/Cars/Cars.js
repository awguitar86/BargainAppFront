import React, { useState, useEffect } from 'react';
import './cars.scss';
import CarsItem from './CarsItem';
import axios from 'axios';
import Select from 'react-select';

const makeOptions = [
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Lotus', label: 'Lotus' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Hyundai', label: 'Hyundai' },
  { value: 'Honda', label: 'Honda' },
  { value: 'Kia', label: 'Kia' },
  { value: 'GMC', label: 'GMC' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
];

function Cars() {
  const [carData, setCarData] = useState([]);
  const [make, setMake] = useState({});

  useEffect(() => {
    axios.get('https://bargainapp.dev/cars').then((res) => {
      console.log(res.data.cars);
      setCarData(res.data.cars);
    });
  }, []);

  const handleSelectMake = (selected) => {
    console.log(selected);
    setMake(selected);
  };

  const updateSelecttion = () => {
    axios
      .get(`https://bargainapp.dev/cars/make/${make.value}`)
      .then((res) => {
        console.log(res.data.cars);
        setCarData(res.data.cars);
      })
      .catch((err) => {
        throw err;
      });
  };

  const displayCars = !carData
    ? null
    : carData.map((car) => {
        return (
          <CarsItem
            key={car._id}
            id={car._id}
            year={car.year}
            make={car.make}
            model={car.model}
            price={car.price}
            mileage={car.mileage}
            location={car.location}
            imageUrls={car.imageUrls}
            imageUrl={car.imageUrl}
          />
        );
      });

  return (
    <div className="cars-wrap">
      <div className="cars-header">
        <h2>Cars</h2>
        <Select
          placeholder="Select Make..."
          className="select"
          options={makeOptions}
          onChange={handleSelectMake}
        />
        <button onClick={updateSelecttion} className="update-select-btn">
          Update
        </button>
      </div>
      <div className="cars-items-wrap">{displayCars}</div>
    </div>
  );
}

export default Cars;
