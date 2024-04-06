import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/app/utils/components/FoodCover";
import { Food } from "@/domain/types";

const displayValue = (value: string | number) => value ? value : '-'

interface QuantityProps {
  quantity: string;
  quantityUnit: string;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, quantityUnit }) => (
  <View style={styles.quantityContainer}>
    <Text>{displayValue(quantity)}</Text>
    <Text>{quantityUnit}</Text>
  </View>
);

interface MacronutrientProps {
  value: number;
}

const Macronutrient: React.FC<MacronutrientProps> = ({ value }) => (
  <Text style={styles.macronutrient}> {displayValue(value)}g </Text>
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
    <Text style={styles.calories}> {calories} cal </Text>
    <View style={styles.macronutrientsContainer}>
      <Macronutrient value={carbs} />
      <Macronutrient value={fat} />
      <Macronutrient value={protein} />
    </View>
  </View>
);

export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  const food = JSON.parse(foodJSON) as Food;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Add Food" }} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
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
  calories: {
    fontSize: 16,
  },
  macronutrient: {
    fontSize: 14,
  },
  quantityContainer: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: "#dadada",
    flexDirection: 'row'
  }
});
