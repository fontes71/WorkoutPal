import { Alert, Text, TouchableWithoutFeedback, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { deleteAction, handlePress } from "./utils";

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
          <TouchableWithoutFeedback onPress={() => handlePress(item, index)} key={index} onLongPress={() => handleLongPress(userContext?.token, index, setFood)}> 
            <Text>{item.name}</Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    )}
  </>
  )
}


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
