import React, { useState, useEffect } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';

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

function Home() {
  const { loading, error, data } = useQuery(ITEMS);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get('http://178.128.180.91:8080/cars').then((res) => {
      console.log(res.data.cars);
      if (data) {
        setAllData([...res.data.cars, ...data.Items]);
      }
    });
  }, [data]);

  const shuffle = (arr) => {
    var currentIndex = arr.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  };
  shuffle(allData);
  console.log(allData);

  const displayAllData = !allData
    ? null
    : allData.map((item) => {
        return (
          <div className="home-item" key={item._id ? item._id : item.id}>
            <Link
              to={item.vin ? `/cars/${item._id}` : `/items/${item.id}`}
              className="home-item-link"
            >
              <div className="home-image-wrap">
                <img
                  src={`http://localhost:8080/${
                    item.imageUrls ? item.imageUrls[0] : item.imageUrl
                  }`}
                  alt="classified item"
                  className="home-item-img"
                />
              </div>
              <ul className="home-item-info">
                <li className="home-item-info-item home-item-title">
                  {item.title}
                </li>
                <li className="home-item-info-item home-item-price">
                  ${item.price}
                </li>
                {item.mileage ? (
                  <li className="home-item-info-item home-item-mileage">
                    Mileage: item.mileage
                  </li>
                ) : null}
                <li className="home-item-info-item home-item-location">
                  {item.location}
                </li>
              </ul>
            </Link>
          </div>
        );
      });

  return (
    <div className="home-wrap">
      <div className="home-body">{displayAllData}</div>
    </div>
  );
}

export default Home;
