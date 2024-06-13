import { Food } from "@/domain/types";


export type ConsumedFoodProps = {
    food: Food[] | null;
    handleFoodPress: (item: Food) => void;
  };