export type InfoProps = {
    food: Food,
    quantity: ValueAndUnit,
    setQuantity: React.Dispatch<React.SetStateAction<ValueAndUnit>>,
    mainNutrients: MainNutrients,
    setMainNutrients: React.Dispatch<React.SetStateAction<MainNutrients>>,
    secondaryNutrients: SecondaryNutrients,
    setSecondaryNutrients: React.Dispatch<React.SetStateAction<SecondaryNutrients>>
  }

