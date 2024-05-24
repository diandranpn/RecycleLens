"use client"
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

const Leaflet = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
          setPosition([-7.77112133034015, 110.37760166727743]);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setPosition([-7.77112133034015, 110.37760166727743]);
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
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      )}
    </div>
  );
};

export default Leaflet;
