import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix broken default marker icons in webpack/vite bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LatLng { lat: number; lng: number; }

interface LocationPickerProps {
  /** Initial center [lat, lng] — defaults to Ouagadougou, Burkina Faso */
  initialPosition?: LatLng;
  /** Called whenever the user clicks to move the marker */
  onChange?: (position: LatLng) => void;
  /** Height class, e.g. "h-64" */
  className?: string;
}

/** Inner component that listens for map clicks */
function ClickHandler({ onMove }: { onMove: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onMove({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  initialPosition = { lat: 12.3641, lng: -1.5330 }, // Ouagadougou
  onChange,
  className = 'h-56',
}) => {
  const [position, setPosition] = useState<LatLng>(initialPosition);

  const handleMove = (pos: LatLng) => {
    setPosition(pos);
    onChange?.(pos);
  };

  return (
    <div className={`rounded-2xl overflow-hidden border border-[var(--border-light)] ${className}`} style={{ zIndex: 0 }}>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]} />
        <ClickHandler onMove={handleMove} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
