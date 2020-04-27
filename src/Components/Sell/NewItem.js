import React, { useState, useEffect } from 'react';
import './sell.scss';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

function NewItem() {
  const history = useHistory();
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [location, setLocation] = useState('');

  const CREATE_ITEM = gql`
    mutation AddItem(
      $title: String
      $category: String
      $condition: String
      $description: String
      $price: Int
      $location: String
      $imageUrl: String
      $sellerName: String
      $sellerPhone: String
    ) {
      createItem(
        title: $title
        category: $category
        condition: $condition
        description: $description
        price: $price
        location: $location
        imageUrl: $imageUrl
        sellerName: $sellerName
        sellerPhone: $sellerPhone
      ) {
        id
        title
        category
        condition
        description
        price
        location
        imageUrl
        sellerName
        sellerPhone
      }
    }
  `;

  const [createItem, { data }] = useMutation(CREATE_ITEM);

  console.log(data);

  useEffect(() => {
    if (data) {
      history.push(`/items/${data.createItem.id}`);
      console.log(data);
    } else {
      console.log(`data is ${data}`);
    }
  }, [data, history]);

  const handleCreateItem = () => {
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
        createItem({
          variables: {
            title: title,
            category: category,
            condition: condition,
            description: description,
            price: Number(price),
            location: location,
            imageUrl: resData,
            sellerName: sellerName,
            sellerPhone: sellerPhone,
          },
        });
      })
      .catch((err) => {
        throw err;
      });
  };

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
          <label htmlFor="title">
            Title
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              name="price"
              id="price"
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
              placeholder="Description"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="condition">
            Condition
            <input
              type="text"
              name="condition"
              id="condition"
              placeholder="Condition"
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <label htmlFor="category">
            Category
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label htmlFor="item-image" id="item-img-label">
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
          <label htmlFor="sellerName">
            Seller Name
            <input
              type="text"
              name="sellerName"
              id="sellerName"
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
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="listing-form-btn">
        <button className="submit" onClick={handleCreateItem}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewItem;
