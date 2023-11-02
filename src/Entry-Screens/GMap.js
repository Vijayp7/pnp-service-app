import React, { useEffect, useRef, useState } from 'react';
 
const GMap = (props) => {
  const googleMapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [spLat, setSPLat] = useState("17");
  const [spLong, setSPLong] = useState("78");
 
  useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
            setSPLat(position.coords.latitude);
            setSPLong(position.coords.longitude);

            const timer = setTimeout(() => {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                      setSPLat(position.coords.latitude);
                      setSPLong(position.coords.longitude);
                })
              }, 5000);
        });
        const googleMap = initGoogleMap();
        setMap(googleMap);
  }, []);
 
  useEffect(() => {
    if (!map) return;

    var directionsService = new window.google.maps.DirectionsService();
    var directionsRenderer = new window.google.maps.DirectionsRenderer();
    var haight = new window.google.maps.LatLng(spLat, spLong);
    var oceanBeach = new window.google.maps.LatLng(props.clientLat, props.clientLong);
    var request = {
      origin: haight,
      destination: oceanBeach,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function (response, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(response);
        directionsRenderer.setMap(map);
      }
    });
  }, [map])
 
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: new window.google.maps.LatLng(spLat, spLong),
      zoom: 10
    });
  }
 
  return <div
    ref={googleMapRef}
    style={{ width: "100%", height: "100vh" }}
  />
}
 
export default GMap;