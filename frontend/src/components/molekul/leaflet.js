"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

const Leaflet = () => {
  const [position, setPosition] = useState(null);
  const [randomPoint, setRandomPoint] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
            position.coords.latitude + (Math.random() - 0.5) * 0.01;
          const randomLng =
            position.coords.longitude + (Math.random() - 0.5) * 0.01;
          setRandomPoint([randomLat, randomLng]);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          const defaultPosition = [-7.77112133034015, 110.37760166727743];
          setPosition(defaultPosition);
          const randomLat = defaultPosition[0] + (Math.random() - 0.5) * 0.01;
          const randomLng = defaultPosition[1] + (Math.random() - 0.5) * 0.01;
          setRandomPoint([randomLat, randomLng]);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      const defaultPosition = [-7.77112133034015, 110.37760166727743];
      setPosition(defaultPosition);
      const randomLat = defaultPosition[0] + (Math.random() - 0.5) * 0.01;
      const randomLng = defaultPosition[1] + (Math.random() - 0.5) * 0.01;
      setRandomPoint([randomLat, randomLng]);
    }
  }, []);

  return (
    <div className="md:w-[50vw]">
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom
          className="md:w-[40vw] h-[30vh] m-16 rounded-lg"
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Leaflet;
