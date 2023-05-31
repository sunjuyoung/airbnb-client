import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ center }) => {
  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(center || [51, -0.09]);
    }, []);

    return null;
  }

  return (
    <MapContainer
      center={center || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="map h-[35vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {center && <Marker position={center} />}
      <FlyMapTo />
    </MapContainer>
  );
};

export default Map;
