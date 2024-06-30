type ValueAndUnit = {
    value: number,
    unit: string 
  }
  

type MainNutrients = {
    calories: number;
    protein: ValueAndUnit;
    fat: ValueAndUnit;
    carbs: ValueAndUnit;
  }
  
type SecondaryNutrients = {
    fiber: ValueAndUnit | null;
    saturatedFat: ValueAndUnit | null;
    salt: ValueAndUnit | null;
    sodium: ValueAndUnit | null;
    sugars: ValueAndUnit | null;
  
  }
  
type Food = {
    id: string;
    name: string;
    brand: string;
    quantity: ValueAndUnit
    imageUrl: string;
    mainNutrients: MainNutrients,
    secondaryNutrients: SecondaryNutrients,
    nutriscoreGrade: string | null;
  }
  