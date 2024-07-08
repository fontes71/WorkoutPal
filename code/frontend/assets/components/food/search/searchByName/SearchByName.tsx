import { useState } from "react";
import FoodResults from "@/assets/components/food/search/foodResults/FoodResults";
import FoodSearchBar from "@/assets/components/food/search/foodSearchBar/FoodSearchBar";
import NoBottomCutView from "../../common/NoBottomCutView";


const SearchByName = () => {
    const [name, setName] = useState("");

    return (  
      <NoBottomCutView marginBottom={20}>
      <FoodSearchBar searchSubmit={setName} />
      {name && <FoodResults name={name}/>}
    </NoBottomCutView>
    )
}

export default SearchByName