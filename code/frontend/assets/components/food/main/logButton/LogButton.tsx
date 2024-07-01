import Details from "@/assets/components/food/details/index/Details";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import React from "react";
import { onSave } from "@/assets/components/food/details/index/utils";
import { LogButtonProps } from "./types";



const LogButton: React.FC<LogButtonProps> = ({ token, food, quantity, mainNutrients, secondaryNutrients }) => (
    <TouchableOpacity onPress={() => onSave(token, food, quantity, mainNutrients, secondaryNutrients)}>
    <Image
      source={require("@/assets/images/save.png")}
      style={{ marginRight: 0 }}
    />
  </TouchableOpacity>
  )

  export default LogButton
  