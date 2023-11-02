import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import GMap from './GMap';
import { Routes, Route, Link } from 'react-router-dom'

 
const ClientLocationMapsRouting = (props) => {
  const [loadMap, setLoadMap] = useState(false);
 
  useEffect(() => {
    const options = {
      apiKey: "AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0",
      version: "weekly",
      libraries: ['geometry']

    };
 
    new Loader(options).load().then(() => {
      setLoadMap(true);
    }).catch(e => {
      console.error('Sorry, something went wrong: Please try again later. Error:', e);
    });
  }, []);


  return (
    <div className="App">
      <div class="srvc-dtls-hd">
        <h4>Service Details</h4>
        <div class="srvc-dtls-bck">
          <Link to="/home">
          <img src="srvc-dtls-bck-icon.png"  />
          </Link>
       </div>
      </div>
      {!loadMap ? <div>Loading...</div> : <GMap clientLat = {props.location.clientLat} clientLong = {props.location.clientLong}/>}
      <br/>
    </div>
  );
}
 
export default ClientLocationMapsRouting;