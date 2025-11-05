import React from 'react';
import type { Product, Warehouse } from '../types';
import Card from './Card';
import { ProductIcon } from './Icons';

interface ProductMetricsProps {
  products: Product[];
  warehouses: Warehouse[];
  onProductSelect: (product: Product) => void;
}

const ProductMetrics: React.FC<ProductMetricsProps> = ({ products, warehouses, onProductSelect }) => {
  const getProductData = (productId: string) => {
    let totalStock = 0;
    let totalDemand = 0;
    let atRiskWarehouses = 0;

    warehouses.forEach(w => {
      const pInv = w.inventory.find(inv => inv.productId === productId);
      if (pInv) {
        totalStock += pInv.stockOnHand;
        totalDemand += pInv.localDemand;
        if (pInv.stockOnHand - pInv.localDemand < pInv.safetyStock) {
          atRiskWarehouses++;
        }
      }
    });

    const daysOfCover = totalDemand > 0 ? (totalStock / totalDemand).toFixed(1) : '∞';

    return { totalStock, totalDemand, atRiskWarehouses, daysOfCover };
  };

  return (
    <Card title="Top 5 Product Inventory Health" icon={<ProductIcon className="h-6 w-6 mr-3 text-cyan-400" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map(product => {
          const { totalStock, totalDemand, atRiskWarehouses, daysOfCover } = getProductData(product.id);
          const riskColor = atRiskWarehouses > 5 ? 'text-red-400' : atRiskWarehouses > 0 ? 'text-yellow-400' : 'text-green-400';

          return (
            <div 
              key={product.id} 
              className="bg-gray-700/50 p-4 rounded-lg flex flex-col justify-between cursor-pointer hover:bg-gray-700/80 hover:scale-105 transition-all duration-200"
              onDoubleClick={() => onProductSelect(product)}
              title="Double-click for details"
            >
              <div>
                <h4 className="font-bold text-md text-gray-100">{product.name}</h4>
                <p className="text-xs text-gray-400">{product.description}</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-300">Total Stock:</span>
                  <span className="font-semibold text-white">{totalStock.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-300">Weekly Demand:</span>
                  <span className="font-semibold text-white">{totalDemand.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between items-baseline">
                  <span className="text-gray-300">Days of Cover:</span>
                  <span className="font-semibold text-white">{daysOfCover}</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-gray-300">At-Risk Sites:</span>
                  <span className={`font-bold text-lg ${riskColor}`}>{atRiskWarehouses}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProductMetrics;