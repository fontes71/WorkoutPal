type FoodResultTextProps = {
  nameString: string;
  brandString: string;
  calorieString: string;
  quantity: string;
};

type FoodResultsProps = {
  name: string
};

type ResultProps = {
  item: Food; 
  handleFoodPress: (food: Food) => Promise<void>;
}

