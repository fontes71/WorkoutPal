import { Food } from "@/domain/exercise";

const foodItemRoute = (food: Food): any => {
  return {
    pathname: `/food/details/${food.id}`,
    params: { foodJSON: JSON.stringify(food) },
  };
};

export default foodItemRoute;
