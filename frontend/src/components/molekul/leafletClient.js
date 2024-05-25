"use client";
import React, { useEffect, useState } from "react";

const Leaflet = () => {
  const [position, setPosition] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

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
    <div className="md:w-[50vw]">
      {position && <MapComponent position={position} />}
    </div>
  );
};

const MapComponent = ({ position }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (position) {
      import("react-leaflet").then(
        ({ MapContainer, TileLayer, Marker, Popup }) => {
          setMap(
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom
              className="md:w-[40vw] h-[30vh] m-16 rounded-lg"
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={position}
                icon={
                  new L.Icon({
                    iconUrl: "/marker.svg",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                    shadowAnchor: [12, 41],
                  })
                }
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          );
        }
      );
    }
  }, [position]);

  return map;
};

export default Leaflet;
