
import type { Warehouse, Product, InTransitShipment } from '../types';
import { TransportMode } from '../types';
import { PRODUCTS, WAREHOUSES } from '../constants';

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getProducts = (): Product[] => {
  return PRODUCTS;
};

export const getWarehouses = (): Warehouse[] => {
  return WAREHOUSES.map(warehouse => {
    const inventory = PRODUCTS.map(product => {
      const stockOnHand = getRandomInt(50, 500);
      const safetyStock = getRandomInt(20, 50);
      const localDemand = getRandomInt(10, 40);
      return {
        productId: product.id,
        stockOnHand,
        safetyStock,
        reorderPoint: safetyStock + 20,
        localDemand,
      };
    });
    return { ...warehouse, inventory };
  });
};

export const getInTransitStock = (): InTransitShipment[] => {
  const shipments: InTransitShipment[] = [];
  for (let i = 0; i < 8; i++) {
    const origin = WAREHOUSES[getRandomInt(0, WAREHOUSES.length - 1)];
    let destination = WAREHOUSES[getRandomInt(0, WAREHOUSES.length - 1)];
    while (destination.id === origin.id) {
        destination = WAREHOUSES[getRandomInt(0, WAREHOUSES.length - 1)];
    }

    // A point somewhere between origin and destination
    const progress = Math.random();
    const currentLocation = {
        latitude: origin.location.latitude + (destination.location.latitude - origin.location.latitude) * progress + (Math.random() - 0.5) * 1.5,
        longitude: origin.location.longitude + (destination.location.longitude - origin.location.longitude) * progress + (Math.random() - 0.5) * 1.5,
    };

    const product = PRODUCTS[getRandomInt(0, PRODUCTS.length - 1)];
    const modes = [TransportMode.TRUCK, TransportMode.TRAIN, TransportMode.PLANE];
    shipments.push({
      id: `T${1000 + i}`,
      productId: product.id,
      quantity: getRandomInt(20, 100),
      mode: modes[getRandomInt(0, 2)],
      currentLocation,
      origin: origin.city,
      destination: destination.city,
      eta: new Date(Date.now() + getRandomInt(1, 5) * 24 * 60 * 60 * 1000),
    });
  }
  return shipments;
};
