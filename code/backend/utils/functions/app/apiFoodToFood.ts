import { Food, FoodFactsApiFood, ValueAndUnit } from "../../../domain/types";


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
    console.log("apiFood => ",    brands_tags,
      product_quantity,
      product_quantity_unit,
      product_name,
      product_name_en,
      id,
      image_front_url,
      nutriments,
      nutriscore_grade)
    

    const mainNutrients = getMainNutrients(nutriments)
    const secondaryNutrients = getSecondaryNutrients(nutriments)
    const name = product_name || product_name_en
    const brand = brands_tags && brands_tags.length > 0 ? brands_tags[0] : null


   const requiredFields = [name, brands_tags, product_quantity, product_quantity_unit, image_front_url, mainNutrients.calories, mainNutrients.carbs, mainNutrients.protein, mainNutrients.fat];
   if (requiredFields.some(field => !field)) return null;

    
    const customQuantity: ValueAndUnit = {
      value: parseInt(product_quantity),
      unit: product_quantity_unit
    }

    return {
      id: id,
      name: capitalizeWords(name),
      brand: capitalizeWords(brand),
      quantity: customQuantity,
      imageUrl: image_front_url,
      mainNutrients: mainNutrients,
      secondaryNutrients: secondaryNutrients,
      nutriscoreGrade: gradeOrNull(nutriscore_grade)
    };
  };

const gradeOrNull = (grade: string) => grade == "uknown" ? null : grade

  const capitalizeWords = (str: string | null) => {
    if (str === null) {
      return null;
    }
  
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getMainNutrients = (nutriments: any) => ({
    calories: nutriments["energy-kcal"],
    protein: getNutrient(nutriments, "proteins"),
    fat: getNutrient(nutriments, "fat"),
    carbs: getNutrient(nutriments, "carbohydrates"),
  })

  const getSecondaryNutrients = (nutriments: any) => ({
     fiber: getNutrient(nutriments, "fiber"),
     saturatedFat: getNutrient(nutriments, "saturated-fat"),
     salt: getNutrient(nutriments, "salt"),
     sodium: getNutrient(nutriments, "sodium"),
     sugars: getNutrient(nutriments, "sugars")
  })

  const getNutrient = (nutrients: any, nutrientName: string): ValueAndUnit | null => {
    const nutrient = nutrients[`${nutrientName}_100g`]
    if (!nutrient)
      return null
  
    const nutrientUnit = nutrients[`${nutrientName}_unit`]
  
    if (!nutrientUnit)
      return null
  
    return {
      value: Math.round(nutrient),
      unit: nutrientUnit
    }
  }