import UNIT_VALUES from "@/assets/contants/unitValues"
import getDate from "@/assets/functions/getDate";
import { logFood } from "@/services/food";
import { router, useLocalSearchParams } from "expo-router"

export const getFood = () => {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  if (!foodJSON) return null;
  return JSON.parse(foodJSON) as Food;
};

export const updateNutrients = (oldQuantity: ValueAndUnit, newQuantity: ValueAndUnit, setMainNutrients: React.Dispatch<React.SetStateAction<MainNutrients>>, setSecondaryNutrients: React.Dispatch<React.SetStateAction<SecondaryNutrients>>) => {
  const proportion = getProportion(oldQuantity, newQuantity)

 setMainNutrients((mainNutrients) => updatedMainNutrients(mainNutrients, proportion))
 setSecondaryNutrients((secondaryNutrients) => updatedSecondaryNutrients(secondaryNutrients, proportion))
}

const updatedMainNutrients = (nutrients: MainNutrients, proportion: number) => ({
  calories: nutrients.calories * proportion,
  protein: updateMainNutrient(nutrients.protein, proportion),
  fat: updateMainNutrient(nutrients.fat, proportion),
  carbs: updateMainNutrient(nutrients.carbs, proportion),
})

const updatedSecondaryNutrients = (nutrients: SecondaryNutrients, proportion: number) => ({
  fiber: updateSecondaryNutrient(nutrients.fiber, proportion),
  saturatedFat: updateSecondaryNutrient(nutrients.saturatedFat, proportion),
  salt: updateSecondaryNutrient(nutrients.salt, proportion),
  sodium: updateSecondaryNutrient(nutrients.sodium, proportion),
  sugars: updateSecondaryNutrient(nutrients.sugars, proportion),
})


const getProportion = (oldQuantity: ValueAndUnit, newQuantity: ValueAndUnit) => {
  const oldQuantityInBaseUnit = getQuantityInBaseUnit(oldQuantity)
  const newQuantityInBaseUnit = getQuantityInBaseUnit(newQuantity)

  return newQuantityInBaseUnit / oldQuantityInBaseUnit;
}

const getQuantityInBaseUnit = (quantity: ValueAndUnit) => {
  const conversionValue = UNIT_VALUES.find((item) => item.value === quantity.unit)?.conversionValue;
  if (!conversionValue )
    throw Error
  return quantity.value * conversionValue
}

const updateSecondaryNutrient = (nutrient: ValueAndUnit | null, proportion: number) => {
  if (!nutrient)
    return null
  return  { ...nutrient, value: nutrient.value * proportion }
}

const getUpdatedFood = (food: Food, quantity: ValueAndUnit, mainNutrients: MainNutrients, secondaryNutrients: SecondaryNutrients): Food => {
  return {
    ...food,
    quantity,
    mainNutrients,
    secondaryNutrients
  };
}

export const onSave = async (token: string | undefined, food: Food, quantity: ValueAndUnit, mainNutrients: MainNutrients, secondaryNutrients: SecondaryNutrients) => {
  const updatedFood = getUpdatedFood(food, quantity, mainNutrients, secondaryNutrients)
  const date = getDate()
  await logFood(token, updatedFood, date);
  router.push(`/food/`);
};

export const resetIfQuantityValueWasZero = (quantity: ValueAndUnit, baseQuantity: ValueAndUnit, baseMainNutrients: MainNutrients, baseSecondaryNutrients: SecondaryNutrients, setMainNutrients: React.Dispatch<React.SetStateAction<MainNutrients>>, setSecondaryNutrients: React.Dispatch<React.SetStateAction<SecondaryNutrients>>) => {
  if (quantity.value == 0) {
    setMainNutrients(baseMainNutrients);
    setSecondaryNutrients(baseSecondaryNutrients);
    return baseQuantity
  }
  return quantity
}


  
const updateMainNutrient = (nutrient: ValueAndUnit, proportion: number) => ({ ...nutrient, value: nutrient.value * proportion })