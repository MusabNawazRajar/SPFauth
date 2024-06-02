import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";

import HeadCard from "./components/HeadCard";
import { firebaseConfig } from "./DB-Config/firebaseConfig";
import { getApps } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import * as Notifications from "expo-notifications";
import { statusObj } from "./util/statusObj";
import { RenderStatusCard } from "./components/StatusCard";


// Initialize Firebase if not already initialized
if (!getApps().length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized");
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
  }),
});

const fetchData = async (ref, stateUpdater) => {
  try {
    const snapshot = await ref.once("value");
    const latestValue =
      snapshot.val()?.[Object.keys(snapshot.val()).pop()]?.value || false;
    stateUpdater(latestValue);

    // Log the temperature or humidity value
    console.log(`${stateUpdater.name}: ${latestValue}`);
  } catch (error) {
    console.error(`Error fetching ${stateUpdater.name}:`, error.message);
  }
};

const addDataListener = (ref, onChange) => ref.on("value", onChange);
const removeDataListener = (ref, onChange) => ref.off("value", onChange);

const scheduleHighTemperatureNotification = async (temperature) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "High Temperature Alert",
        body: `Temperature has reached a high value: ${temperature}°C`,
      },
      trigger: null,
    });
    console.log("High Temperature Notification scheduled successfully");
  } catch (error) {
    console.error("Error scheduling high temperature notification:", error);
  }
};

export default function MainController({ navigation }) {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    const temperatureRef = firebase
      .database()
      .ref("SmartPoultryFarm/Temperature");
    const humidityRef = firebase.database().ref("SmartPoultryFarm/Humidity");

    // Log the initial values
    console.log("Initial Temperature:", temperature);
    console.log("Initial Humidity:", humidity);

    const onTemperatureChange = () => fetchData(temperatureRef, setTemperature);
    const onHumidityChange = () => fetchData(humidityRef, setHumidity);

    addDataListener(temperatureRef, onTemperatureChange);
    addDataListener(humidityRef, onHumidityChange);

    return () => {
      removeDataListener(temperatureRef, onTemperatureChange);
      removeDataListener(humidityRef, onHumidityChange);
    };
  }, []);

  useEffect(() => {
    if (temperature >= 20) scheduleHighTemperatureNotification(temperature);

    console.log("Temperature:", temperature);
  }, [temperature]);

  function statusObjPressHandler(item) {
    console.log("I am clicking the " + item.nextScreen);
    navigation.navigate(item.nextScreen);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HeadCard temperature={temperature} humidity={humidity} />
      <FlatList
        data={statusObj}
        renderItem={({ item }) => (
          <RenderStatusCard item={item} onPress={() => statusObjPressHandler(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
