import DashboardContainer from "@/containers/Dashboard/Dashboard.container";
import { ProductService } from "@/services/products.service";
import { IProduct } from "@/types/product.types";

export default async function Products() {
  const products = await ProductService.getProducts();

  const productsData: IProduct[] = products?.objects
    ? await Promise.all(
        products.objects
          .filter((i) => i.item_data)
          .map(async (i) => {
            const img = await ProductService.retrieveProduct(
              i.item_data?.image_ids[0] ?? ""
            );
            return {
              id: i.id,
              name: i.item_data?.name,
              description: i.item_data?.description,
              price:
                i.item_data?.variations[0].item_variation_data.price_money
                  .amount,
              image: img?.object.image_data.url,
              stock: i.item_data?.variations[0].item_variation_data.stockable
                ? i.item_data?.variations[0].item_variation_data.stockable
                : 0,
            } as IProduct;
          })
      )
    : [];

  return <DashboardContainer products={productsData} />;
}
