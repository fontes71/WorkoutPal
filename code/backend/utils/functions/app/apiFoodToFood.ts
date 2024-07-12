import { Food, FoodFactsApiFood, MainNutrients, MainNutrientsBeforeNullCheck, ValueAndUnit } from "../../../domain/types";




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
    

    const mainNutrients = getMainNutrients(nutriments)
    const secondaryNutrients = getSecondaryNutrients(nutriments)
    const name = product_name || product_name_en
    const brand = brands_tags && brands_tags.length > 0 ? brands_tags[0] : null
    const quantity = product_quantity != null ? parseInt(product_quantity) : null

    if (invalidFoodItem(name, brand, quantity, product_quantity_unit, image_front_url, mainNutrients))
      return null
 

    
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

  const VALID_UNITS = [ "kg", "g", "mg", "µg", "l", "ml" ];

  const invalidFoodItem = (name: string | null, brand: string | null, quantity: number | null, quantityUnit: string | null, image: string | null, mainNutrients: MainNutrientsBeforeNullCheck) => {
    const requiredFields = [name, brand, quantity, quantityUnit, quantityUnit, image, mainNutrients?.calories, mainNutrients?.carbs, mainNutrients?.protein, mainNutrients?.fat];
    if (requiredFields.some(field => !field)) return true;
  
    if (!VALID_UNITS.includes(quantityUnit as string))
      return true
  
    return false 
  }

const gradeOrNull = (grade: string) => grade == "uknown" || grade == 'not-applicable' ? null : grade

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
      value: nutrient,
      unit: nutrientUnit
    }
  }