import search_exercises_styles from "@/assets/styles/exercises";
import { Text } from "react-native";

export const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);