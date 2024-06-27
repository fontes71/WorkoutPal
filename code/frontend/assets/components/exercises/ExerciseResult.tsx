import { View, Text, Image } from "react-native";
import { BottomText } from "./bottomText";
import search_exercises_styles from "@/assets/styles/exercises";

export const ExerciseResult: React.FC<Exercise> = ({ name, gifUrl, equipment, bodyPart, target }) => {
    return (
      <View style={search_exercises_styles.exerciseResultContainer}>
        <View style={search_exercises_styles.imageContainer}>
          {gifUrl && (
            <Image
              style={search_exercises_styles.exerciseGifResult}
              source={{ uri: gifUrl }}
            />
          )}
        </View>
        <View style={search_exercises_styles.exerciseResultTextContainer}>
          <Text style={search_exercises_styles.topText}>{name}</Text>
          <BottomText str={"Body Part: " + bodyPart} />
          <BottomText str={"Equipment: " + equipment} />
          <BottomText str={"Target: " + target} />
        </View>
      </View>
    );
  };