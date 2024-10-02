import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mapContainerStyle = { height: '400px', width: '100%' };

const vehicleIcon = L.icon({
  iconUrl: '/car.png',
  iconSize: [30, 30],
  iconAnchor: [10, 15],
});

const Map = ({ vehiclePosition, routePath }) => {
  return (
    <MapContainer id='3' center={vehiclePosition} zoom={15} style={mapContainerStyle}>
      {/* Map Tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Vehicle Marker */}
      <Marker position={vehiclePosition} icon={vehicleIcon} />

      {/* Route Polyline */}
      <Polyline positions={routePath} color="blue" />
    </MapContainer>
  );
};

export default Map;
