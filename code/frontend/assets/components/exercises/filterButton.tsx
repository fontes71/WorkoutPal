import search_exercises_styles from "@/assets/styles/exercises";
import { TouchableOpacity, Image, View, Text } from "react-native";

export const FilterButton = ({ count, onPress }: {count: number, onPress: () => void}) => {
    return (
      <TouchableOpacity style={search_exercises_styles.filtersFloatingButton} onPress={onPress}>
        <Image
          source={require("@/assets/images/filters.png")}
          style={search_exercises_styles.filterIcon}
        />
        {count > 0 && (
          <View style={search_exercises_styles.badge}>
            <Text style={search_exercises_styles.badgeText}>{count}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };