import styles from "./styles";
import { Text, View } from "react-native";
import getNutrients from "./utils";

const NutrientsOverview: React.FC<NutrientsOverviewProps> = ({ food }) => {
  const { calories, protein, carbs, fat } = getNutrients(food);

  return (
    <View style={styles.nutrients}>
      <Text>Calories:{Math.round(calories)}</Text>
      <Text>Protein:{Math.round(protein)}</Text>
      <Text>Carbs;{Math.round(carbs)}</Text>
      <Text>Fat:{Math.round(fat)}</Text>
    </View>
  );
};

export default NutrientsOverview;
