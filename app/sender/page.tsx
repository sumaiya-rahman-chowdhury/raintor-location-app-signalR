"use client";

import { useSignalR } from "@/hooks/useSignalR";
import { useCallback, useEffect, useState } from "react";

function Page() {
  const email = "sumaiyaprionty@gmail.com";
  const [lat, setLat] = useState(23.78);
  const [lon, setLon] = useState(90.4);
  const [useRealGPS, setUseRealGPS] = useState(false);
  const { sendLocation, connected } = useSignalR();

  const getRealPosition = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLon = position.coords.longitude;
          setLat(newLat);
          setLon(newLon);
          if (connected) {
            sendLocation(newLat, newLon, email);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setUseRealGPS(false);
        }
      );
    } else {
      setUseRealGPS(false);
    }
  }, [connected, email, sendLocation]);
  const simulateMovement = useCallback(() => {
    const newLat = lat + (Math.random() * 0.002 - 0.001);
    const newLon = lon + (Math.random() * 0.002 - 0.001);
    setLat(newLat);
    setLon(newLon);
    if (connected) {
      sendLocation(newLat, newLon, email);
    }
  }, [lat, lon, connected, email, sendLocation]);
  useEffect(() => {
    if (!connected) {
      return;
    }

    const interval = setInterval(() => {
      if (useRealGPS) {
        getRealPosition();
      } else {
        simulateMovement();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [connected, useRealGPS, getRealPosition, simulateMovement]);

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Location Sender</h1>
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useRealGPS}
            onChange={(e) => setUseRealGPS(e.target.checked)}
            className="rounded"
          />
          <span>Use Real GPS</span>
        </label>
      </div>

      <div className="space-y-2 mb-4">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Latitude:</strong> {lat.toFixed(6)}
        </p>
        <p>
          <strong>Longitude:</strong> {lon.toFixed(6)}
        </p>
      </div>

      <div
        className={`p-3 rounded-md ${
          connected
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        <p>Status: {connected ? "Connected" : "Connecting..."}</p>
      </div>
    </main>
  );
}

export default Page;
