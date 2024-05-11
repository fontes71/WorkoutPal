import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

interface FoodCoverProps {
  imageUrl: string | null;
}

const FoodCover: React.FC<FoodCoverProps> = ({ imageUrl }) => (
  <View style={styles.foodResultImgContainer}>
    {imageUrl && (<Image style={styles.foodResultImg} source={imageUrl} contentFit="cover" />)}
  </View>
);

const styles = StyleSheet.create({
  foodResultImgContainer: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  foodResultImg: {
    flex: 1,
  },
});

export default FoodCover;
