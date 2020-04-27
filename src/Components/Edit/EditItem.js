import React, { useState, useEffect } from 'react';
import './edit.scss';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

function EditItem(props) {
  const ITEM = gql`
    query {
      Item (id: "${props.match.params.id}") {
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
  const { loading, error, data } = useQuery(ITEM);
  const history = useHistory();
  const [deleteListing, setDeleteListing] = useState(false);
  const [file, setFile] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [location, setLocation] = useState('');

  const UPDATE_ITEM = gql`
    mutation UpdateItem(
      $id: ID!
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
      updateItem(
        id: $id
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

  const DELETE_ITEM = gql`
    mutation DeleteItem($id: String!) {
      deleteOneItem(where: { id: $id }) {
        title
      }
    }
  `;

  const [updateItem] = useMutation(UPDATE_ITEM);
  const [deleteItem] = useMutation(DELETE_ITEM);

  console.log(data);

  useEffect(() => {
    if (data) {
      setId(data.Item.id);
      setTitle(data.Item.title);
      setPrice(data.Item.price);
      setDescription(data.Item.description);
      setCondition(data.Item.condition);
      setCategory(data.Item.category);
      setSellerName(data.Item.sellerName);
      setSellerPhone(data.Item.sellerPhone);
      setLocation(data.Item.location);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
  };

  const handleDeleteListing = () => {
    setDeleteListing(!deleteListing ? true : false);
  };

  const updateItemListing = () => {
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
        updateItem({
          variables: {
            id: id,
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
        history.push(`/items/${id}`);
      })
      .catch((err) => {
        throw err;
      });
  };

  const deleteItemListing = () => {
    deleteItem({
      variables: {
        id: id,
      },
    });
    history.push('/items');
  };

  return (
    <div className="edit-item-wrap">
      <h1>Update Classified Listing</h1>
      <div className="item-listing-form">
        <div className="item-general-info">
          <h3>General Information</h3>
          <label htmlFor="title">
            Title
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={title}
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
          <label htmlFor="category">
            Category
            <input
              type="text"
              name="category"
              id="category"
              defaultValue={category}
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
      {!deleteListing ? (
        <div className="listing-form-btn">
          <button onClick={updateItemListing} className="update">
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
            <button className="delete" onClick={deleteItemListing}>
              DELETE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditItem;
