
import React, { useEffect, useRef } from 'react';
import type { Warehouse, InTransitShipment } from '../types';
import { TransportMode } from '../types';

// This is required for Leaflet to work with React
declare const L: any;

interface InventoryMapProps {
  warehouses: Warehouse[];
  inTransitStock: InTransitShipment[];
  selectedWarehouse: Warehouse | null;
  onWarehouseSelect: (warehouse: Warehouse | null) => void;
}

const createIcon = (svg: string, size: number = 32) => {
    const iconHtml = `<div style="font-size: ${size}px; color: #93c5fd; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.7));">${svg}</div>`;
    return L.divIcon({
      html: iconHtml,
      className: 'dummy',
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
    });
};

const transportIcons = {
    [TransportMode.TRUCK]: createIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 18.5C18 19.33 17.33 20 16.5 20C15.67 20 15 19.33 15 18.5C15 17.67 15.67 17 16.5 17C17.33 17 18 17.67 18 18.5M9 18.5C9 19.33 8.33 20 7.5 20C6.67 20 6 19.33 6 18.5C6 17.67 6.67 17 7.5 17C8.33 17 9 17.67 9 18.5M20.84 6C20.41 5.38 19.72 5 19 5H15V3C15 2.45 14.55 2 14 2H3C2.45 2 2 2.45 2 3V17H4.33C4.69 15.7 5.94 14.71 7.4 14.71C8.86 14.71 10.11 15.7 10.47 17H14.53C14.89 15.7 16.14 14.71 17.6 14.71C19.06 14.71 20.31 15.7 20.67 17H22V8C22 7.28 21.62 6.61 21.16 6.2L20.84 6Z" /></svg>`, 28),
    [TransportMode.TRAIN]: createIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6,17C6,18.1 6.9,19 8,19C9.1,19 10,18.1 10,17C10,15.9 9.1,15 8,15C6.9,15 6,15.9 6,17M14,17C14,18.1 14.9,19 16,19C17.1,19 18,18.1 18,17C18,15.9 17.1,15 16,15C14.9,15 14,15.9 14,17M20,6C21.1,6 22,6.9 22,8V16C22,17.1 21.1,18 20,18H18.5L17.5,21H6.5L5.5,18H4C2.9,18 2,17.1 2,16V8C2,6.9 2.9,6 4,6H20M4,8V14H20V8H4Z" /></svg>`, 28),
    [TransportMode.PLANE]: createIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" /></svg>`, 28),
};

const warehouseIcon = createIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 21H2V19.5C2 17.57 3.57 16 5.5 16H6V10H4V8L12 3L20 8V10H18V16H18.5C20.43 16 22 17.57 22 19.5V21ZM16 16H8V10H16V16Z" /></svg>`, 40);
const selectedWarehouseIcon = createIcon(`<div style="font-size: 44px; color: #34d399; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">${`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 21H2V19.5C2 17.57 3.57 16 5.5 16H6V10H4V8L12 3L20 8V10H18V16H18.5C20.43 16 22 17.57 22 19.5V21ZM16 16H8V10H16V16Z" /></svg>`}</div>`, 44);

const InventoryMap: React.FC<InventoryMapProps> = ({ warehouses, inTransitStock, selectedWarehouse, onWarehouseSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const warehouseMarkersRef = useRef<any>({});

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([51.1657, 10.4515], 5); // Center of Europe
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);
      mapRef.current = map;
    }
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old warehouse markers
    Object.values(warehouseMarkersRef.current).forEach((marker: any) => marker.remove());
    warehouseMarkersRef.current = {};

    warehouses.forEach(warehouse => {
      const isSelected = selectedWarehouse?.id === warehouse.id;
      const marker = L.marker([warehouse.location.latitude, warehouse.location.longitude], { 
          icon: isSelected ? selectedWarehouseIcon : warehouseIcon 
      }).addTo(map);
      
      marker.bindPopup(`<b>${warehouse.name}</b><br>${warehouse.city}, ${warehouse.country}`);
      marker.on('click', () => {
        onWarehouseSelect(warehouse);
        map.setView([warehouse.location.latitude, warehouse.location.longitude], 8);
      });
      warehouseMarkersRef.current[warehouse.id] = marker;
    });

  }, [warehouses, onWarehouseSelect]);

  useEffect(() => {
      Object.values(warehouseMarkersRef.current).forEach((marker: any) => {
          marker.setIcon(warehouseIcon);
      });
      if (selectedWarehouse && warehouseMarkersRef.current[selectedWarehouse.id]) {
          warehouseMarkersRef.current[selectedWarehouse.id].setIcon(selectedWarehouseIcon);
          warehouseMarkersRef.current[selectedWarehouse.id].openPopup();
      }
  }, [selectedWarehouse]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const transitLayer = L.layerGroup().addTo(map);

    inTransitStock.forEach(shipment => {
      const marker = L.marker([shipment.currentLocation.latitude, shipment.currentLocation.longitude], {
        icon: transportIcons[shipment.mode]
      }).addTo(transitLayer);
      marker.bindPopup(`<b>Shipment: ${shipment.id}</b><br>Mode: ${shipment.mode}<br>From: ${shipment.origin}<br>To: ${shipment.destination}<br>ETA: ${shipment.eta.toLocaleDateString()}`);
    });

    return () => {
      transitLayer.clearLayers();
    };

  }, [inTransitStock]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default InventoryMap;
