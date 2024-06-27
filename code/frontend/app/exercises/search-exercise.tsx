import { FlatList, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { localhost } from "@/constants";
import search_exercises_styles from "@/assets/styles/exercises";
import { Text, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import SearchExerciseFilters from "../modals/search-exercise-filters";
import { FilterButton } from "@/assets/components/exercises/filterButton";
import { ExerciseResult } from "@/assets/components/exercises/ExerciseResult";
import { removeParenthesesFromExerciseNames } from "@/assets/components/exercises/removeParenthesesFromExerciseName";

export default function SearchExerciseScreen() {
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(10);
  const flatListRef = useRef<FlatList | null>(null);
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [filtersQuery, setFilterQuery] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [target, setTarget] = useState("");

  const handleEnter = () => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(
          `${localhost}/api/exercises/name/${exerciseName}/filters?${filtersQuery.slice(1)}`
        );
  
        if (response.status !== 200) {
          const errorMessage: ExerciseResponse = await response.json();
          alert(errorMessage.message);
          return;
        }
  
        const exercises: ExerciseResponse = await response.json();
        const modifiedExercises: Exercise[] = removeParenthesesFromExerciseNames(
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
        `${localhost}/api/exercises/name/${exerciseName}/filters?skip=${page}${filtersQuery}`
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
      const newResults: Exercise[] = removeParenthesesFromExerciseNames(
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

  const handleFilterQuery = (bodyPart: string, equipment: string, target: string) => {
    let query = "";
    if(bodyPart.length > 0) query += `&bodyPart=${bodyPart}`;
    if(equipment.length > 0) query += `&equipment=${equipment}`;
    if(target.length > 0) query += `&target=${target}`;
    setFilterQuery(query);
  }

  const countFilters = () => {
    let count = 0;
    if (bodyPart.length > 0) count++;
    if (equipment.length > 0) count++;
    if (target.length > 0) count++;
    return count;
  };

  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{ title: "Search exercise" }} />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleEnter}
        returnKeyType="search"
        onChangeText={updateExerciseName}
        value={exerciseName}
      />
      <View style={search_exercises_styles.exerciseResultContainer}>
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
          /> 
        )}
      </View>
      <FilterButton count={countFilters()} onPress={() => { setFiltersModalVisible(true) }} />
      <SearchExerciseFilters 
        isVisible={filtersModalVisible} 
        onClose={() => { setFiltersModalVisible(false); handleFilterQuery(bodyPart, equipment, target) }} 
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        equipment={equipment} 
        setEquipment={setEquipment}
        target={target} 
        setTarget={setTarget} 
      />
    </View>
  );
}
