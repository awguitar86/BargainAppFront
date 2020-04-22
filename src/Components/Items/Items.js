import React from 'react';
import './items.scss';
import ItemsItem from './itemsItem';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ITEMS = gql`
  query {
    Items {
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

function Items() {
  const { loading, error, data } = useQuery(ITEMS);

  const displayItems = !data
    ? null
    : data.Items.map((item) => {
        return (
          <ItemsItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            location={item.location}
          />
        );
      });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="items-wrap">
      <h2>Items</h2>
      <div className="items-items-wrap">{displayItems}</div>
    </div>
  );
}

export default Items;
