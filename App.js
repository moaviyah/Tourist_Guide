import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import CreateAccount from "./Screens/CreateAccount";
import CreateTrips from "./Screens/CreateTrips";
import Navigator from "./Screens/Navigator";
import NewTrip from "./Screens/NewTrip";
import Weather from "./Screens/Weather";
import Details from "./Screens/Details";


export default function App() {
  const [user, setUser] = useState(null);
  const Stack = createStackNavigator();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    // Cleanup function
    return () => unsubscribe();
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Dashboard" component={Navigator}/>
            <Stack.Screen name="NewTrip" component={NewTrip} />
            <Stack.Screen name="Weather" component={Weather}/>
            <Stack.Screen name="Details" component={Details}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
