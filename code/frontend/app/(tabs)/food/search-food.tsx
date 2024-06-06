import { Button, FlatList, Pressable } from "react-native";
import { food_search_styles } from "@/assets/styles/food";
import { Text, View } from "@/components/Themed";
import {  Stack, router } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect, useContext } from "react";
import { Food } from "@/domain/types";
import FoodCover from "@/assets/components/FoodCover";
import { searchFoodByName, searchFoodByBarcode } from "@/services/food";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import { CameraView, Camera } from "expo-camera/next";
import { BarCodeScanningResult } from "expo-camera/build/Camera.types";
import { UserContext } from "@/app/_layout";

const capitalizeWords = (str: string | null) => {
  if (str === null) {
    return null;
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={food_search_styles.bottomText}>{str}</Text>}</>
);

const addCommaIfNeeded = (noComma: boolean, str: string) =>
  noComma ? str : `${str}, `;

interface FoodResultInfoProps {
  nameString: string;
  brandString: string;
  calorieString: string;
  quantity: string;
}

const FoodResultInfo: React.FC<FoodResultInfoProps> = ({
  nameString,
  brandString,
  calorieString,
  quantity,
}) => (
  <View style={food_search_styles.foodResultTextContainer}>
    <Text style={food_search_styles.topText}>
      {capitalizeWords(nameString)}
    </Text>
    <BottomText str={capitalizeWords(brandString) + calorieString + quantity} />
  </View>
);

const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories,
  quantity,
}) => {
  const nameString = name || brand;
  let brandString = name && brand ? brand : ``;
  let caloriesString = calories ? `${calories} cal ` : ``;

  brandString = addCommaIfNeeded(
    !(brandString && (caloriesString || quantity)),
    brandString
  );
  caloriesString = addCommaIfNeeded(
    !(caloriesString && quantity),
    caloriesString
  );
  return (
    <>
      {nameString && (
        <View style={food_search_styles.foodResultContainer}>
          <FoodCover imageUrl={imageUrl} />
          <FoodResultInfo
            nameString={nameString}
            brandString={brandString}
            calorieString={caloriesString}
            quantity={quantity}
          />
        </View>
      )}
    </>
  );
};

export default function AddFoodScreen() {
  const [query, setQuery] = useState("");
  const [foodResults, setFood] = useState<Food[]>([]);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);


  const scanBarCode = () => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };

    if (!hasCameraPermission) getCameraPermissions();
    setScanning(!scanning);
  };

  const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
    if (hasCameraPermission) {
      const fetchFoodResults = async () => {
        setScanning(false);
        const food: Food = await searchFoodByBarcode(data);
        router.push(foodItemRoute(food));
      };
      fetchFoodResults();
    }
  };

  const handleSearchSubmit = () => {
    const fetchFoodResults = async () => {
      const food: Food[] = await searchFoodByName(query);

      setFood(food);
    };

    if (query.length > 1) fetchFoodResults();
  };

  const updateQuery = (value: string) => {
    setQuery(value);
  };

  const handleFoodPress = async (food: Food) => {
    router.push(foodItemRoute(food));
  };

  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      {scanning && (
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "aztec",
              "ean13",
              "ean8",
              "qr",
              "pdf417",
              "upc_e",
              "datamatrix",
              "code39",
              "code93",
              "itf14",
              "codabar",
              "code128",
              "upc_a",
            ],
          }}
          style={food_search_styles.absoluteFillObject}
        />
      )}
      <Button title={"Scan Barcode"} onPress={scanBarCode} />

      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        onChangeText={updateQuery}
        value={query}
      />
      <FlatList
        data={foodResults}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleFoodPress(item);
            }}
          >
            <FoodResult key={item.id} {...item} />
          </Pressable>
        )}
      />
    </View>
  );
}
