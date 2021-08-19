import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header'
import List from './components/List/List';
import Map from './components/Map/Map'

const App = () => {
  
  const [places, setPlaces] = useState([])
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []); // the empty array means that this function will happen only at the start of the application

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) >= rating);

    setFilteredPlaces(filtered);
  }, [rating]); // apply when rating is updating

  useEffect(()=> {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
    .then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [type, coords, bounds]) // apply when type or coords or bounds are updating
  
  return (
    <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width : '100%'}}>
          <Grid item xs={12} md={4}>
            <List 
              places={filteredPlaces.length ? filteredPlaces : places} 
              childClicked={childClicked} 
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating} 
             />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map 
              setCoordinates={setCoords}
              setBounds={setBounds}
              coordinates={coords}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
              />
          </Grid>
        </Grid>
    </>
  );
}

export default App;
