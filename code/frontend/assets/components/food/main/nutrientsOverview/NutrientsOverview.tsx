import styles from "./styles";
import { Text, View } from "react-native";
import getNutrients from "./utils";

const NutrientsOverview: React.FC<NutrientsOverviewProps> = ({ food }) => {
  const { calories, protein, carbs, fat } = getNutrients(food);

  return (
    <View style={styles.nutrients}>
      <Nutrient nutrientValue={calories} nutrient={"calories"} unit=""/>
      <Nutrient nutrientValue={protein} nutrient={"protein"} unit="g"/>
      <Nutrient nutrientValue={carbs} nutrient={"carbs"} unit="g"/>
      <Nutrient nutrientValue={fat} nutrient={"fat"} unit="g" />
    </View>
  );
};

type NutrientProps = {
  nutrientValue: number;
  nutrient: string;
  unit: string
};

const Nutrient: React.FC<NutrientProps> = ({ nutrientValue, nutrient, unit }) => (
  <View style={styles.nutrientWrapper}>
    <Text style={styles.nutrientValue}>{Math.round(nutrientValue)}{unit}</Text>
    <Text style={styles.nutrient}>{nutrient}</Text>
  </View>
);

export default NutrientsOverview;
