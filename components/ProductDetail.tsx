import React, { useMemo } from 'react';
import type { Product, Warehouse, InTransitShipment } from '../types';
import Card from './Card';
import { ArrowLeftIcon, ProductIcon, WarehouseIcon } from './Icons';

interface ProductDetailProps {
  product: Product;
  warehouses: Warehouse[];
  inTransitStock: InTransitShipment[];
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, warehouses, inTransitStock, onBack }) => {
  const productData = useMemo(() => {
    let totalStock = 0;
    let totalDemand = 0;
    let healthyWarehouses = 0;
    let atRiskWarehouses = 0;
    let outOfStockWarehouses = 0;

    const warehouseDetails = warehouses.map(w => {
      const pInv = w.inventory.find(inv => inv.productId === product.id);
      if (pInv) {
        totalStock += pInv.stockOnHand;
        totalDemand += pInv.localDemand;

        const isOutOfStock = pInv.stockOnHand <= 0;
        const isAtRisk = pInv.stockOnHand - pInv.localDemand < pInv.safetyStock && !isOutOfStock;
        
        if (isOutOfStock) {
          outOfStockWarehouses++;
          return { ...w, status: 'Out of Stock', stock: pInv.stockOnHand, demand: pInv.localDemand, safetyStock: pInv.safetyStock };
        }
        if (isAtRisk) {
          atRiskWarehouses++;
          return { ...w, status: 'At Risk', stock: pInv.stockOnHand, demand: pInv.localDemand, safetyStock: pInv.safetyStock };
        }
        healthyWarehouses++;
        return { ...w, status: 'Healthy', stock: pInv.stockOnHand, demand: pInv.localDemand, safetyStock: pInv.safetyStock };
      }
      return { ...w, status: 'N/A', stock: 0, demand: 0, safetyStock: 0 };
    }).filter(w => w.status !== 'N/A');

    const daysOfCover = totalDemand > 0 ? (totalStock / totalDemand).toFixed(1) : '∞';
    const totalInTransit = inTransitStock
      .filter(s => s.productId === product.id)
      .reduce((sum, s) => sum + s.quantity, 0);

    return { 
      totalStock, 
      totalDemand, 
      daysOfCover,
      totalInTransit,
      warehouseDetails,
      statuses: { healthy: healthyWarehouses, atRisk: atRiskWarehouses, outOfStock: outOfStockWarehouses }
    };
  }, [product, warehouses, inTransitStock]);

  const totalWarehouses = productData.warehouseDetails.length;
  const statusPercentages = {
      healthy: totalWarehouses > 0 ? (productData.statuses.healthy / totalWarehouses) * 100 : 0,
      atRisk: totalWarehouses > 0 ? (productData.statuses.atRisk / totalWarehouses) * 100 : 0,
      outOfStock: totalWarehouses > 0 ? (productData.statuses.outOfStock / totalWarehouses) * 100 : 0,
  }

  const getStatusColor = (status: string) => {
    if (status === 'Out of Stock') return 'bg-red-500';
    if (status === 'At Risk') return 'bg-yellow-500';
    return 'bg-green-500';
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <button onClick={onBack} className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-white">{product.name}</h1>
        <p className="text-lg text-gray-400">{product.description}</p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPIs */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
                <h4 className="text-gray-400 text-sm font-semibold">Total Stock</h4>
                <p className="text-3xl font-bold text-white">{productData.totalStock.toLocaleString()}</p>
            </Card>
            <Card className="text-center">
                <h4 className="text-gray-400 text-sm font-semibold">Weekly Demand</h4>
                <p className="text-3xl font-bold text-white">{productData.totalDemand.toLocaleString()}</p>
            </Card>
             <Card className="text-center">
                <h4 className="text-gray-400 text-sm font-semibold">Days of Cover</h4>
                <p className="text-3xl font-bold text-white">{productData.daysOfCover}</p>
            </Card>
             <Card className="text-center">
                <h4 className="text-gray-400 text-sm font-semibold">In Transit</h4>
                <p className="text-3xl font-bold text-white">{productData.totalInTransit.toLocaleString()}</p>
            </Card>
        </div>
        
        {/* Warehouse Status */}
        <Card title="Warehouse Status Distribution" icon={<WarehouseIcon className="h-6 w-6 mr-3 text-cyan-400" />}>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-green-400">Healthy</span>
                        <span>{productData.statuses.healthy} / {totalWarehouses}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${statusPercentages.healthy}%`}}></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-yellow-400">At Risk</span>
                        <span>{productData.statuses.atRisk} / {totalWarehouses}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: `${statusPercentages.atRisk}%`}}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-red-400">Out of Stock</span>
                        <span>{productData.statuses.outOfStock} / {totalWarehouses}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{width: `${statusPercentages.outOfStock}%`}}></div>
                    </div>
                </div>
            </div>
        </Card>

        {/* Inventory Table */}
        <div className="lg:col-span-2">
          <Card title="Detailed Inventory by Warehouse" icon={<ProductIcon className="h-6 w-6 mr-3 text-cyan-400" />}>
            <div className="overflow-x-auto max-h-[450px]">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700 sticky top-0">
                  <tr>
                    <th scope="col" className="px-4 py-3">Warehouse</th>
                    <th scope="col" className="px-4 py-3 text-center">Stock on Hand</th>
                    <th scope="col" className="px-4 py-3 text-center">Weekly Demand</th>
                    <th scope="col" className="px-4 py-3 text-center">Safety Stock</th>
                    <th scope="col" className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.warehouseDetails.map(w => (
                    <tr key={w.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                        {w.name}
                        <p className="text-xs text-gray-400">{w.city}</p>
                      </td>
                      <td className="px-4 py-3 text-center font-mono">{w.stock.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center font-mono">{w.demand.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center font-mono">{w.safetyStock.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full text-gray-900 ${getStatusColor(w.status)}`}>
                            {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;