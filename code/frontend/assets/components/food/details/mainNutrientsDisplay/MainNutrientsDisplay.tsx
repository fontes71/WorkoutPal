import styles from "./styles";
import { Text, View } from "react-native";
import Nutrient from "../../common/nutrient/Nutrient";

const MainNutrientsDisplay: React.FC<MainNutrientsDisplayProps> = ({ mainNutrients }) => (
  <View style={styles.mainNutrientsContainer}>
    <View style={styles.caloriesWrapper}>
    <Text style={styles.text}> {Math.round(mainNutrients.calories)} cal </Text>
    </View>
    <View style={styles.macronutrientsContainer}>
      <Nutrient nutrientValue={mainNutrients.protein.value} nutrient={"protein"} unit="g"/>
      <Nutrient nutrientValue={mainNutrients.carbs.value} nutrient={"carbs"} unit="g"/>
      <Nutrient nutrientValue={mainNutrients.fat.value} nutrient={"fat"} unit="g" />
    </View>
  </View>
);


export default MainNutrientsDisplay;
