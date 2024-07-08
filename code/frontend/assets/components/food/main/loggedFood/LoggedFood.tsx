import { Alert, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { deleteAction, handlePress } from "./utils";
import styles from "./styles";

const LoggedFood: React.FC<ConsumedFoodProps> = ({ food, setFood }) => {
  const { userContext } = useContext(UserContext);

  const handleLongPress = async (token: string | undefined, index: number, setFood: React.Dispatch<React.SetStateAction<Food[] | null>> ) => {
    deleteAlert( () =>  deleteAction(token, index, setFood))
  };

  return (
  <>
    {food && (
      <View>
        {food.map((item, index) => (
          <Pressable onPress={() => handlePress(item, index)} key={index} onLongPress={() => handleLongPress(userContext?.token, index, setFood)}> 
            <FoodLog log={item} />
          </Pressable>
        ))}
      </View>
    )}
  </>
  )
}



const FoodLog: React.FC<FoodLogProps> = ({ log }) => (
  <View style={styles.logContainer}>
    <View>
      <Text style={styles.logName}>{log.name}</Text>
      <Text style={styles.logQuantity} >{log.quantity.value.toString() + log.quantity.unit}</Text>
    </View>
    <View>
      <Text style={styles.logCalories}>{log.mainNutrients.calories}</Text>
    </View>
  </View>
)


export const deleteAlert = (deleteAction: () => Promise<void>) => (
   Alert.alert("Delete this item?", "", [
                {
                  text: "No",
                  onPress: () => { return },
                }, {
                  text: "Yes",
                  onPress: deleteAction,
                },
            ])
)


export default LoggedFood;
