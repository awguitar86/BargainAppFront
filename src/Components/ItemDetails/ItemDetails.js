import React from 'react';
import './itemDetails.scss';
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
        isFirmOnPrice
        location
        imageUrl
      }
    }
  `;
  const { loading, error, data } = useQuery(ITEM);
  console.log(data);
  if (data) {
    const {
      title,
      price,
      description,
      category,
      condition,
      location,
      isFirmOnPrice,
      imageUrl,
    } = data.Item;
    return (
      <div className="item-details-wrap" style={{ color: 'white' }}>
        <img src={`http://localhost:8080/${imageUrl}`} alt={title} />
        <h2>{title}</h2>
        <h3>Price: ${price}</h3>
        <h3>Description: {description}</h3>
        <h3>Category: {category}</h3>
        <h3>Condition: {condition}</h3>
        <h3>Location: {location}</h3>
        <h3>Firm on Price: {isFirmOnPrice ? 'Yes' : 'No'}</h3>
      </div>
    );
  } else {
    return <h2>No Data</h2>;
  }
}

export default ItemDetails;
