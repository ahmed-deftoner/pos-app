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
  item_data?: ItemData;
  discount_data?: DiscountData;
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

export interface DiscountData {
  name: string;
  discount_type: string;
  amount_money: AmountMoney;
  application_method: string;
  modify_tax_basis: string;
}

export interface AmountMoney {
  amount: number;
  currency: string;
}
