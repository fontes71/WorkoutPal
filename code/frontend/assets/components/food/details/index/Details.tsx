import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { Image, Pressable } from "react-native";
import Overview from "@/assets/components/food/details/overview/Overview";
import { getFood, onSave, resetIfQuantityValueWasZero, updateNutrients } from "./utils";
import { DetailsProps } from "./types";

const Details: React.FC<DetailsProps> = ({ button: Button }) => {
  const { userContext } = useContext(UserContext);
  const food = getFood();
  if (!food) throw Error;

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
      <Text style={styles.title}> {food.name}</Text>
      <Overview
        food={food}
        quantity={quantity}
        updateQuantity={updateQuantity}
        mainNutrients={mainNutrients}
        secondaryNutrients={secondaryNutrients}
      />
      <Button token={userContext?.token} food={food} quantity={quantity} mainNutrients={mainNutrients} secondaryNutrients={secondaryNutrients} />
    </View>
  );
};

export default Details;
