
import type { Product, Warehouse } from './types';

export const PRODUCTS: Product[] = [
  { id: 'P1', name: 'Eco-Clean Detergent', description: 'Concentrated laundry detergent' },
  { id: 'P2', name: 'Sunrise Shampoo', description: 'Invigorating daily shampoo' },
  { id: 'P3', name: 'Gourmet Pasta Sauce', description: 'Classic tomato and basil sauce' },
  { id: 'P4', name: 'Velvet-Touch Soap', description: 'Moisturizing bar soap' },
  { id: 'P5', name: 'Sparkle Toothpaste', description: 'Whitening fluoride toothpaste' },
];

export const WAREHOUSES: Omit<Warehouse, 'inventory'>[] = [
    { id: 'W1', name: 'Rotterdam Central', city: 'Rotterdam', country: 'Netherlands', location: { latitude: 51.9244, longitude: 4.4777 } },
    { id: 'W2', name: 'Hamburg Logistics', city: 'Hamburg', country: 'Germany', location: { latitude: 53.5511, longitude: 9.9937 } },
    { id: 'W3', name: 'Antwerp Hub', city: 'Antwerp', country: 'Belgium', location: { latitude: 51.2194, longitude: 4.4025 } },
    { id: 'W4', name: 'Le Havre Distribution', city: 'Le Havre', country: 'France', location: { latitude: 49.4944, longitude: 0.1079 } },
    { id: 'W5', name: 'Valencia Gateway', city: 'Valencia', country: 'Spain', location: { latitude: 39.4699, longitude: -0.3763 } },
    { id: 'W6', name: 'Genoa Portside', city: 'Genoa', country: 'Italy', location: { latitude: 44.4056, longitude: 8.9463 } },
    { id: 'W7', name: 'Warsaw East', city: 'Warsaw', country: 'Poland', location: { latitude: 52.2297, longitude: 21.0122 } },
    { id: 'W8', name: 'Prague Connect', city: 'Prague', country: 'Czech Republic', location: { latitude: 50.0755, longitude: 14.4378 } },
    { id: 'W9', name: 'Copenhagen North', city: 'Copenhagen', country: 'Denmark', location: { latitude: 55.6761, longitude: 12.5683 } },
    { id: 'W10', name: 'Dublin West', city: 'Dublin', country: 'Ireland', location: { latitude: 53.3498, longitude: -6.2603 } },
    { id: 'W11', name: 'Madrid Central', city: 'Madrid', country: 'Spain', location: { latitude: 40.4168, longitude: -3.7038 } },
    { id: 'W12', name: 'Berlin South', city: 'Berlin', country: 'Germany', location: { latitude: 52.5200, longitude: 13.4050 } },
    { id: 'W13', name: 'Paris Logistics', city: 'Paris', country: 'France', location: { latitude: 48.8566, longitude: 2.3522 } },
    { id: 'W14', name: 'Rome Distribution', city: 'Rome', country: 'Italy', location: { latitude: 41.9028, longitude: 12.4964 } },
    { id: 'W15', name: 'Vienna Hub', city: 'Vienna', country: 'Austria', location: { latitude: 48.2082, longitude: 16.3738 } },
    { id: 'W16', name: 'Budapest Gateway', city: 'Budapest', country: 'Hungary', location: { latitude: 47.4979, longitude: 19.0402 } },
    { id: 'W17', name: 'Stockholm Port', city: 'Stockholm', country: 'Sweden', location: { latitude: 59.3293, longitude: 18.0686 } },
    { id: 'W18', name: 'Lisbon Connect', city: 'Lisbon', country: 'Portugal', location: { latitude: 38.7223, longitude: -9.1393 } },
    { id: 'W19', name: 'Athens South', city: 'Athens', country: 'Greece', location: { latitude: 37.9838, longitude: 23.7275 } },
    { id: 'W20', name: 'Frankfurt Main', city: 'Frankfurt', country: 'Germany', location: { latitude: 50.1109, longitude: 8.6821 } }
];
