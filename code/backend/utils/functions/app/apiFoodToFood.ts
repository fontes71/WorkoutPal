import { Food, FoodFactsApiFood, ValueAndUnit } from "../../../domain/types";


const getNutrient = (nutrients: any, nutrientName: string): ValueAndUnit | null => {
  const nutrient = nutrients[`${nutrientName}_100g`]
  if (!nutrient)
    return null

  const nutrientUnit = nutrients[`${nutrientName}_unit`]

  return {
    value: Math.round(nutrient),
    unit: nutrientUnit
  }
}

export const apiFoodToFood = (apiFood: FoodFactsApiFood) => {
    const {
      brands_tags,
      product_quantity,
      product_quantity_unit,
      product_name,
      product_name_en,
      id,
      image_front_url,
      nutriments,
      nutriscore_grade
    } = apiFood;

    const brand = brands_tags ? brands_tags[0] : "";
    const customName = product_name || product_name_en;
    const quantiyUnit = product_quantity_unit ? product_quantity_unit : 'g'
    const customQuantity: ValueAndUnit = {
      value: parseInt(product_quantity),
      unit: quantiyUnit
    }

    return {
      id: id,
      name: customName,
      brand: brand,
      quantity: customQuantity,
      imageUrl: image_front_url,
      calories: nutriments["energy-kcal"],
      protein: getNutrient(nutriments, "proteins"),
      fat: getNutrient(nutriments, "fat"),
      carbs: getNutrient(nutriments, "carbohydrates"),
      fiber: getNutrient(nutriments, "fiber"),
      saturatedFat: getNutrient(nutriments, "saturated-fat"),
      salt: getNutrient(nutriments, "salt"),
      sodium: getNutrient(nutriments, "sodium"),
      sugars: getNutrient(nutriments, "sugars"),
      nutriscoreGrade: nutriscore_grade
    };
  };
