
import { useState } from "react";
import FoodResults from "@/assets/components/food/search/foodResults/FoodResults";
import FoodSearchBar from "@/assets/components/food/search/foodSearchBar/FoodSearchBar";

// Resolver erro das keys
// Resolver erro do null
const SearchByName = () => {
    const [name, setName] = useState("");

    console.log("name =>", name)

    return (  
    <>
      <FoodSearchBar searchSubmit={setName} />
      {name && <FoodResults name={name}/>}
    </>
    )
}

export default SearchByName