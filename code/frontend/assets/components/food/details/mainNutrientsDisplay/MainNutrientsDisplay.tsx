import styles from "./styles";
import { Text, View } from "react-native";
import { MainNutrientProps, MainNutrientsDisplayProps } from "./types";

const MainNutrientsDisplay: React.FC<MainNutrientsDisplayProps> = ({ mainNutrients }) => (
  <View style={styles.overviewText}>
    <Text style={styles.text_medium}> {mainNutrients.calories} cal </Text>
    <View style={styles.macronutrientsContainer}>
      <MainNutrient nutrient={mainNutrients.carbs} />
      <MainNutrient nutrient={mainNutrients.fat} />
      <MainNutrient nutrient={mainNutrients.protein} />
    </View>
  </View>
);

const MainNutrient: React.FC<MainNutrientProps> = ({ nutrient }) => (
  <Text style={styles.text_small}> {nutrient?.value} {nutrient?.unit} </Text>
);

export default MainNutrientsDisplay;
