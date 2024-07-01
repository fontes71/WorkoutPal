import UNIT_VALUES from "@/assets/contants/unitValues"
import { useLocalSearchParams } from "expo-router"

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

  
const updateMainNutrient = (nutrient: ValueAndUnit, proportion: number) => ({ ...nutrient, value: nutrient.value * proportion })