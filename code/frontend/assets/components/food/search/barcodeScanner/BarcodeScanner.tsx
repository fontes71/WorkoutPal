import { Button } from "react-native";
import styles from "./styles";
import { CameraView } from "expo-camera";
import { useState } from "react";
import { handleBarCodeScanned, scanBarCode } from "./utils";
import barcode_types from "./constants";


const BarcodeScanner = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);

  return (
    <>
      {scanning && (
        <CameraView
          onBarcodeScanned={ res  => handleBarCodeScanned(hasCameraPermission, res.data, setScanning)}
          barcodeScannerSettings={{
            barcodeTypes: barcode_types,
          }}
          style={styles.absoluteFill}
        />
      )}
      <Button title={"Scan Barcode"} onPress={() => scanBarCode(hasCameraPermission, setHasCameraPermission, scanning, setScanning)} />
    </>
  );
};

export default BarcodeScanner