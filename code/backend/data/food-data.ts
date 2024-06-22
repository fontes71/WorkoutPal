import { IFoodData } from "../domain/interfaces";
import getSearchByNameApiUrl from "../utils/functions/app/getSearchByNameApiUrl";
import getSearchByBarcodeApiUrl from "../utils/functions/app/getSearchByBarcodeApiUrl";

export class FoodData implements IFoodData {
  async searchByName(query: string, page: number, limit: number) {
    const res = await fetch(getSearchByNameApiUrl(query, page, limit));
    const { products } = await res.json();
    return products;
  }

  async searchByBarcode(barcode: number) {
    const res = await fetch(getSearchByBarcodeApiUrl(barcode));
    const { product } = await res.json();
    return product;
  }
}
