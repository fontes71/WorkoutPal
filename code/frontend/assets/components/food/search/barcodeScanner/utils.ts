import { router } from "expo-router";
import { Food } from "@/domain/food";
import { searchFoodByBarcode } from "@/services/food";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import { Camera } from "expo-camera";

export const handleBarCodeScanned = (
  hasCameraPermission: boolean | null,
  data: string,
  setScanning: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (hasCameraPermission) {
    const fetchFoodResults = async () => {
      setScanning(false);
      const food: Food = await searchFoodByBarcode(data);
      router.push(foodItemRoute(food));
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
