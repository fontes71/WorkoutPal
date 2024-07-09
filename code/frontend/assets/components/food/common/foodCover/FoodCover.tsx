import { View } from "react-native";
import { Image } from "expo-image";
import styles from "./styles";


const FoodCover: React.FC<FoodCoverProps> = ({ imageUrl }) => (
  <View style={styles.foodResultImgContainer}>
    {imageUrl && (<Image style={styles.foodResultImg} source={imageUrl} contentFit="cover" />)}
  </View>
);


export default FoodCover;
