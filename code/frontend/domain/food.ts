type ValueAndUnit = {
    value: number,
    unit: string 
  }
  

type MainNutrients = {
    calories: number;
    protein: ValueAndUnit | null;
    fat: ValueAndUnit | null;
    carbs: ValueAndUnit | null;
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
  