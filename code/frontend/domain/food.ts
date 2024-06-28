type ValueAndUnit = {
    value: number,
    unit: string 
  }
  

type Food = {
    id: string;
    name: string;
    brand: string;
    quantity: ValueAndUnit
    imageUrl: string;
    calories: number;
    protein: ValueAndUnit | null;
    fat: ValueAndUnit | null;
    carbs: ValueAndUnit | null;
    fiber: ValueAndUnit | null;
    saturatedFat: ValueAndUnit | null;
    salt: ValueAndUnit | null;
    sodium: ValueAndUnit | null;
    sugars: ValueAndUnit | null;
    nutriscoreGrade: string | null;
  }