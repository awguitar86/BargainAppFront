import React, { useState } from 'react';
import './sell.scss';

function NewItem() {
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
  };

  return (
    <div className="new-item-wrap">
      <h1>Create Classified Listing</h1>
      <div className="item-listing-form">
        <div className="item-general-info">
          <h3>General Information</h3>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Asking Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="condition"
            id="condition"
            placeholder="Condition"
            onChange={(e) => setCondition(e.target.value)}
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="item-image">
            Select an Image
            <input
              type="file"
              name="image"
              id="item-image"
              placeholder="Select Image"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="item-contact-info">
          <h3>Contact Info</h3>
          <input
            type="text"
            name="sellerName"
            id="sellerName"
            placeholder="Name"
            onChange={(e) => setSellerName(e.target.value)}
          />
          <input
            type="text"
            name="sellerPhone"
            id="sellerPhone"
            placeholder="Phone"
            onChange={(e) => setSellerPhone(e.target.value)}
          />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="listing-form-btn">
        <button>Submit</button>
      </div>
    </div>
  );
}

export default NewItem;
