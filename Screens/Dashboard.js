import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKGROUND } from "../colors";

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={{ fontWeight: "500", color: "grey", marginVertical: 5 }}>
            Location
          </Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={24} color="#3498db" />
            <Text style={styles.locationText}>
              UMT, Johar Town Lahore, Pakistan
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell" size={24} color="#008FA0" />
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>Welcome back, Humzah</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Trips")}
        >
          <Icon name="plane" size={40} color="#3498db" />
          <Text style={styles.buttonText}>Find Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Hoteling")}
        >
          <Icon name="hotel" size={40} color="#e74c3c" />
          <Text style={styles.buttonText}>Hoteling</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="bus" size={40} color="#2ecc71" />
          <Text style={styles.buttonText}>Transportation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Food")}
        >
          <Icon name="cutlery" size={40} color="#d35400" />
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Weather")}
        >
          <Icon name="cloud" size={40} color="#f1c40f" />
          <Text style={styles.buttonText}>Weather</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="map" size={40} color="#9b59b6" />
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { alignSelf: "flex-start" }]}
          onPress={() => navigation.navigate("Emergencies")}
        >
          <Icon name="ambulance" size={40} color="#e67e22" />
          <Text style={styles.buttonText}>Emergencies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { alignSelf: "flex-start", opacity: 0 }]}
          disabled
        >
          <Icon name="ambulance" size={40} color="#e67e22" />
          <Text style={styles.buttonText}>Emergencies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { alignSelf: "flex-start", opacity: 0 }]}
          disabled
        >
          <Icon name="ambulance" size={40} color="#e67e22" />
          <Text style={styles.buttonText}>Emergencies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: BACKGROUND,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: "row",
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  notificationButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 10,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    width: "30%",
    backgroundColor: "#ffffff",
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;
