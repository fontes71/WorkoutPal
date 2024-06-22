import { Text, View } from "@/components/Themed";
import FoodCover from "@/assets/components/FoodCover";
import {  capitalizeWords, fetchResults, getBrandString, getCaloriesString, handleFoodPress } from "./utils";
import styles from "./styles";
import { FlatList, Pressable } from "react-native";
import { useEffect, useState } from "react";

const FoodResults: React.FC<FoodResultsProps> = ({ name }) => {
  const [results, setResults] = useState<Food[]>([])
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  console.log(results)

 
  
  useEffect(() => {

    if (!isFetching && results.length < 60) 
        loadMoreResults();
    
      
  }, [page, name]);

  const handlePageNum = () => {
 
    if (!isFetching)
    setPage(page + 1)
  }
  
  async function loadMoreResults() {
    setIsFetching(true);

    console.log("USEEFFECT")
    await fetchResults(name, setResults, page);

    setIsFetching(false);
  }


  
  return (<FlatList
    data={results}
    onEndReached={handlePageNum}

    renderItem={({ item }) => (
      <Pressable
        onPress={() => {
          handleFoodPress(item);
        }}
      >
        <FoodResult key={item.id} {...item} />
      </Pressable>
    )}
  />
  )}

const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories ,
  quantity,
}) => {
  const nameString = name || brand;
  const caloriesString = getCaloriesString(calories, quantity)
  const brandString = getBrandString(name, brand, caloriesString, quantity)
  
  return (
    <>
      {nameString && (
        <View style={styles.container}>
          <FoodCover imageUrl={imageUrl} />
          <FoodResultText
            nameString={nameString}
            brandString={brandString}
            calorieString={caloriesString}
            quantity={quantity}
          />
        </View>
      )}
    </>
  );
};

const FoodResultText: React.FC<FoodResultTextProps> = ({
  nameString,
  brandString,
  calorieString,
  quantity,
}) => (
  <View style={styles.textContainer}>
    <Text style={styles.topText}>{capitalizeWords(nameString)}</Text>
    <BottomText str={capitalizeWords(brandString) + calorieString + quantity} />
  </View>
);

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);

export default FoodResults;
