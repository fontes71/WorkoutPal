import { Food } from "@/domain/exercise";

export type ConsumedFoodProps = {
  food: Food[] | null;
  handleFoodPress: (item: Food) => void;
};
