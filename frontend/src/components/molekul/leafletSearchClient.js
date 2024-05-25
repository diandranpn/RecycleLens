"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

const LeafletSearch = () => {
  const [position, setPosition] = useState(null);
  const [randomPoints, setRandomPoints] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  useEffect(() => {
    if (isMounted) {
      const generateRandomPoints = (basePosition, numPoints) => {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
          const randomLat = basePosition[0] + (Math.random() - 0.5) * 0.01;
          const randomLng = basePosition[1] + (Math.random() - 0.5) * 0.01;
          points.push([randomLat, randomLng]);
        }
        return points;
      };

      const handlePosition = (latitude, longitude) => {
        const basePosition = [latitude, longitude];
        setPosition(basePosition);
        setRandomPoints(generateRandomPoints(basePosition, 5));
      };

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handlePosition(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            const defaultPosition = [-7.77112133034015, 110.37760166727743];
            handlePosition(defaultPosition[0], defaultPosition[1]);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        const defaultPosition = [-7.77112133034015, 110.37760166727743];
        handlePosition(defaultPosition[0], defaultPosition[1]);
      }
    }
  }, [isMounted]);

  return (
    <div className="w-full">
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom
          className="w-screen h-screen"
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {randomPoints.map((point, index) => (
            <Marker key={index} position={point} icon={customIcon}>
              <Popup>
                Random Point {index + 1}: {point[0].toFixed(6)},{" "}
                {point[1].toFixed(6)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletSearch;
