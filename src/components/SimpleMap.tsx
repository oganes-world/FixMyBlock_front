import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

export interface SimpleMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
}

interface SimpleMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: SimpleMarker[];
  onMapClick?: (lat: number, lng: number) => void;
  onMarkerClick?: (id: string) => void;
  style?: React.CSSProperties;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  center,
  zoom = 13,
  markers = [],
  onMapClick,
  onMarkerClick,
  style,
}) => {
  // Convert center to Leaflet LatLngExpression
  const centerLatLng: LatLngExpression = [center.lat, center.lng];

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        onMapClick?.(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={centerLatLng} // ✅ correct type
      zoom={zoom}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "8px",
        ...style,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler />
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng] as LatLngExpression}
          eventHandlers={{ click: () => onMarkerClick?.(m.id) }}
          icon={L.icon({
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
          })}
        >
          {m.label && <Popup>{m.label}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SimpleMap;
