import axios from "axios";
import DashboardContainer from "@/containers/Dashboard/Dashboard.container";

export type IProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  count: number;
};

export interface CatalogResponse {
  objects: CatalogObject[];
}

export interface RetrieveCatalogObjectResponse {
  object: RetieveCatalogObject;
}

export interface CatalogObject {
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  item_data: ItemData;
}

export interface RetieveCatalogObject {
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  image_data: ImageData;
}

export interface ImageData {
  name: string;
  url: string;
}

export interface ItemData {
  name: string;
  description: string;
  is_taxable: boolean;
  variations: Variation[];
  product_type: string;
  skip_modifier_screen: boolean;
  image_ids: string[];
  description_html: string;
  description_plaintext: string;
  is_archived: boolean;
  is_alcoholic: boolean;
}

export interface Variation {
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  item_variation_data: ItemVariationData;
}

export interface ItemVariationData {
  item_id: string;
  name: string;
  ordinal: number;
  pricing_type: string;
  price_money: PriceMoney;
  location_overrides: LocationOverride[];
  track_inventory: boolean;
  sellable: boolean;
  stockable: boolean;
}

export interface PriceMoney {
  amount: number;
  currency: string;
}

export interface LocationOverride {
  location_id: string;
  track_inventory: boolean;
}

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://connect.squareupsandbox.com/v2/catalog/list",
      {
        headers: {
          "Square-Version": "2025-07-16",
          Authorization:
            "Bearer EAAAl2ekHbsNYNEsQrtT1ZCKS7TekB5I-k8brdFpYG1urAmXQU8Awk6Fuc98EWbl",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as CatalogResponse;
  } catch (error) {
    console.error("Error fetching catalog:", error);
  }
};

const retrieveProduct = async (id: string) => {
  const response = await axios.get(
    `https://connect.squareupsandbox.com/v2/catalog/object/${id}`,
    {
      headers: {
        "Square-Version": "2025-07-16",
        Authorization:
          "Bearer EAAAl2ekHbsNYNEsQrtT1ZCKS7TekB5I-k8brdFpYG1urAmXQU8Awk6Fuc98EWbl",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data as RetrieveCatalogObjectResponse;
};

export default async function Products() {
  const products = await getProducts();

  const productsData = products?.objects
    ? await Promise.all(
        products.objects.map(async (i) => {
          const img = await retrieveProduct(i.item_data.image_ids[0]);
          return {
            id: i.id,
            name: i.item_data.name,
            description: i.item_data.description,
            price:
              i.item_data.variations[0].item_variation_data.price_money.amount,
            image: img.object.image_data.url,
            stock: i.item_data.variations[0].item_variation_data.stockable
              ? i.item_data.variations[0].item_variation_data.stockable
              : 0,
          } as IProduct;
        })
      )
    : [];

  console.log(productsData);

  return <DashboardContainer products={productsData} />;
}
