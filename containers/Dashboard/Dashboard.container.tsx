"use client";
import { IProduct } from "@/types/product.types";
import SideDrawer from "@/components/composites/side-drawer";
import ProductCard from "@/components/composites/product-card";
import { useState } from "react";

export default function DashboardPage({ products }: { products: IProduct[] }) {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  const increment = (product: IProduct) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const decrement = (product: IProduct) => {
    const index = selectedProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const newList = [...selectedProducts];
      newList.splice(index, 1);
      setSelectedProducts(newList);
    }
  };

  // Count occurrences of each product
  const getProductCounts = () => {
    const map = new Map<string, { product: IProduct; count: number }>();
    selectedProducts.forEach((p) => {
      if (map.has(p.id)) {
        map.get(p.id)!.count++;
      } else {
        map.set(p.id, { product: p, count: 1 });
      }
    });
    return Array.from(map.values());
  };

  return (
    <div className="min-h-screen bg-black rounded-b-2xl shadow-2xl">
      <div className="p-4 flex items-center w-fit">
        <SideDrawer
          selectedProducts={selectedProducts}
          getProductCounts={getProductCounts}
          decrement={decrement}
          increment={increment}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0d1117] p-24">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        ))}
      </div>
    </div>
  );
}
