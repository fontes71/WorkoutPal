type ConsumedFoodProps = {
  food: Food[] | null;
  setFood: React.Dispatch<React.SetStateAction<Food[] | null>>
};

type FoodLogProps = {
  log: Food
}