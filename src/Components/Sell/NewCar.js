import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './sell.scss';

function NewCar() {
  const [file, setFile] = useState();
  const [year, setYear] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [mileage, setMileage] = useState();
  const [bodyType, setBodyType] = useState();
  const [titleType, setTitleType] = useState();
  const [color, setColor] = useState();
  const [vin, setVin] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [doorCount, setDoorCount] = useState();
  const [cylinders, setCylinders] = useState();
  const [transmission, setTransmission] = useState();
  const [fuelType, setFuelType] = useState();
  const [driveType, setDriveType] = useState();
  const [condition, setCondition] = useState();
  const [sellerType, setSellerType] = useState();
  const [sellerName, setSellerName] = useState();
  const [sellerPhone, setSellerPhone] = useState();
  const [location, setLocation] = useState();
  const history = useHistory();

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
    console.log(e.target.files[0]);
  };

  console.log(file);

  const postCarListing = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    let url = 'https://bargainapp.dev/image';
    let method = 'POST';
    fetch(url, {
      method: method,
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Uploading file failed!');
        }
        return res.text();
      })
      .then((resData) => {
        console.log(resData);
        let data = {
          imageUrl: resData,
          description: description,
          year: year,
          make: make,
          model: model,
          bodyType: bodyType,
          mileage: mileage,
          vin: vin,
          titleType: titleType,
          color: color,
          transmission: transmission,
          cylinders: cylinders,
          fuelType: fuelType,
          doorCount: doorCount,
          condition: condition,
          driveType: driveType,
          price: price,
          location: location,
          sellerType: sellerType,
          sellerName: sellerName,
          sellerPhone: sellerPhone,
        };
        fetch('https://bargainapp.dev/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            // console.log(res);
            return res.json();
          })
          .then((resData) => {
            history.push(`/cars/${resData.car._id}`);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="new-car-wrap">
      <h1>Create Car Listing</h1>
      <div className="car-listing-form">
        <div className="car-general-info">
          <h3>General Information</h3>
          <label htmlFor="year">
            Year
            <input
              type="number"
              name="year"
              id="year"
              defaultValue={year}
              placeholder="Year"
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label htmlFor="make">
            Make
            <input
              type="text"
              name="make"
              id="make"
              defaultValue={make}
              placeholder="Make"
              onChange={(e) => setMake(e.target.value)}
            />
          </label>
          <label htmlFor="model">
            Model
            <input
              type="text"
              name="model"
              id="model"
              defaultValue={model}
              placeholder="Model"
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
          <label htmlFor="mileage">
            Mileage
            <input
              type="number"
              name="mileage"
              id="mileage"
              defaultValue={mileage}
              placeholder="Mileage"
              onChange={(e) => setMileage(e.target.value)}
            />
          </label>
          <label htmlFor="bodyType">
            Body Type
            <input
              type="text"
              name="bodyType"
              id="bodyType"
              defaultValue={bodyType}
              placeholder="Body Type"
              onChange={(e) => setBodyType(e.target.value)}
            />
          </label>
          <label htmlFor="titleType">
            Title Type
            <input
              type="text"
              name="titleType"
              id="titleType"
              defaultValue={titleType}
              placeholder="Title Type"
              onChange={(e) => setTitleType(e.target.value)}
            />
          </label>
          <label htmlFor="color">
            Color
            <input
              type="text"
              name="color"
              id="color"
              defaultValue={color}
              placeholder="Color"
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label htmlFor="vin">
            VIN
            <input
              type="text"
              name="vin"
              id="vin"
              defaultValue={vin}
              placeholder="VIN"
              onChange={(e) => setVin(e.target.value)}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={price}
              placeholder="Asking Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              type="text"
              name="description"
              id="description"
              defaultValue={description}
              placeholder="Description"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="image" id="image-upload-label">
            Select an Image
            <input
              type="file"
              name="image"
              id="image"
              placeholder="Select Image"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="car-mechanical-specs">
          <h3>Mechanical Specifications</h3>
          <label htmlFor="doorCount">
            Door Count
            <input
              type="number"
              name="doorCount"
              id="doorCount"
              defaultValue={doorCount}
              placeholder="Doors"
              onChange={(e) => setDoorCount(e.target.value)}
            />
          </label>
          <label htmlFor="cylinders">
            Cylinders
            <input
              type="number"
              name="cylinders"
              id="cylinders"
              defaultValue={cylinders}
              placeholder="Cylinders"
              onChange={(e) => setCylinders(e.target.value)}
            />
          </label>
          <label htmlFor="transmission">
            Transmission
            <input
              type="text"
              name="transmission"
              id="transmission"
              defaultValue={transmission}
              placeholder="Transmission"
              onChange={(e) => setTransmission(e.target.value)}
            />
          </label>
          <label htmlFor="fuelType">
            FuelType
            <input
              type="text"
              name="fuelType"
              id="fuelType"
              defaultValue={fuelType}
              placeholder="Fuel"
              onChange={(e) => setFuelType(e.target.value)}
            />
          </label>
          <label htmlFor="driveType">
            Drive Type
            <input
              type="text"
              name="driveType"
              id="driveType"
              defaultValue={driveType}
              placeholder="Drive Type"
              onChange={(e) => setDriveType(e.target.value)}
            />
          </label>
          <label htmlFor="condition">
            Condition
            <input
              type="text"
              name="condition"
              id="condition"
              defaultValue={condition}
              placeholder="Condition"
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
        </div>
        <div className="car-contact-info">
          <h3>Contact Info</h3>
          <label htmlFor="sellerType">
            Seller Type
            <input
              type="text"
              name="sellerType"
              id="sellerType"
              defaultValue={sellerType}
              placeholder="Seller Type"
              onChange={(e) => setSellerType(e.target.value)}
            />
          </label>
          <label htmlFor="sellerName">
            Seller Name
            <input
              type="text"
              name="sellerName"
              id="sellerName"
              defaultValue={sellerName}
              placeholder="Name"
              onChange={(e) => setSellerName(e.target.value)}
            />
          </label>
          <label htmlFor="sellerPhone">
            Seller Phone
            <input
              type="text"
              name="sellerPhone"
              id="sellerPhone"
              defaultValue={sellerPhone}
              placeholder="Phone"
              onChange={(e) => setSellerPhone(e.target.value)}
            />
          </label>
          <label htmlFor="location">
            Location
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={location}
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="listing-form-btn">
        <button onClick={postCarListing} className="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewCar;
