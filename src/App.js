// src/App.js
import React, { useState, useEffect } from 'react';
import Map from './Map';

function App() {
  const [vehiclePosition, setVehiclePosition] = useState([17.38504, 78.48667]);
  const [routePath, setRoutePath] = useState([vehiclePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://back-end-86wm.onrender.com/api/vehicle/current') // Fetch from backend
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




  //////

    const [currentIndex, setCurrentIndex] = useState(null);

  // Function to handle resetting currentIndex to 0 using fetch
  const handleReset = async () => {
    try {
      const response = await fetch('https://back-end-86wm.onrender.com/reset-index', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data.message); // Logs 'currentIndex reset to 0'
      setCurrentIndex(data.currentIndex); // Update currentIndex in state
    } catch (error) {
      console.error('Error resetting currentIndex:', error);
    }
  };

  // Function to handle refreshing currentIndex using fetch
  const handleRefresh = async () => {
    try {
      const response = await fetch('https://back-end-86wm.onrender.com/current-index');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCurrentIndex(data.currentIndex); // Set the fetched currentIndex
    } catch (error) {
      console.error('Error fetching currentIndex:', error);
    }
  };

  return (
    <div className="App">
    <div id='two'>
      <h1 id='one'>Vehicle Tracker with Leaflet and Node.js</h1>
      <Map vehiclePosition={vehiclePosition} routePath={routePath} />
    </div>
      {/* Adding new UI for Reset and Refresh */}
      <br />
      <button onClick={handleReset}>Reset Index</button>

      {/* Other elements/components of your existing App.js */}
    </div>
  );
}

export default App;
