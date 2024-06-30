export type InfoProps = {
    food: Food,
    quantity: ValueAndUnit,
    updateQuantity: (newQuantity: ValueAndUnit) => void,
    mainNutrients: MainNutrients,
    secondaryNutrients: SecondaryNutrients,
  }

