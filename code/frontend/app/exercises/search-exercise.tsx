import {
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Stack, router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { localhost } from "@/constants";
import search_exercises_styles from "@/assets/styles/exercises";
import { Text, View } from "react-native";
import { SearchBar } from "@rneui/themed";

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);

const ExerciseResult: React.FC<Exercise> = ({ name, gifUrl, equipment }) => {
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
        <BottomText str={"Equipment: " + equipment} />
      </View>
    </View>
  );
};

const removeParenthesesFromExerciseName = (exercises: Exercise[]) => {
  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].name.endsWith(")")) {
      exercises[i].name = exercises[i].name.slice(
        0,
        exercises[i].name.lastIndexOf("(")
      );
    }
  }
  return exercises;
};

export default function SearchExerciseScreen() {
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(10);
  const flatListRef = useRef<FlatList | null>(null);

  const handleEnter = () => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(
          `${localhost}/api/exercises/name/${exerciseName}`
        );
  
        if (response.status !== 200) {
          const errorMessage: ExerciseResponse = await response.json();
          alert(errorMessage.message);
          return;
        }
  
        const exercises: ExerciseResponse = await response.json();
        const modifiedExercises: Exercise[] = removeParenthesesFromExerciseName(
          exercises.obj
        );
        setExercises(modifiedExercises);
      } catch (error) {
        console.error("handleEnter ERROR -> ", error);
      }
    };

    setIsFetching(true);
    if (exerciseName.length > 1) fetchExercise();
    setIsFetching(false);
  };

  const updateExerciseName = (value: string) => {
    setExerciseName(value);
  };

  const handleExercisePress = async (exercise: Exercise) => {
    router.push({
      pathname: `/exercises/exercise-details/${exercise._id}`,
      params: { exerciseJSON: JSON.stringify(exercise) },
    });
  };

  useEffect(() => {
    setPage(10)
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }
  }, [exerciseName])
 
  
  useEffect(() => {
    if ((exercises.length < 60 || page == 10) && exerciseName.length > 1) {
      loadMoreResults();
    }  
  }, [page]);

  const handlePageNum = () => {
    if (!isFetching) {
      setPage(page + 10);
    }
  }

  const newSearchOrAppend = (res: Exercise[], newResults: Exercise[], page: number) => page == 10 ? newResults : [...res, ...newResults]

  const fetchResults = async (
    setResults: React.Dispatch<React.SetStateAction<Exercise[]>>,
    page: number
  ) => {
    try {
      const response = await fetch(
        `${localhost}/api/exercises/name/${exerciseName}?skip=${page}`
      );

      if (response.status !== 200) {
        const errorMessage: ExerciseResponse = await response.json();
        alert(errorMessage.message);
        return;
      }

      const exercises: ExerciseResponse = await response.json();
      if (exercises.obj.length == 0) {
        return;
      }
      const newResults: Exercise[] = removeParenthesesFromExerciseName(
        exercises.obj
      );

      setResults((res) =>  newSearchOrAppend(res, newResults, page));
    } catch (error) {
      console.error("fetchResults ERROR -> ", error);
    }
  };
  
  async function loadMoreResults() {
    setIsFetching(true);
    await fetchResults(setExercises, page);
    setIsFetching(false);
  }

  return (
    <View>
      <Stack.Screen options={{ title: "Search exercise" }} />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleEnter}
        returnKeyType="search"
        onChangeText={updateExerciseName}
        value={exerciseName}
      />
      {exercises.length == 0 && !isFetching  ? (
        <Text>No results were found</Text>
      ) :
      (
      <FlatList
        ref={flatListRef}
        data={exercises}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleExercisePress(item);
            }}
          >
            <ExerciseResult {...item} />
          </Pressable>
        )}
        keyExtractor={(item: Exercise) => item._id}
        onEndReached={handlePageNum}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 40 }}
      /> )}
    </View>
  );
}
