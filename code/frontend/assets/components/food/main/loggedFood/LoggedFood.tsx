import { Alert, FlatList, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { deleteAction, handlePress } from "./utils";
import styles from "./styles";
import AddFoodLink from "../addFoodLink/AddFoodLink";

const LoggedFood: React.FC<ConsumedFoodProps> = ({ food, setFood }) => {
  const { userContext } = useContext(UserContext);

  const handleLongPress = async (token: string | undefined, index: number, setFood: React.Dispatch<React.SetStateAction<Food[] | null>> ) => {
    deleteAlert( () =>  deleteAction(token, index, setFood))
  };

  return (
  <>
    {food && (
      <View style={styles.container}>
          <FlatList
          data={food}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handlePress(item, index)} key={index} onLongPress={() => handleLongPress(userContext?.token, index, setFood)}> 
            <FoodLog log={item} />
          </Pressable>
          )}
          ListFooterComponent={<AddFoodLink />}
          />

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
      <Text style={styles.logCalories}>{Math.round(log.mainNutrients.calories)}</Text>
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
