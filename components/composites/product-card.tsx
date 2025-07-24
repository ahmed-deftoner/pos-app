"use client";
import { IProduct } from "@/types/product.types";
import { Button } from "../primitives/button";
import { Card, CardContent, CardFooter, CardHeader } from "../primitives/card";
import { useMemo } from "react";

export default function ProductCard({
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
