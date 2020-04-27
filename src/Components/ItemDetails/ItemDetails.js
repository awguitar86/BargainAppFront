import React from 'react';
import './itemDetails.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function ItemDetails(props) {
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
  console.log(data);
  if (data) {
    const {
      id,
      title,
      price,
      description,
      category,
      condition,
      location,
      imageUrl,
      sellerName,
      sellerPhone,
    } = data.Item;
    return (
      <div className="item-details-wrap">
        <div className="item-details-left">
          <img
            src={`http://178.128.180.91:8080/${imageUrl}`}
            alt={title}
            className="item-details-img"
          />
        </div>
        <div className="item-details-text">
          <h1>{title}</h1>
          <h2>${price}</h2>
          <h3>Seller Name: {sellerName}</h3>
          <h3>Seller Phone: {sellerPhone}</h3>
          <h3>Location: {location}</h3>
          <h3>
            Description:{' '}
            <span style={{ fontWeight: 'normal' }}>{description}</span>
          </h3>
          <h3>
            Condition: <span style={{ fontWeight: 'normal' }}>{condition}</span>
          </h3>
          <h3>
            Category: <span style={{ fontWeight: 'normal' }}>{category}</span>
          </h3>
          <div className="edit-btn-wrap">
            <Link to={`/edit-item/${id}`}>Edit Item</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <h2>No Data</h2>;
  }
}

export default ItemDetails;
