import { Text, View } from "react-native";
import styles from "./styles";
  
  const Nutrient: React.FC<NutrientProps> = ({ nutrientValue, nutrient, unit }) => (
    <View style={styles.nutrientWrapper}>
      <Text style={styles.nutrientValue}>{Math.round(nutrientValue)}{unit}</Text>
      <Text style={styles.nutrient}>{nutrient}</Text>
    </View>
  );

  export default Nutrient