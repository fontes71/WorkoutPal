import styles from "./styles";
import { Text, View } from "react-native";

const MainNutrients: React.FC<MainNutrientsProps> = ({
  calories,
  carbs,
  fat,
  protein,
}) => (
  <View style={styles.overviewText}>
    <Text style={styles.text_medium}> {calories} cal </Text>
    <View style={styles.macronutrientsContainer}>
      <Macronutrient nutrient={carbs} />
      <Macronutrient nutrient={fat} />
      <Macronutrient nutrient={protein} />
    </View>
  </View>
);

const Macronutrient: React.FC<MacronutrientProps> = ({ nutrient }) => (
  <Text style={styles.text_small}> {nutrient?.value} {nutrient?.unit} </Text>
);

export default MainNutrients;
