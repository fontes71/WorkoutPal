import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { FoodSearchBarProps } from "./types";
import handleSearchSubmit from "./utils";



const FoodSearchBar: React.FC<FoodSearchBarProps> = ({ setFood }) => {
  const [query, setQuery] = useState("");

  return (
    <SearchBar
      placeholder="Type Here..."
      onSubmitEditing={() => handleSearchSubmit(query, setFood)}
      returnKeyType="search"
      onChangeText={(value) => setQuery(value)}
      value={query}
    />
  );
};

export default FoodSearchBar;
