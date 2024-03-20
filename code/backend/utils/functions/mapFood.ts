import { FoodFactsApiFood } from "../../domain/types";



/*
const removeStringIfItsInTheName = (name: string, string: string) =>
  name.toLowerCase().split(" ").includes(string.toLowerCase()) ? "" : string

const addHyphenOrNot = (condition: boolean, string: string) => condition ? ` - ${string}` : ``

const stringNotEmpty = (string: string) => string != ""

const getFoodName = (
  product_name: string,
  product_name_en: string,
  brands_tags: string[],
  quantity: string
) => {
    const nameString = product_name || product_name_en;
    let brandString = "";
    let quantityString = "";

    const brand = brands_tags[0]
    if (brand) {
        brandString = removeStringIfItsInTheName(nameString, brand)
        brandString = addHyphenOrNot(stringNotEmpty(nameString) && stringNotEmpty(brandString), brandString)
    }

    if (!nameString && !brandString)
        return null

    
    if (quantity) {
        quantityString = removeStringIfItsInTheName(nameString, quantity)
        quantityString = addHyphenOrNot(stringNotEmpty(quantityString), quantityString)
    }

  return capitalizeWords(nameString + brandString + quantityString) 
};

export const mapFood = (foodFactsApiFood: FoodFactsApiFood[]) => foodFactsApiFood.map((apiFood) => ({
    id: apiFood.id,
    name: getFoodName(
      apiFood.product_name,
      apiFood.product_name_en,
      apiFood.brands_tags,
      apiFood.quantity
    ),
    nutriscore: apiFood.nutriscore_data
  })).filter((food) => food.name != null);

  */



const stringIsInTheName = (name: string, string: string) => name.toLowerCase().split(" ").includes(string.toLowerCase()) 


  const formatProperty = (name: string, string: string) => stringIsInTheName(name, string) ? "" : string

  export const mapFood = (foodFactsApiFood: FoodFactsApiFood[]) => foodFactsApiFood.map((apiFood) => {
    const { brands_tags: [brand], quantity, product_name, product_name_en, id, image_front_thumb_url, nutriments } = apiFood;

    const nameString = product_name || product_name_en
    const brandString =  brand ? formatProperty(nameString, brand) : ""
    const quantityString = quantity ? formatProperty(nameString, quantity) : ""

    return {
    id: id,
    name: nameString,
    brand: brandString,
    quantity:  quantityString,
    imageUrl: image_front_thumb_url,
    calories: nutriments["energy-kcal"]
  }
})
