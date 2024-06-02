import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HeadCard({ temperature, humidity }) {
  return (
    <View style={styles.mainCard}>
      <View style={styles.leftMainCard}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.titleMainCard}>Temprature | </Text>
          <FontAwesome5 name="temperature-low" size={30} color="white" />
        </View>

        <Text style={styles.valueMainCard}>{temperature + " °C"}</Text>
      </View>
      <View style={styles.rightMainCard}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.titleMainCard}>Humidity |</Text>
          <MaterialCommunityIcons name="water" size={30} color="white" />
        </View>

        <Text style={styles.valueMainCard}>{humidity + " %"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mainCard: {
    width: "100%",
    height: 180,
    // borderWidth: 1,
    // borderColor: "black",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: "green",
    flexDirection: "row",
    elevation: 50,
  },
  leftMainCard: {
    // borderWidth: 1,
    height: "100%",
    width: "50%",
    // borderColor: "yellow",
    borderBottomLeftRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  rightMainCard: {
    // borderWidth: 1,
    height: "100%",
    width: "50%",
    // borderColor: "yellow",
    borderBottomRightRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  valueMainCard: { color: "white", fontSize: 28, fontWeight: "bold" },
  titleMainCard: { color: "white", fontSize: 22, fontWeight: "bold" },
});
