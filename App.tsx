import React, { useState, useEffect, useCallback } from 'react';
import { getWarehouses, getProducts, getInTransitStock } from './services/dataService';
import type { Warehouse, Product, InTransitShipment } from './types';
import Header from './components/Header';
import InventoryMap from './components/InventoryMap';
import ProductMetrics from './components/ProductMetrics';
import WarehouseStatus from './components/WarehouseStatus';
import ProductDetail from './components/ProductDetail';

export default function App() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inTransitStock, setInTransitStock] = useState<InTransitShipment[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

  const loadData = useCallback(() => {
    setWarehouses(getWarehouses());
    setProducts(getProducts());
    setInTransitStock(getInTransitStock());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (detailedProduct) {
    return (
      <ProductDetail 
        product={detailedProduct}
        warehouses={warehouses}
        inTransitStock={inTransitStock}
        onBack={() => setDetailedProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 h-[60vh] rounded-lg overflow-hidden shadow-2xl border border-gray-700">
           <InventoryMap 
            warehouses={warehouses} 
            inTransitStock={inTransitStock} 
            selectedWarehouse={selectedWarehouse}
            onWarehouseSelect={setSelectedWarehouse}
          />
        </div>

        <ProductMetrics 
          products={products} 
          warehouses={warehouses}
          onProductSelect={setDetailedProduct}
        />

        <WarehouseStatus 
          warehouses={warehouses}
          products={products}
          onWarehouseSelect={setSelectedWarehouse}
        />

      </main>
    </div>
  );
}