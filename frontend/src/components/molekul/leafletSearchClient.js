import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletSearch = () => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);

  const customIcon = new L.Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { coords } = await getCurrentPosition();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/landfill/nearby-landfill?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );
        setMarkers(response.data);
        setPosition([coords.latitude, coords.longitude]);
      } catch (error) {
        setPosition([-7.77123151227835, 110.3776016942451])
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

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
