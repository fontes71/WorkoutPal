import { Text, View } from "@/components/Themed";
import { ConsumedFoodProps } from "./types";

const ConsumedFood: React.FC<ConsumedFoodProps> = ({ food }) => (
  <>
    {food && (
      <View>
        {food.map((item, index) => (
          <View key={index}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </View>
    )}
  </>
);

export default ConsumedFood;
