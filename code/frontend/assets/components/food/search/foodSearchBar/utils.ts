import { Food } from "@/domain/exercise";
import { searchFoodByName } from "@/services/food";

const handleSearchSubmit = (
  query: string,
  setFood: React.Dispatch<React.SetStateAction<Food[]>>
) => {
  const fetchFoodResults = async () => {
    const food: Food[] = await searchFoodByName(query);

    setFood(food);
  };

  if (query.length > 1) fetchFoodResults();
};

export default handleSearchSubmit;
