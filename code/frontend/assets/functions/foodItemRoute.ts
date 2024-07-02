import { FoodDetailsHookType } from "../components/food/details/index/types";

const foodItemRoute = (food: Food, hookType: FoodDetailsHookType, logIndex: number): any => {
  return {
    pathname: `/food/details/${food.id}`,
    params: { foodJSON: JSON.stringify(food), hookType: hookType, logIndex: logIndex },
  };
};

export default foodItemRoute;
