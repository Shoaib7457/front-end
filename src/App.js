// src/App.js
import React, { useState, useEffect } from 'react';
import Map from './Map';

function App() {
  const [vehiclePosition, setVehiclePosition] = useState([17.38504, 78.48667]);
  const [routePath, setRoutePath] = useState([vehiclePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3000/api/vehicle/current') // Fetch from backend
        .then((response) => response.json())
        .then((data) => {
          const newPosition = [data.latitude, data.longitude];
          setVehiclePosition(newPosition);
          setRoutePath((prevPath) => [...prevPath, newPosition]);
        })
        .catch((error) => console.error('Error fetching vehicle data:', error));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='two'>
      <h1 id='one'>Vehicle Tracker with Leaflet and Node.js</h1>
      <Map vehiclePosition={vehiclePosition} routePath={routePath} />
    </div>
  );
}

export default App;
