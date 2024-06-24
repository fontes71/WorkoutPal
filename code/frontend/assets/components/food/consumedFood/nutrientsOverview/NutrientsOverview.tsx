import styles from "./styles";
import { Text, View } from "react-native";
import getNutrients from "./utils";
import { NutrientsOverviewProps } from "./types";

const NutrientsOverview: React.FC<NutrientsOverviewProps> = ({ food }) => {
  const { calories, protein, carbs, fat } = getNutrients(food);

  return (
    <View style={styles.nutrients}>
      <Text>Calories:{calories}</Text>
      <Text>Protein:{protein}</Text>
      <Text>Carbs;{carbs}</Text>
      <Text>Fat:{fat}</Text>
    </View>
  );
};

export default NutrientsOverview;
