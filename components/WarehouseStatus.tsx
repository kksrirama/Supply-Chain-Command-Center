
import React from 'react';
import type { Warehouse, Product } from '../types';
import Card from './Card';
import { ListIcon, AlertTriangleIcon } from './Icons';

interface WarehouseStatusProps {
  warehouses: Warehouse[];
  products: Product[];
  onWarehouseSelect: (warehouse: Warehouse) => void;
}

const WarehouseStatus: React.FC<WarehouseStatusProps> = ({ warehouses, products, onWarehouseSelect }) => {
  return (
    <Card title="Warehouse Inventory Status" icon={<ListIcon className="h-6 w-6 mr-3 text-cyan-400" />}>
      <div className="overflow-x-auto max-h-[600px]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3">Warehouse</th>
              {products.map(p => (
                <th key={p.id} scope="col" className="px-4 py-3 text-center">{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {warehouses.map(w => (
              <tr key={w.id} className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer" onClick={() => onWarehouseSelect(w)}>
                <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                  {w.name}
                  <p className="text-xs text-gray-400">{w.city}</p>
                </td>
                {w.inventory.map(inv => {
                  const isAtRisk = inv.stockOnHand - inv.localDemand < inv.safetyStock;
                  const isOutOfStock = inv.stockOnHand <= 0;
                  const stockColor = isOutOfStock ? 'bg-red-900 text-red-300' : isAtRisk ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900/50 text-green-300';
                  
                  return (
                    <td key={`${w.id}-${inv.productId}`} className="px-4 py-3 text-center">
                        <div className={`flex items-center justify-center p-2 rounded-md ${stockColor}`}>
                            <span className="font-mono font-semibold">{inv.stockOnHand}</span>
                            {(isAtRisk || isOutOfStock) && <AlertTriangleIcon className="h-4 w-4 ml-2" />}
                        </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default WarehouseStatus;
