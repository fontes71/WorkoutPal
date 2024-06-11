import { IFoodData } from "../domain/interfaces";
import { ConsumedFood, Day, User } from "../domain/types";
import getDate from "../utils/functions/app/getDate";
import { mongodbHandler } from "../utils/functions/data";
import { UserModel } from "../mongoose/schemas";
import getSearchByNameApiUrl from "../utils/functions/app/getSearchByNameApiUrl";
import getSearchByBarcodeApiUrl from "../utils/functions/app/getSearchByBarcodeApiUrl";

export class FoodData implements IFoodData {
  async searchByName(query: string, skip: number, limit: number) {
    console.log("FETCHING")
    const res = await fetch(getSearchByNameApiUrl(query));
    const { products } = await res.json();
    console.log("FETCHED")
    return products;
  }

  async searchByBarcode(barcode: number) {
    const res = await fetch(getSearchByBarcodeApiUrl(barcode));
    const { product } = await res.json();
    return product;
  }
}
