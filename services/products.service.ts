import {
  CatalogResponse,
  RetrieveCatalogObjectResponse,
} from "@/types/sqaure.types";
import axios from "axios";

export class ProductService {
  static BASE_URL = "https://connect.squareupsandbox.com/v2";
  static SQUARE_VERSION = "2025-07-16";
  static AUTHORIZATION =
    "Bearer EAAAl2ekHbsNYNEsQrtT1ZCKS7TekB5I-k8brdFpYG1urAmXQU8Awk6Fuc98EWbl";

  static async getProducts() {
    try {
      const response = await axios.get(`${this.BASE_URL}/catalog/list`, {
        headers: {
          "Square-Version": this.SQUARE_VERSION,
          Authorization: this.AUTHORIZATION,
          "Content-Type": "application/json",
        },
      });
      return response.data as CatalogResponse;
    } catch (error) {
      console.error("Error fetching catalog:", error);
    }
  }

  static async retrieveProduct(id: string) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/catalog/object/${id}`,
        {
          headers: {
            "Square-Version": this.SQUARE_VERSION,
            Authorization: this.AUTHORIZATION,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data as RetrieveCatalogObjectResponse;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
}
