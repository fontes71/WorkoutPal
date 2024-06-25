import { router } from "expo-router";
import { View, Image, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import layout_styles from "@/assets/styles/layout";

type ItemOptions = {
  readonly name: string,
  readonly path: string,
  readonly imageSource: ImageSourcePropType
}

const styles = layout_styles.footer_styles

export default function MainFooter() {
  const dumbbellSource = require("@images/dumbbell.png")
  const nutritionSource = require("@images/nutrition.png")

  return (
      <View style={styles.footer_container}>
        <Item name="Exercise" path="exercises" imageSource={dumbbellSource} />
        <View style={styles.vertical_line} />
        <Item name="Nutrition" path="food" imageSource={nutritionSource} />
      </View>
  );
};

const Item = ({name, path, imageSource}: ItemOptions) => {
  return (
    <View style={styles.button_container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push(path)}> 
          <Image style={styles.button_icon} source={imageSource}/>
          <Text style={styles.button_text}>{name}</Text>
        </TouchableOpacity>
    </View>
  )
}
  