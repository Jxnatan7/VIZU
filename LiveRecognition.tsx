import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera-ocr-plus";

export default function LiveRecognition() {
  const [data, setData] = useState(null);
  const device = useCameraDevice("back");

  const { hasPermission, requestPermission } = useCameraPermission();

  console.log(data);

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>A permissão da câmera é necessária.</Text>
        <Button title="Permitir Câmera" onPress={requestPermission} />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          Nenhuma câmera encontrada no dispositivo.
        </Text>
      </View>
    );
  }

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        options={{
          language: "latin",
        }}
        mode={"recognize"}
        callback={(d: any) => setData(d)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
