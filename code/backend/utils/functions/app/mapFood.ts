import { Food, FoodFactsApiFood } from "../../../domain/types";

const stringIsInTheName = (name: string, string: string) =>
  name.toLowerCase().split(" ").includes(string.toLowerCase());

const noValueIfRepeated = (name: string, string: string) =>
  stringIsInTheName(name, string) ? "" : string;

export const mapFood = (foodFactsApiFood: FoodFactsApiFood[]) =>
  foodFactsApiFood.map((apiFood) => {
    const {
      brands_tags,
      quantity,
      product_quantity,
      product_quantity_unit,
      product_name,
      product_name_en,
      id,
      image_front_url,
      nutriments,
    } = apiFood;

    const brand = brands_tags ? brands_tags[0] : "";

    const nameString = product_name || product_name_en;
    const brandString =
      nameString && brand ? noValueIfRepeated(nameString, brand) : brand;
    const quantityToPresent =
      nameString && quantity
        ? noValueIfRepeated(nameString, quantity)
        : quantity;
    const quantiyUnit = product_quantity_unit ? product_quantity_unit : 'g'

    return {
      id: id,
      name: nameString,
      brand: brandString,
      quantityToPresent: quantityToPresent,
      quantity: product_quantity,
      quantityUnit: quantiyUnit,
      imageUrl: image_front_url,
      calories: nutriments["energy-kcal"],
      protein: nutriments["proteins_100g"],
      fat: nutriments["fat_100g"],
      carbs: nutriments["carbohydrates_100g"],
    };
  });
