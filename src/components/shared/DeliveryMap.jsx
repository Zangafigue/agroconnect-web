import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet par défaut avec Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function DeliveryMap({ pickup, delivery, transporterPos, height = "400px" }) {
  const center = transporterPos || pickup || delivery || [12.3714, -1.5197]; // Ouaga par défaut

  return (
    <MapContainer center={center} zoom={13} style={{ height, width: '100%', borderRadius: '12px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {pickup && (
        <Marker position={pickup}>
          <Popup>Collecte (Ferme)</Popup>
        </Marker>
      )}

      {delivery && (
        <Marker position={delivery}>
          <Popup>Livraison (Acheteur)</Popup>
        </Marker>
      )}

      {transporterPos && (
        <Marker position={transporterPos}>
          <Popup>Transporteur 👋</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
