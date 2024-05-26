// LeafletSearch.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletSearch = ({ setPosition }) => {
  const [position, setLocalPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
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
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/landfill/nearby-landfill?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
              );
              setMarkers(response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
            setLocalPosition([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          },
          async (error) => {
            console.error("Error getting geolocation:", error);
            const defaultPosition = [-7.77112133034015, 110.37760166727743];
            try {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/landfill/nearby-landfill?latitude=-7.77112133034015&longitude=110.37760166727743`
              );
              setMarkers(response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
            setLocalPosition(defaultPosition);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        const defaultPosition = [-7.77112133034015, 110.37760166727743];
        setPosition(defaultPosition);
      }
    }
  }, [isMounted]);

  const RecenterAutomatically = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position]);
    return null;
  };

  useEffect(() => {
    if (setPosition !== null) {
      setLocalPosition([
        setPosition.location.coordinates[1],
        setPosition.location.coordinates[0],
      ]);
    }
    setMarkers((prevMarkers) => {
      console.log([...prevMarkers, setPosition]);
      return [...prevMarkers, setPosition];
    });
    console.log(setPosition);
  }, [setPosition]);

  return (
    <div className="w-full h-full">
      {position && (
        <MapContainer
          center={position}
          zoom={19}
          scrollWheelZoom
          className="w-screen h-screen"
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterAutomatically position={position} />
          {markers.length > 0 &&
            markers.map((marker, index) => (
              <Marker
                key={index}
                position={[
                  marker.location.coordinates[1],
                  marker.location.coordinates[0],
                ]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h3>{marker.name}</h3>
                    <p>{marker.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletSearch;
