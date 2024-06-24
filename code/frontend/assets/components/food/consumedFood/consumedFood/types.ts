import { Food } from "@/domain/food";

export type ConsumedFoodProps = {
  food: Food[] | null;
  handleFoodPress: (item: Food) => void;
};
