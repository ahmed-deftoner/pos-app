import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../primitives/drawer";
import { Button } from "../primitives/button";
import { IProduct } from "@/types/product.types";
import { ScrollArea } from "../primitives/scroll-area";

export default function SideDrawer({
  selectedProducts,
  getProductCounts,
  decrement,
  increment,
}: {
  selectedProducts: IProduct[];
  getProductCounts: () => { product: IProduct; count: number }[];
  decrement: (product: IProduct) => void;
  increment: (product: IProduct) => void;
}) {
  return (
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
                <p className="text-center text-gray-400">No products in cart</p>
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
  );
}
