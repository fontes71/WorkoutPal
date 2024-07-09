import { Link } from "expo-router";
import styles from "./styles";
import { Text, Image, View } from "react-native";

const AddFoodLink = () => (
  <View style={styles.container}>
      <Link style={styles.link} href={"food/search-food"}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Add Food</Text>
          <Image
            source={require("@/assets/images/plusSign.png")}
            style={styles.image}
          />
        </View>
      </Link>
  </View>
);

export default AddFoodLink;
