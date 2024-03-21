
import { IFoodData } from "../../domain/interfaces";
import { mongodbHandler } from "../../utils/functions/data";

export class FoodData implements IFoodData {
  searchFood(query: string, skip: number, limit: number) {
    return mongodbHandler(async () => {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&fields=id,product_name,product_name_en,image_front_url,quantity,brands_tags,nutriments&json=1`
      );
      const { products } = await res.json();
      return products;
    });
  }
}
