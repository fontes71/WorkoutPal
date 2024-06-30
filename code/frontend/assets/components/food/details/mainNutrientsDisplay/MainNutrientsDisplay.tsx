import round from "@/assets/functions/round";
import styles from "./styles";
import { Text, View } from "react-native";

const MainNutrientsDisplay: React.FC<MainNutrientsDisplayProps> = ({ mainNutrients }) => (
  <View style={styles.overviewText}>
    <Text style={styles.text_medium}> {Math.round(mainNutrients.calories)} cal </Text>
    <View style={styles.macronutrientsContainer}>
      <MainNutrient nutrient={mainNutrients.carbs} />
      <MainNutrient nutrient={mainNutrients.fat} />
      <MainNutrient nutrient={mainNutrients.protein} />
    </View>
  </View>
);

const MainNutrient: React.FC<MainNutrientProps> = ({ nutrient }) => (
  <Text style={styles.text_small}> {round(nutrient.value)}{nutrient?.unit} </Text>
);

export default MainNutrientsDisplay;
