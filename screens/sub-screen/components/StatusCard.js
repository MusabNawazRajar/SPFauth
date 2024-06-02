import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function RenderStatusCard({ item, onPress }) {
  if (!item || !item.name) {
    // Handle the case where item or item.name is undefined
    return null; // or render some default content
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.statusCard}>
        <MaterialCommunityIcons name={item.iconName} size={85} color="green" />
        <View style={{ marginBottom: 1 }}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    width: 150,
    height: 150,
    margin: 15,
    borderRadius: 15,
    flexDirection: "column",
    backgroundColor: "white",
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
