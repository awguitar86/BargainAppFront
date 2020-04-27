import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../Sell/sell.scss';
import axios from 'axios';

function EditCar(props) {
  const [deleteListing, setDeleteListing] = useState(false);
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
  const [transmisson, setTransmisson] = useState();
  const [fuelType, setFuelType] = useState();
  const [driveType, setDriveType] = useState();
  const [condition, setCondition] = useState();
  const [sellerType, setSellerType] = useState();
  const [sellerName, setSellerName] = useState();
  const [sellerPhone, setSellerPhone] = useState();
  const [location, setLocation] = useState();
  const [carData, setCarData] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cars/${props.match.params.id}`)
      .then((res) => {
        console.log(res);
        setCarData(res.data.car);
      });
  }, [props.match.params.id]);

  const handleDeleteListing = () => {
    setDeleteListing(!deleteListing ? true : false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
    console.log(e.target.files[0]);
  };

  console.log(file);

  const updateCarListing = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    let url = 'http://localhost:8080/image';
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
          transmission: transmisson,
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
        fetch(`http://localhost:8080/cars/${props.match.params.id}`, {
          method: 'PUT',
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
            // history.push(`/cars/${resData.car._id}`);
            console.log(resData);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

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
      sellerType,
      titleType,
      transmission,
      vin,
      year,
    } = carData;

    return (
      <div className="edit-car-wrap">
        <h1>Update Car Listing</h1>
        <div className="car-listing-form">
          <div className="car-general-info">
            <h3>General Information</h3>
            <input
              type="number"
              name="year"
              id="year"
              value={year}
              placeholder="Year"
              onChange={(e) => setYear(e.target.value)}
            />
            <input
              type="text"
              name="make"
              id="make"
              value={make}
              placeholder="Make"
              onChange={(e) => setMake(e.target.value)}
            />
            <input
              type="text"
              name="model"
              id="model"
              value={model}
              placeholder="Model"
              onChange={(e) => setModel(e.target.value)}
            />
            <input
              type="number"
              name="mileage"
              id="mileage"
              value={mileage}
              placeholder="Mileage"
              onChange={(e) => setMileage(e.target.value)}
            />
            <input
              type="text"
              name="bodyType"
              id="bodyType"
              value={bodyType}
              placeholder="Body Type"
              onChange={(e) => setBodyType(e.target.value)}
            />
            <input
              type="text"
              name="titleType"
              id="titleType"
              value={titleType}
              placeholder="Title Type"
              onChange={(e) => setTitleType(e.target.value)}
            />
            <input
              type="text"
              name="color"
              id="color"
              value={color}
              placeholder="Color"
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              type="text"
              name="vin"
              id="vin"
              value={vin}
              placeholder="VIN"
              onChange={(e) => setVin(e.target.value)}
            />
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              placeholder="Asking Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              placeholder="Description"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="image">
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
            <input
              type="number"
              name="doorCount"
              id="doorCount"
              value={doorCount}
              placeholder="Doors"
              onChange={(e) => setDoorCount(e.target.value)}
            />
            <input
              type="number"
              name="cylinders"
              id="cylinders"
              value={cylinders}
              placeholder="Cylinders"
              onChange={(e) => setCylinders(e.target.value)}
            />
            <input
              type="text"
              name="transmission"
              id="transmission"
              value={transmission}
              placeholder="Transmission"
              onChange={(e) => setTransmisson(e.target.value)}
            />
            <input
              type="text"
              name="fuelType"
              id="fuelType"
              value={fuelType}
              placeholder="Fuel"
              onChange={(e) => setFuelType(e.target.value)}
            />
            <input
              type="text"
              name="driveType"
              id="driveType"
              value={driveType}
              placeholder="Drive Type"
              onChange={(e) => setDriveType(e.target.value)}
            />
            <input
              type="text"
              name="condition"
              id="condition"
              value={condition}
              placeholder="Condition"
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          <div className="car-contact-info">
            <h3>Contact Info</h3>
            <input
              type="text"
              name="sellerType"
              id="sellerType"
              value={sellerType}
              placeholder="Seller Type"
              onChange={(e) => setSellerType(e.target.value)}
            />
            <input
              type="text"
              name="sellerName"
              id="sellerName"
              value={sellerName}
              placeholder="Name"
              onChange={(e) => setSellerName(e.target.value)}
            />
            <input
              type="text"
              name="sellerPhone"
              id="sellerPhone"
              value={sellerPhone}
              placeholder="Phone"
              onChange={(e) => setSellerPhone(e.target.value)}
            />
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        {!deleteListing ? (
          <div className="listing-form-btn">
            <button onClick={updateCarListing} className="update">
              Update
            </button>
            <button className="delete" onClick={handleDeleteListing}>
              Delete Listing
            </button>
          </div>
        ) : (
          <div className="delete-check">
            <h3>Are you sure you want to delete this listing?</h3>
            <div className="delete-check-btns">
              <button className="cancel" onClick={handleDeleteListing}>
                CANCEL
              </button>
              <button className="delete">DELETE</button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <h3>No Data</h3>;
  }
}

export default EditCar;
