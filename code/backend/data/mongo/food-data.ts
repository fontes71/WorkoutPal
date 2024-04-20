import { IFoodData } from "../../domain/interfaces";
import { ConsumedFood, Day, User } from "../../domain/types";
import getDate from "../../utils/functions/app/getDate";
import { mongodbHandler } from "../../utils/functions/data";
import { UserModel } from "./mongoose";

const fields =
  "id,product_name,product_name_en,image_front_url,quantity,product_quantity,product_quantity_unit,brands_tags,nutriscore_grade";

export class FoodData implements IFoodData {
  searchFood(query: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&fields=${fields},nutriments&json=1`
      );
      const { products } = await res.json();
      return products;
    });
  }
}