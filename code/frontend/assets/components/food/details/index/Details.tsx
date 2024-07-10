import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Overview from "@/assets/components/food/details/overview/Overview";
import { resetIfQuantityValueWasZero, updateNutrients } from "./utils";
import { ButtonProps, DetailsProps } from "./types";
import { Image } from "react-native";
import React from "react";


const Details: React.FC<DetailsProps> = ({ user, food, hook }) => {
  const [quantity, setQuantity] = useState<ValueAndUnit>(food.quantity);
  const [mainNutrients, setMainNutrients] = useState<MainNutrients>(food.mainNutrients);
  const [secondaryNutrients, setSecondaryNutrients] = useState<SecondaryNutrients>(food.secondaryNutrients);


  const updateQuantity = (newQuantity: ValueAndUnit) => {
    const quantityOrBaseQuantity = resetIfQuantityValueWasZero(quantity, food.quantity, food.mainNutrients, food.secondaryNutrients, setMainNutrients, setSecondaryNutrients)
    updateNutrients(quantityOrBaseQuantity, newQuantity, setMainNutrients, setSecondaryNutrients);
    setQuantity(newQuantity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food.name}</Text>
      <Overview
        food={food}
        quantity={quantity}
        updateQuantity={updateQuantity}
        mainNutrients={mainNutrients}
        secondaryNutrients={secondaryNutrients}
      />
      <Button hook={() => hook(user.token, food, quantity, mainNutrients, secondaryNutrients)}/>
    </View>
  );
};



const Button: React.FC<ButtonProps> = ({ hook }) => (
  <View style={styles.buttonWrapper}>
  <TouchableOpacity style={styles.button} onPress={hook}>
  <Image
    source={require("@/assets/images/save.png")}
    style={styles.buttonImg}
  />
</TouchableOpacity>
</View>

)

export default Details;
