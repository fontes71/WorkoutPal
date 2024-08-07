import { router } from "expo-router";
import { searchFoodByBarcode } from "@/services/food";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import { Camera } from "expo-camera";
import { FoodDetailsHookType } from "../../details/index/types";

export const handleBarCodeScanned = (
  hasCameraPermission: boolean | null,
  data: string,
  setScanning: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (hasCameraPermission) {
    const fetchFoodResults = async () => {
      setScanning(false);
      const food: Food = await searchFoodByBarcode(data);
      if (food == null)
        return
      router.push(foodItemRoute(food, FoodDetailsHookType.Log));
    };
    fetchFoodResults();
  }
};

export const scanBarCode = (
  hasCameraPermission: boolean | null,
  setHasCameraPermission: React.Dispatch<React.SetStateAction<boolean | null>>,
  scanning: boolean,
  setScanning: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  if (!hasCameraPermission) getCameraPermissions();
  setScanning(!scanning);
};
