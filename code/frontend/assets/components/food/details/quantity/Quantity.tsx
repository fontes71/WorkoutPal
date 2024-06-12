import { Text, View } from "@/components/Themed";
import { display } from "./utils";
import styles from "./styles";

const Quantity: React.FC<QuantityProps> = ({ quantity, quantityUnit }) => (
  <View style={styles.quantityContainer}>
    <Text style={styles.text_small}>{display(quantity)}</Text>
    {quantity && (
      <Text style={styles.text_small}>{quantityUnit}</Text>
    )}
  </View>
);

export default Quantity;
