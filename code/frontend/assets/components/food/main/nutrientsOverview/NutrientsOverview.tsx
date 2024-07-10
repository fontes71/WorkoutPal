import styles from "./styles";
import { Text, View } from "react-native";
import getNutrients from "./utils";
import Nutrient from "../../common/nutrient/Nutrient";

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



export default NutrientsOverview;
