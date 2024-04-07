import { StyleSheet, TouchableOpacity, Image } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/app/utils/components/FoodCover";
import { Food } from "@/domain/types";
import { useState } from "react";

const displayMacro = (value: number) => (value ? `${value}g` : "-");
const display = (value: string) => (value ? `${value}` : "-");

interface QuantityProps {
  quantity: string;
  quantityUnit: string;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, quantityUnit }) => (
  <View style={styles.quantityContainer}>
    <Text style={styles.text_small}>{display(quantity)}</Text>
    {quantity && <Text style={styles.text_small}>{quantityUnit}</Text>}
  </View>
);

interface MacronutrientProps {
  value: number;
}

const Macronutrient: React.FC<MacronutrientProps> = ({ value }) => (
  <Text style={styles.text_small}> {displayMacro(value)} </Text>
);

interface OverviewTextProps {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

const OverviewText: React.FC<OverviewTextProps> = ({
  calories,
  carbs,
  fat,
  protein,
}) => (
  <View style={styles.overviewText}>
    <Text style={styles.text_medium}> {calories} cal </Text>
    <View style={styles.macronutrientsContainer}>
      <Macronutrient value={carbs} />
      <Macronutrient value={fat} />
      <Macronutrient value={protein} />
    </View>
  </View>
);

const More = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <View style={styles.moreContainer}>
      <TouchableOpacity
        onPress={() => setButtonClicked(!buttonClicked)}
        style={styles.moreButton}
      >
        <Text style={styles.text_small}>More</Text>
        <Image
          source={require("@/assets/images/down-arrow.png")}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const TopSection = () => (
  <Stack.Screen
    options={{
      headerTitle: (props) => <Text style={{ fontSize: 18 }}>Add Food</Text>,
      headerRight: (props) => (
        <Image
          source={require("@/assets/images/save.png")}
          style={{ marginRight: 0 }}
        />
      ),
      headerTitleAlign: "left",
    }}
  />
);

export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  const food = JSON.parse(foodJSON) as Food;

  return (
    <View style={styles.container}>
      <TopSection />
      <Text style={styles.title}> {food.name}</Text>
      <View style={styles.overview}>
        <FoodCover imageUrl={food.imageUrl} />
        <OverviewText
          calories={food.calories}
          carbs={food.carbs}
          fat={food.fat}
          protein={food.protein}
        />
      </View>
      <Quantity quantity={food.quantity} quantityUnit={food.quantityUnit} />
      <More />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: "center",
  },
  overview: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dadada",
  },
  overviewText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 90,
  },
  macronutrientsContainer: {
    flexDirection: "row",
  },
  text_medium: {
    fontSize: 18,
  },
  text_small: {
    fontSize: 16,
  },
  quantityContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#dadada",
    flexDirection: "row",
  },
  moreContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    marginTop: 3,
  },
});
