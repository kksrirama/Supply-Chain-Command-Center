
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Inventory {
  productId: string;
  stockOnHand: number;
  safetyStock: number;
  reorderPoint: number;
  localDemand: number;
}

export interface Warehouse {
  id: string;
  name: string;
  city: string;
  country: string;
  location: Coordinates;
  inventory: Inventory[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
}

// FIX: Define and export ExternalEvent and related types.
export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
  web?: {
    uri: string;
    title: string;
  };
}

export interface ExternalEvent {
  summary: string;
  sources: GroundingChunk[];
}


export enum TransportMode {
  TRUCK = 'Truck',
  TRAIN = 'Train',
  PLANE = 'Plane',
}

export interface InTransitShipment {
  id: string;
  productId: string;
  quantity: number;
  mode: TransportMode;
  currentLocation: Coordinates;
  origin: string;
  destination: string;
  eta: Date;
}