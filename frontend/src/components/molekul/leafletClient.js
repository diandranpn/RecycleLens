"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Leaflet = () => {
  const [position, setPosition] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const customIcon = new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      import("leaflet").then((L) => {
        const customIcon = new L.Icon({
          iconUrl: "/marker.svg",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          shadowAnchor: [12, 41],
        });

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setPosition([
                position.coords.latitude,
                position.coords.longitude,
              ]);
            },
            (error) => {
              console.error("Error getting geolocation:", error);
              const defaultPosition = [-7.77112133034015, 110.37760166727743];
              setPosition(defaultPosition);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
          const defaultPosition = [-7.77112133034015, 110.37760166727743];
          setPosition(defaultPosition);
        }
      });
    }
  }, [isMounted]);

  return (
    <div className="md:w-[50vw] pb-16 mt-7 mx-2">
      {position && (
        <MapContainer
          center={position}
          zoom={19}
          scrollWheelZoom
          className="w-full h-[30vh] rounded-lg border-2"
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup>
              <div>You</div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
      <div className="min-h-[100px]"></div>
    </div>
  );
};

export default Leaflet;
