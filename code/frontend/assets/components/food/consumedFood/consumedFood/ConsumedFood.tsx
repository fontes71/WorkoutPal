import { Alert, Text, Touchable, TouchableWithoutFeedback, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { deleteAction, handlePress } from "./utils";

export const deleteAlert = (deleteAction: () => Promise<void>) => (
   Alert.alert("Delete this item?", "", [
                {
                    text: "Yes",
                    onPress: deleteAction,
                }, {
                    text: "No",
                    onPress: () => { return },
                },
            ])
)


const ConsumedFood: React.FC<ConsumedFoodProps> = ({ food, setFood }) => {
  const { userContext } = useContext(UserContext);

  const handleLongPress = async (token: string | undefined, index: number, setFood: React.Dispatch<React.SetStateAction<Food[] | null>> ) => {
    deleteAlert( () =>  deleteAction(token, index, setFood))
  };

  return (
  <>
    {food && (
      <View>
        {food.map((item, index) => (
          <TouchableWithoutFeedback onPress={() => handlePress(item)} key={index} onLongPress={() => handleLongPress(userContext?.token, index, setFood)}> 
            <Text>{item.name}</Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    )}
  </>
  )

}

export default ConsumedFood;
