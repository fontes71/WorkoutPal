import { Link } from "expo-router";
import styles from "./styles";
import { Text, Image, View } from "react-native";

const AddFoodLink = () => (
  <Link style={styles.link} href={"food/search-food"}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>Add Food</Text>
      <Image
        source={require("@/assets/images/plusSign.png")}
        style={styles.image}
      />
    </View>
  </Link>
);

export default AddFoodLink;
