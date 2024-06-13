import { Text, View } from "@/components/Themed";
import { Food } from "@/domain/types";
import FoodCover from "@/assets/components/FoodCover";
import { addCommaIfNeeded, capitalizeWords, handleFoodPress } from "./utils";
import styles from "./styles";
import { FlatList, Pressable } from "react-native";
import { FoodResultTextProps, FoodResultsProps } from "./types";

const FoodResults: React.FC<FoodResultsProps> = ({
  results
}) => (
  <FlatList
    data={results}
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
);

const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories,
  quantity,
}) => {
  const nameString = name || brand;
  let brandString = name && brand ? brand : ``;
  let caloriesString = calories ? `${calories} cal ` : ``;

  brandString = addCommaIfNeeded(
    !(brandString && (caloriesString || quantity)),
    brandString
  );
  caloriesString = addCommaIfNeeded(
    !(caloriesString && quantity),
    caloriesString
  );
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
