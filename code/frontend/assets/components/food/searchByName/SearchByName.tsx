
import { useState } from "react";
import FoodResults from "@/assets/components/food/search/foodResults/FoodResults";
import FoodSearchBar from "@/assets/components/food/search/foodSearchBar/FoodSearchBar";


const SearchByName = () => {
    const [name, setName] = useState("");

    return (  
    <>
      <FoodSearchBar searchSubmit={setName} />
      {name && <FoodResults name={name}/>}
    </>
    )
}

export default SearchByName