import React, { useState, useEffect } from 'react';
import './items.scss';
import ItemsItem from './itemsItem';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Select from 'react-select';

const ITEMS = gql`
  query {
    Items {
      id
      title
      category
      condition
      description
      price
      location
      imageUrl
    }
  }
`;

const itemOptions = [
  { value: 'Musical Instruments', label: 'Musical Instruments' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Appliances', label: 'Appliances' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Computers', label: 'Computers' },
  { value: 'Snowboard Equipment', label: 'Snowboard Equipment' },
  { value: 'TVs', label: 'TVs' },
  { value: 'BMX Bikes', label: 'BMX Bikes' },
  { value: 'Mountain Bikes', label: 'Mountain Bikes' },
  { value: 'Cribs and Playpens', label: 'Cribs and Playpens' },
  { value: 'Strollers', label: 'Strollers' },
  { value: 'Archery Equipment', label: 'Archery Equipment' },
  { value: 'Gun Safes and Gun Racks', label: 'Gun Safes and Gun Racks' },
  { value: 'Dirt Bikes', label: 'Dirt Bikes' },
  { value: 'Canoes', label: 'Canoes' },
  { value: 'Kayaks', label: 'Kayaks' },
  { value: 'Ladders', label: 'Ladders' },
];

function Items() {
  const {
    loading: itemsLoading,
    error: itemsError,
    data: itemsData,
  } = useQuery(ITEMS);
  const [itemData, setItemData] = useState();
  const [itemCategory, setItemCategory] = useState({});
  const ITEMS_CATEGORY = gql`
  query {
    ItemsByCategory (category: "${itemCategory.value}"){
      id
      title
      category
      condition
      description
      price
      location
      imageUrl
    }
  }
  `;
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(ITEMS_CATEGORY);

  useEffect(() => {
    if (itemsData) {
      setItemData(itemsData);
    }
  }, [itemsData]);

  const handleSelectCategory = (selected) => {
    console.log(selected);
    setItemCategory(selected);
  };

  const updateSelecttion = () => {
    setItemData(categoryData.ItemsByCategory);
  };

  const displayItems = !itemData
    ? null
    : itemData.Items
    ? itemData.Items.map((item) => {
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
      })
    : itemData.map((item) => {
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

  if (itemsLoading) return <p>Loading...</p>;
  if (itemsError) return <p>Error :(</p>;

  console.log(itemData);
  console.log(categoryData);

  return (
    <div className="items-wrap">
      <div className="items-header">
        <h2>Classifieds</h2>
        <Select
          placeholder="Select Category..."
          className="select"
          options={itemOptions}
          onChange={handleSelectCategory}
        />
        <button onClick={updateSelecttion} className="update-select-btn">
          Update
        </button>
      </div>
      <div className="items-items-wrap">{displayItems}</div>
    </div>
  );
}

export default Items;
