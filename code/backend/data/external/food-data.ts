import { IFoodData } from "../../domain/interfaces";
import { ConsumedFood, Day, User } from "../../domain/types";
import getDate from "../../utils/functions/app/getDate";
import { mongodbHandler } from "../../utils/functions/data";
import { UserModel } from "./mongoose";

const fields =
  "id,product_name,product_name_en,image_front_url,quantity,product_quantity,product_quantity_unit,brands_tags,nutriscore_grade";

export class FoodData implements IFoodData {
  async searchByName(query: string, skip: number, limit: number) {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&fields=${fields},nutriments&json=1`
      );
      const { products } = await res.json();
      return products;
  }

  async searchByBarcode(barcode: number) {
    const res = await fetch(
      `https://world.openfoodfacts.net/api/v2/product/${barcode}`
    );
    const { product } = await res.json();
    return product;
  }
}