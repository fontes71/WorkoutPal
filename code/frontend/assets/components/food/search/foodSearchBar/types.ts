import { Food } from "@/domain/exercise";

export type FoodSearchBarProps = {
  setFood: React.Dispatch<React.SetStateAction<Food[]>>;
};
