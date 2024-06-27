import { Food, FoodFactsApiFood } from "../../../domain/types";


const getNutrimentAndUnit = (nutriments: any, nutrimentName: string) => {
  const nutriment = nutriments[`${nutrimentName}_100g`]
  if (!nutriment)
    return null

  const nutrimentUnit = nutriments[`${nutrimentName}_unit`]

  return `${Math.round(nutriment)}${nutrimentUnit}`
}

export const apiFoodToFood = (apiFood: FoodFactsApiFood) => {
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
      nutriscore_grade
    } = apiFood;

    const brand = brands_tags ? brands_tags[0] : "";
    const customName = product_name || product_name_en;
    const quantiyUnit = product_quantity_unit ? product_quantity_unit : 'g'

    return {
      id: id,
      name: customName,
      brand: brand,
      quantity: product_quantity,
      quantityUnit: quantiyUnit,
      imageUrl: image_front_url,
      calories: nutriments["energy-kcal"],
      protein: getNutrimentAndUnit(nutriments, "proteins"),
      fat: getNutrimentAndUnit(nutriments, "fat"),
      carbs: getNutrimentAndUnit(nutriments, "carbohydrates"),
      fiber: getNutrimentAndUnit(nutriments, "fiber"),
      saturatedFat: getNutrimentAndUnit(nutriments, "saturated-fat"),
      salt: getNutrimentAndUnit(nutriments, "salt"),
      sodium: getNutrimentAndUnit(nutriments, "sodium"),
      sugars: getNutrimentAndUnit(nutriments, "sugars"),
      nutriscoreGrade: nutriscore_grade
    };
  };
