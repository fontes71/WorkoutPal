import { FlatList, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { localhost } from "@/assets/constants";
import search_exercises_styles from "@/assets/styles/exercises";
import { Text, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import SearchExerciseFilters from "../../assets/components/modals/search-exercise-filters";
import { FilterButton } from "@/assets/components/exercises/filterButton";
import { ExerciseResult } from "@/assets/components/exercises/ExerciseResult";
import { removeParenthesesFromExerciseNames } from "@/assets/components/exercises/removeParenthesesFromExerciseName";
import { FiltersInfo } from "@/assets/components/exercises/FiltersInfo";
import { ExerciseInfo } from "@/assets/components/exercises/ExerciseInfo";
import NoBottomCutView from "@/assets/components/food/common/NoBottomCutView";

const RESULTS_SIZE = 10;
const RESULTS_OFFSET = 10;

export default function SearchExerciseScreen() {
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInfo>({
    exerciseName: "",
    exercises: [],
  });
  const [isFetching, setIsFetching] = useState(true);

  const [filtersInfo, setFiltersInfo] = useState<FiltersInfo>({
    bodyPart: "",
    equipment: "",
    target: "",
    query: "",
  });
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);

  const [page, setPage] = useState(RESULTS_SIZE);
  const flatListRef = useRef<FlatList | null>(null);

  const handleEnter = () => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(
          `${localhost}/api/exercises/name/${exerciseInfo.exerciseName}/filters?${filtersInfo.query.slice(1)}`
        );

        if (response.status !== 200) {
          const errorMessage: ExerciseResponse = await response.json();
          alert(errorMessage.message);
          return;
        }

        const exercises: ExerciseResponse = await response.json();
        const modifiedExercises: Exercise[] =
          removeParenthesesFromExerciseNames(exercises.obj);
        setExerciseInfo({ ...exerciseInfo, exercises: modifiedExercises });
      } catch (error) {
        console.error("handleEnter ERROR -> ", error);
      }
    };

    setIsFetching(true);
    if (exerciseInfo.exerciseName.length > 1) fetchExercise();
    setIsFetching(false);
  };

  const updateExerciseName = (value: string) => {
    setExerciseInfo({ ...exerciseInfo, exerciseName: value });
  };

  const handleExercisePress = async (exercise: Exercise) => {
    router.push({
      pathname: `/fitness/exercise-details/${exercise._id}`,
      params: { exerciseJSON: JSON.stringify(exercise) },
    });
  };

  useEffect(() => {
    setPage(RESULTS_SIZE);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
      if (exerciseInfo.exerciseName.length == 0) {
        setExerciseInfo({ exerciseName: "", exercises: [] });
        setIsFetching(true);
      }
    }
  }, [exerciseInfo.exerciseName]);

  useEffect(() => {
    if (
      (exerciseInfo.exercises.length < 60 || page == RESULTS_SIZE) &&
      exerciseInfo.exerciseName.length > 1
    ) {
      loadMoreResults();
    }
  }, [page]);

  const handlePageNum = () => {
    if (!isFetching) {
      setPage(page + RESULTS_OFFSET);
    }
  };

  const newSearchOrAppend = (
    res: ExerciseInfo,
    newResults: Exercise[],
    page: number
  ) =>
    page == 10
      ? { ...res, exercises: newResults }
      : { ...res, exercises: [...res.exercises, ...newResults] };

  const fetchResults = async (
    setResults: React.Dispatch<React.SetStateAction<ExerciseInfo>>,
    page: number
  ) => {
    try {
      const response = await fetch(
        `${localhost}/api/exercises/name/${exerciseInfo.exerciseName}/filters?skip=${page}${filtersInfo.query}`
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
      const modifiedExercises: Exercise[] = removeParenthesesFromExerciseNames(
        exercises.obj
      );

      setResults((res) => newSearchOrAppend(res, modifiedExercises, page));
    } catch (error) {
      console.error("fetchResults ERROR -> ", error);
    }
  };

  async function loadMoreResults() {
    setIsFetching(true);
    await fetchResults(setExerciseInfo, page);
    setIsFetching(false);
  }

  const handleFilterQuery = (
    bodyPart: string,
    equipment: string,
    target: string
  ) => {
    let query = "";
    if (bodyPart.length > 0) query += `&bodyPart=${bodyPart}`;
    if (equipment.length > 0) query += `&equipment=${equipment}`;
    if (target.length > 0) query += `&target=${target}`;
    setFiltersInfo({ bodyPart, equipment, target, query });
  };

  const countFilters = () => {
    let count = 0;
    if (filtersInfo.bodyPart.length > 0) count++;
    if (filtersInfo.equipment.length > 0) count++;
    if (filtersInfo.target.length > 0) count++;
    return count;
  };

  return (
    <NoBottomCutView marginBottom={20}>
      <View style={{ flex: 1 }}>
        <Stack.Screen options={{ title: "Search exercise" }} />
        <SearchBar
          placeholder="Type Here..."
          onSubmitEditing={handleEnter}
          returnKeyType="search"
          onChangeText={updateExerciseName}
          value={exerciseInfo.exerciseName}
        />
        <View style={search_exercises_styles.exerciseResultContainer}>
          {exerciseInfo.exercises.length == 0 && !isFetching ? (
            <Text>No results were found</Text>
          ) : (
            <FlatList
              ref={flatListRef}
              data={exerciseInfo.exercises}
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
      </View>
      <FilterButton
        count={countFilters()}
        onPress={() => {
          setFiltersModalVisible(true);
        }}
      />
      <SearchExerciseFilters
        isVisible={filtersModalVisible}
        onClose={() => {
          setFiltersModalVisible(false);
          handleFilterQuery(
            filtersInfo.bodyPart,
            filtersInfo.equipment,
            filtersInfo.target
          );
        }}
        filters={filtersInfo}
        setFilters={setFiltersInfo}
      />
    </NoBottomCutView>
  );
}
