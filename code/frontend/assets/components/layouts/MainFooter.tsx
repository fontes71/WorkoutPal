import { router, usePathname } from "expo-router";
import { View, Image, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import layout_styles from "@/assets/styles/layout";
import { isMainFitnessScreen, isMainNutritionScreen, splitPath } from "@/assets/functions/layout";

type ItemOptions = {
  readonly name: string,
  readonly path: string,
  readonly imageSource: ImageSourcePropType
}

const styles = layout_styles.footer_styles

export default function MainFooter() {
  const dumbbellWhiteIcon = require("@images/dumbbell_white.png")
  const nutritionWhiteIcon = require("@images/nutrition_white.png")
  const dumbbellBlueIcon = require("@images/dumbbell_blue.png")
  const nutritionBlueIcon = require("@images/nutrition_blue.png")

  const path = usePathname()
  const sp = splitPath(path)
  const mainScreen = sp[0]

  return (
      <View style={styles.footer_container}>
        <Item name="Fitness" path="fitness" imageSource={isMainFitnessScreen(mainScreen) ? dumbbellBlueIcon : dumbbellWhiteIcon} />
        <View style={styles.vertical_line} />
        <Item name="Nutrition" path="food" imageSource={isMainNutritionScreen(mainScreen) ? nutritionBlueIcon : nutritionWhiteIcon} />
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
  