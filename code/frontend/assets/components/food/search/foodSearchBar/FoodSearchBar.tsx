import { SearchBar } from "@rneui/themed";
import { useState } from "react";

const FoodSearchBar: React.FC<FoodSearchBarProps> = ({ searchSubmit }) => {
  const [query, setQuery] = useState("");

  return (
    <SearchBar
      placeholder="Type Here..."
      onSubmitEditing={() => { if (query.length > 1) {
        searchSubmit(query)
      }}}
      returnKeyType="search"
      onChangeText={(value) => setQuery(value) }
      value={query}
    />
  );
};

export default FoodSearchBar;
