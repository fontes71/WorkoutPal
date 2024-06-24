const foodItemRoute = (food: Food): any => {
  return {
    pathname: `/food/operations/details/${food.id}`,
    params: { foodJSON: JSON.stringify(food) },
  };
};

export default foodItemRoute;
