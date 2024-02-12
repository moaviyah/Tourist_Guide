import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKGROUND } from "../colors";

const backgrounds = [
  {
    id: 1,
    source: require("../assets/1.png"),
  },
  {
    id: 2,
    source: require("../assets/2.png"),
  },
];

const Weather = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/1.png")}
      imageStyle={{}}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-left"
          size={22}
          style={{ marginLeft: 5, marginBottom: 15 }}
          color="white"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
});
