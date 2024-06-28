type FoodResultProps = {
  name: string,
  imageUrl: string,
  brand: string,
  calories: number,
  quantity: ValueAndUnit
}


type FoodResultTextProps = {
  nameString: string;
  brandString: string;
  calorieString: string;
  quantity: ValueAndUnit;
};

type FoodResultsProps = {
  name: string
};

type ResultProps = {
  item: Food; 
  handleFoodPress: (food: Food) => Promise<void>;
}

