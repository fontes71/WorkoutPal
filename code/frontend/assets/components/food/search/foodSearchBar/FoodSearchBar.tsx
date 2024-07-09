import { useState } from "react";
import styles from "./styles";
import { TextInput, View } from "react-native";

const FoodSearchBar: React.FC<FoodSearchBarProps> = ({ searchSubmit }) => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.searchBarContainer}>
    <TextInput
    style={styles.searchBar}
    placeholder="Search"
    onChangeText={(value: string) => setQuery(value)}
    onSubmitEditing={() => { if (query.length > 1) {
      searchSubmit(query)
    }}}
    returnKeyType="search"
    value={query}
    placeholderTextColor={'white'}
    selectionColor={'white'}
  />
  </View>
  );
};

export default FoodSearchBar;
