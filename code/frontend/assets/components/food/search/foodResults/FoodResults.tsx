import { capitalizeWords, fetchResults, handleFoodPress } from "./utils";
import styles from "./styles";
import { FlatList, Pressable, Text, View } from "react-native";
import { PureComponent, useEffect, useRef, useState } from "react";
import React from "react";
import FoodCover from "../../common/foodCover/FoodCover";

const FoodResults: React.FC<FoodResultsProps> = ({ name }) => {
  const [results, setResults] = useState<Food[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    setPage(1);
    if (flatListRef.current)
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
  }, [name]);

  useEffect(() => {
    if (results.length < 60 || page == 1) loadMoreResults();
  }, [page, name]);

  const handlePageNum = () => {
    if (!isFetching) setPage(page + 1);
  };

  async function loadMoreResults() {
    setIsFetching(true);
    await fetchResults(name, setResults, page);
    setIsFetching(false);
  }

  return (
    <>
      {results.length == 0 && !isFetching ? (
        <Text>No results were found</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={results}
          onEndReached={handlePageNum}
          onEndReachedThreshold={1}
          keyExtractor={(_, index) => String(index)}
          windowSize={20}
          maxToRenderPerBatch={20}
          renderItem={({ item }) => (
            <Result item={item} handleFoodPress={handleFoodPress} />
          )}
        />
      )}
    </>
  );
};

class Result extends PureComponent<ResultProps> {
  render() {
    const { item, handleFoodPress }: ResultProps = this.props;

    return (
      <Pressable
        onPress={() => {
          handleFoodPress(item);
        }}
      >
        <FoodResult
          key={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          brand={item.brand}
          calories={item.mainNutrients.calories}
          quantity={item.quantity}
        />
      </Pressable>
    );
  }
}

const FoodResult: React.FC<FoodResultProps> = React.memo(
  ({ name, imageUrl, brand, calories, quantity }) => (
    <>
      <View style={styles.container}>
        <FoodCover imageUrl={imageUrl} />
        <FoodResultText
          nameString={name}
          brandString={brand}
          calories={calories}
          quantity={quantity}
        />
      </View>
    </>
  )
);

const FoodResultText: React.FC<FoodResultTextProps> = ({
  nameString,
  brandString,
  calories,
  quantity,
}) => (
  <View style={styles.textContainer}>
    <Text style={styles.topText}>{capitalizeWords(nameString)}</Text>
    <BottomText
      str={
        `${capitalizeWords(brandString)}, ` +
        `${calories}cal, ` +
        quantity.value +
        quantity.unit
      }
    />
  </View>
);

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);

export default FoodResults;
