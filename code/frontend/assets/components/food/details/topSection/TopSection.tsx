import { Image, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { Food } from "@/domain/food";
import { useContext } from "react";
import { consumeFood } from "@/services/food";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { TopSectionProps } from "./types";

const TopSection: React.FC<TopSectionProps> = ({ food }) => {
  const { userContext } = useContext(UserContext);
  const onSaveHook = async (food: Food) => {
    if (!userContext) {
      router.push(`/auth/login/`);
      return;
    }

    await consumeFood(userContext?.token, food);

    router.push(`/food/`);
  };

  return (
    <Stack.Screen
      options={{
        headerTitle: "Add Food",
        headerRight: () => (
          <Pressable onPress={() => onSaveHook(food)}>
            <Image
              source={require("@/assets/images/save.png")}
              style={{ marginRight: 0 }}
            />
          </Pressable>
        ),
        headerTitleAlign: "left",
      }}
    />
  );
};

export default TopSection;
