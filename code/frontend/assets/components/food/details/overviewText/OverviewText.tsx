import styles from "./styles";
import { Text, View } from "@/components/Themed";

const OverviewText: React.FC<OverviewTextProps> = ({
  calories,
  carbs,
  fat,
  protein,
}) => (
  <View style={styles.overviewText}>
    <Text style={styles.text_medium}> {calories} cal </Text>
    <View style={styles.macronutrientsContainer}>
      <Macronutrient value={carbs} />
      <Macronutrient value={fat} />
      <Macronutrient value={protein} />
    </View>
  </View>
);

const Macronutrient: React.FC<MacronutrientProps> = ({ value }) => (
  <Text style={styles.text_small}> {value} </Text>
);

export default OverviewText;
