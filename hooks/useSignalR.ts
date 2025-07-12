"use client";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export interface LocationData {
  userName: string;
  lat: number;
  lon: number;
}
export const useSignalR = (onReceiver?: (data: LocationData) => void) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/Hub")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          await connection.start();
          setConnected(true);
          console.log("SignalR connected");
          if (onReceiver) {
            connection.on("ReceiveLatLon", onReceiver);
          }
        } else {
          console.log("Connection already started or starting...");
        }
      } catch (err) {
        console.error("SignalR Connection Error:", err);
      }
    };

    startConnection();

    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, [connection, onReceiver]);

  const sendLocation = (lat: number, lon: number, userName: string) => {
    if (connected && connection) {
      connection.invoke("SendLatLon", lat, lon, userName).catch((err) => {
        console.error("Failed to send location:", err);
      });
    }
  };
  return { connected, sendLocation };
};
