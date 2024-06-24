import FoodCover from "@/assets/components/FoodCover";
import {  capitalizeWords, fetchResults, getBrandString, getCaloriesString, handleFoodPress } from "./utils";
import styles from "./styles";
import { FlatList, Pressable, Text, View  } from "react-native";
import { PureComponent, useEffect, useRef, useState } from "react";
import React from "react";
import { Food } from "@/domain/food";

const FoodResults: React.FC<FoodResultsProps> = ({ name }) => {
  const [results, setResults] = useState<Food[]>([])
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const flatListRef = useRef<FlatList | null>(null);


  useEffect(() => {
    setPage(1)
    if (flatListRef.current) 
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });

  }, [name])
 
  
  useEffect(() => {
  
    if (results.length < 60 || page == 1)  
        loadMoreResults();  
  }, [page]);

  const handlePageNum = () => {
    if (!isFetching)
    setPage(page + 1)
  }
  
  async function loadMoreResults() {
 
    setIsFetching(true);
    await fetchResults(name, setResults, page);
    setIsFetching(false);
  }

  return (
    <>
      {results.length == 0 && !isFetching  ? (
        <Text>No results were found</Text>
      ) :
      (
        <FlatList
          ref={flatListRef}
          data={results}
          onEndReached={handlePageNum}
          onEndReachedThreshold={0.4}
          keyExtractor={(_, index) => String(index)}
          windowSize={20}
          maxToRenderPerBatch={20}
          renderItem={({ item }) => (
            <Result item={item} handleFoodPress={handleFoodPress} />
          )}
        />
      ) }
    </>
  );
}


class Result extends PureComponent<ResultProps> {
  render() {
    const { item, handleFoodPress } :ResultProps = this.props;
    
    return (
      <Pressable
        onPress={() => {
          handleFoodPress(item);
        }}
      >
        <FoodResult key={item.id} {...item} />
      </Pressable>
    );
  }
}

const FoodResult: React.FC<Food> = React.memo(({ name, imageUrl, brand, calories, quantity }) => {
  const nameString = name || brand;
  const caloriesString = getCaloriesString(calories, quantity);
  const brandString = getBrandString(name, brand, caloriesString, quantity);

  return (
    <View style={styles.container}>
      <FoodCover imageUrl={imageUrl} />
      <FoodResultText nameString={nameString} brandString={brandString} calorieString={caloriesString} quantity={quantity} />
    </View>
  );
});

const FoodResultText: React.FC<FoodResultTextProps> = ({ nameString, brandString, calorieString, quantity }) => (
  <View style={styles.textContainer}>
    <Text style={styles.topText}>{capitalizeWords(nameString)}</Text>
    <BottomText str={capitalizeWords(brandString) + calorieString + quantity} />
  </View>
);

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);

export default FoodResults;