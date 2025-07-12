"use client";

import { useState } from "react";
import { useSignalR, LocationData } from "@/hooks/useSignalR";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapUpdater({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  map.setView([lat, lon], map.getZoom());
  return null;
}

export default function ReceiverClient() {
  const [location, setLocation] = useState<LocationData>({
    userName: "N/A",
    lat: 23.78,
    lon: 90.4,
  });

  const { connected } = useSignalR((data: LocationData) => {
    setLocation(data);
  });

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Location Receiver</h1>

      <div className="mb-4">
        <p>
          <strong>From:</strong> {location.userName}
        </p>
        <p>
          <strong>Latitude:</strong> {location.lat.toFixed(6)}
        </p>
        <p>
          <strong>Longitude:</strong> {location.lon.toFixed(6)}
        </p>
        <p>
          Status:{" "}
          <span className={connected ? "text-green-600" : "text-yellow-600"}>
            {connected ? "Connected" : "Connecting..."}
          </span>
        </p>
      </div>

      <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[location.lat, location.lon]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lon]}></Marker>
          <MapUpdater lat={location.lat} lon={location.lon} />
        </MapContainer>
      </div>
    </main>
  );
}
