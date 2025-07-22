"use client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { IProduct } from "@/app/products/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      {/* Top Bar with Drawer Trigger */}
      <div className="p-4 flex items-center w-fit">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Menu size={28} className="text-white cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent className="bg-black text-white border-none">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-white">Your Cart</DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="h-[80vh] w-[350px] p-4">
                <div className="flex-1 overflow-y-auto p-4 pb-0">
                  {selectedProducts.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {getProductCounts().map(({ product, count }) => (
                        <div
                          key={product.id}
                          className="flex flex-col gap-1 items-center"
                        >
                          <div className="flex flex-col items-center justify-between my-6">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-34 object-center"
                            />
                            <div className="flex items-center gap-2 my-6">
                              <p>{product.name}</p>
                            </div>
                            <p>${product.price.toLocaleString()}</p>
                          </div>
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between my-6">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white bg-black text-white"
                              onClick={() => decrement(product)}
                            >
                              −
                            </Button>
                            <span className="text-sm mx-6">{count}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white bg-black text-white"
                              onClick={() => increment(product)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400">
                      No products in cart
                    </p>
                  )}
                </div>
              </ScrollArea>
              <DrawerFooter>
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Checkout
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Product Grid */}
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

function ProductCard({
  product,
  selectedProducts,
  setSelectedProducts,
}: {
  product: IProduct;
  selectedProducts: IProduct[];
  setSelectedProducts: (products: IProduct[]) => void;
}) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  // Count how many times this product appears in selectedProducts
  const quantity = useMemo(() => {
    return selectedProducts.filter((p) => p.id === product.id).length;
  }, [selectedProducts, product.id]);

  const increment = () => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const decrement = () => {
    const index = selectedProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const newList = [...selectedProducts];
      newList.splice(index, 1);
      setSelectedProducts(newList);
    }
  };

  return (
    <Card className="flex flex-col justify-between w-full max-w-sm bg-black text-white">
      <CardHeader className="flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-96 object-cover object-center"
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          {product.name}
        </h1>

        <div className="relative text-sm leading-6 line-clamp-3">
          <p className={`transition-all duration-300`}>{product.description}</p>
        </div>

        <h2 className="text-right text-lg font-semibold mt-2">
          {formattedPrice}
        </h2>
      </CardContent>

      <CardFooter className="mt-auto pt-4">
        {quantity === 0 ? (
          <Button
            className="w-full border-2 border-white cursor-pointer"
            onClick={increment}
          >
            Add to cart
          </Button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white bg-black text-white"
              onClick={decrement}
            >
              −
            </Button>
            <span className="text-sm mx-6">{quantity}</span>
            <Button
              size="sm"
              variant="outline"
              className="border-white bg-black text-white"
              onClick={increment}
            >
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
