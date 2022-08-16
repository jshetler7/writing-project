import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Maps } from '../Types';
import Carousel from 'react-bootstrap/Carousel';

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const [maps, setMaps] = useState<Maps[]>([])

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    apiService('/api/maps')
    .then(data => setMaps(data))
    .catch(e => console.log(e));
  },[]);

  return (
    <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
      {maps.map(map => (
        <Carousel.Item key={map.id}>
          <Link to={'/maps/'+ map.id}>
        <img
          className="d-block w-100 border border-dark border-5"
          src={map.url}
          alt="Slide photo"
        />
        </Link>
        <Carousel.Caption>
          <h3>{map.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Gallery;